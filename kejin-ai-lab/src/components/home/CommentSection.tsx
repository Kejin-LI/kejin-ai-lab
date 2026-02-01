import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart, Send, User, Lock, Trash2, X, QrCode, CheckCircle, AlertCircle, Unlock, Reply } from 'lucide-react';

interface Comment {
  id: number;
  nickname: string;
  content: string;
  avatar: string;
  date: string;
  email?: string;
  phone?: string;
  replies?: Comment[];
}

// Toast Component
const Toast: React.FC<{
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      className={`fixed top-20 left-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border ${
        type === 'success' 
          ? 'bg-white border-macaron-green text-green-600' 
          : 'bg-white border-macaron-pink text-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-macaron-green" />
      ) : (
        <AlertCircle className="w-5 h-5 text-macaron-pink" />
      )}
      <span className="text-sm font-medium text-macaron-text">{message}</span>
    </motion.div>
  );
};

// Simple Admin Login Modal
const AdminLoginModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onNotify: (message: string, type: 'success' | 'error') => void;
}> = ({ isOpen, onClose, onLogin, onNotify }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset state when closed
  React.useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use PBKDF2 (Password-Based Key Derivation Function 2) for higher security
      // This makes brute-force attacks significantly harder compared to simple SHA-256
      const enc = new TextEncoder();
      const salt = enc.encode("Kejin_Salt_2024_#992"); // Unique salt to prevent rainbow table attacks
      
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000, // High iteration count increases computational cost for attackers
          hash: "SHA-256"
        },
        keyMaterial,
        512 // 64 bytes * 8 bits
      );
      
      const hashArray = Array.from(new Uint8Array(derivedBits));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // The stored hash corresponds to the admin password
      // It is computationally expensive to reverse this hash or find a collision
      const SECRET_HASH = 'e44897595d2b9f0665a5a9b52b7340c0437cfcdc0b7d6eb929bd7b933ae3d826b059445f8109b566b3f9767927eb3e79faae5fd56bae790011ec30dfcdac60a9';
      
      if (hashHex === SECRET_HASH) {
        onLogin();
        onNotify('Admin verified successfully', 'success');
        onClose();
      } else {
        setError('Invalid password');
        onNotify('Authentication failed', 'error');
      }
    } catch (err) {
      console.error('Crypto error:', err);
      setError('Verification failed');
      onNotify('System error during verification', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-macaron-text mb-6 text-center">
          Admin Login
        </h3>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-macaron-textLight mb-1">
              Password
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-macaron-blue focus-within:ring-2 focus-within:ring-macaron-blue/20 transition-all px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-macaron-text"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-macaron-pink mt-1">{error}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(() => {
    // Initialize from local storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kejin_comments_data');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Save comments to local storage whenever they change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kejin_comments_data', JSON.stringify(comments));
    }
  }, [comments]);

  const [visibleComments, setVisibleComments] = useState(3);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    showToast('Admin logged out successfully', 'success');
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      handleLogout();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    phone: ''
  });

  // Load user info from local storage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kejin_user_info');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!isAdmin) {
          setUserInfo({
            nickname: parsed.nickname || '',
            email: parsed.email || '',
            phone: parsed.phone || ''
          });
        }
      }
    }
  }, [isAdmin]);

  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  // Reusable Comment Form Component
  const CommentForm = ({ 
    onSubmit, 
    initialUserInfo, 
    isAdmin, 
    isReply = false,
    onCancel,
    autoFocus = false
  }: { 
    onSubmit: (data: any) => void, 
    initialUserInfo?: any, 
    isAdmin: boolean,
    isReply?: boolean,
    onCancel?: () => void,
    autoFocus?: boolean
  }) => {
    const [localFormData, setLocalFormData] = useState({
      nickname: initialUserInfo?.nickname || '',
      email: initialUserInfo?.email || '',
      phone: initialUserInfo?.phone || '',
      content: ''
    });
    const [errorFields, setErrorFields] = useState<Set<string>>(new Set());
    const [shakingFields, setShakingFields] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize with props
    React.useEffect(() => {
      if (initialUserInfo && !isAdmin) {
        setLocalFormData(prev => ({
          ...prev,
          nickname: initialUserInfo.nickname || '',
          email: initialUserInfo.email || '',
          phone: initialUserInfo.phone || ''
        }));
      }
    }, [initialUserInfo, isAdmin]);

    // Admin auto-fill logic
    React.useEffect(() => {
      if (isAdmin) {
        setLocalFormData(prev => ({ ...prev, nickname: 'Kejin.AI' }));
      } else if (localFormData.nickname === 'Kejin.AI') {
        // Restore user info if switching off admin
         setLocalFormData(prev => ({
          ...prev,
          nickname: initialUserInfo?.nickname || ''
        }));
      }
    }, [isAdmin]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors = new Set<string>();
      if (!localFormData.nickname) newErrors.add('nickname');
      if (!localFormData.email) newErrors.add('email');
      if (!localFormData.content) newErrors.add('content');
      if (localFormData.phone && localFormData.phone.length !== 11) newErrors.add('phone');

      if (newErrors.size > 0) {
        setErrorFields(newErrors);
        setShakingFields(new Set());
        setTimeout(() => {
          setShakingFields(newErrors);
          setTimeout(() => setShakingFields(new Set()), 1500);
        }, 10);
        return;
      }

      setIsSubmitting(true);
      // Simulate API delay
      setTimeout(() => {
        onSubmit(localFormData);
        setLocalFormData(prev => ({ ...prev, content: '' }));
        setIsSubmitting(false);
      }, 1000);
    };

    return (
      <form onSubmit={handleSubmit} className={`space-y-4 relative z-10 ${isReply ? 'mt-4 bg-white/40 p-4 rounded-xl border border-macaron-text/5' : ''}`} noValidate>
        {/* Inputs Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {!isReply && (
            <div className="w-10 h-10 bg-macaron-text/5 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-macaron-textLight" />
            </div>
          )}
          
          <div className={`flex-1 min-w-[140px] relative flex items-center bg-white/50 rounded-lg border focus-within:ring-2 transition-all ${errorFields.has('nickname') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus-within:border-macaron-blue focus-within:ring-macaron-blue/20'} ${shakingFields.has('nickname') ? 'animate-shake' : ''}`}>
            <input 
              type="text" 
              placeholder="Nickname" 
              className={`w-full bg-transparent px-3 py-2 outline-none text-sm text-macaron-text placeholder:text-macaron-textLight/70 ${isAdmin ? 'cursor-not-allowed opacity-70' : ''}`}
              value={localFormData.nickname}
              onChange={e => {
                if (isAdmin) return;
                setLocalFormData({...localFormData, nickname: e.target.value});
                if (errorFields.has('nickname')) {
                  const newErrors = new Set(errorFields);
                  newErrors.delete('nickname');
                  setErrorFields(newErrors);
                }
              }}
              readOnly={isAdmin}
              required
            />
          </div>

          <div className={`flex-1 min-w-[140px] relative flex items-center bg-white/50 rounded-lg border focus-within:ring-2 transition-all ${errorFields.has('email') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus-within:border-macaron-blue focus-within:ring-macaron-blue/20'} ${shakingFields.has('email') ? 'animate-shake' : ''}`}>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent px-3 py-2 outline-none text-sm text-macaron-text placeholder:text-macaron-textLight/70"
              value={localFormData.email}
              onChange={e => {
                setLocalFormData({...localFormData, email: e.target.value});
                if (errorFields.has('email')) {
                  const newErrors = new Set(errorFields);
                  newErrors.delete('email');
                  setErrorFields(newErrors);
                }
              }}
              required
            />
          </div>

          <div className={`flex-1 min-w-[140px] flex items-center bg-white/50 rounded-lg border transition-all ${errorFields.has('phone') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus-within:border-macaron-blue focus-within:ring-2 focus-within:ring-macaron-blue/20'} ${shakingFields.has('phone') ? 'animate-shake' : ''}`}>
            <span className="pl-3 text-sm text-macaron-text font-medium border-r border-macaron-text/10 pr-2">+86</span>
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full bg-transparent px-3 py-2 outline-none text-sm text-macaron-text placeholder:text-macaron-textLight/70"
              value={localFormData.phone}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                setLocalFormData({...localFormData, phone: val});
                if (errorFields.has('phone')) {
                  const newErrors = new Set(errorFields);
                  newErrors.delete('phone');
                  setErrorFields(newErrors);
                }
              }}
              maxLength={11}
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="relative group">
          <textarea
            placeholder={isReply ? "Write a reply..." : "What are your thoughts?"}
            rows={isReply ? 3 : 4}
            className={`w-full bg-white/80 rounded-xl border p-3 outline-none resize-y min-h-[80px] max-h-[300px] focus:ring-2 transition-all text-macaron-text placeholder:text-macaron-textLight/50 ${errorFields.has('content') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus:border-macaron-blue focus:ring-macaron-blue/20'} ${shakingFields.has('content') ? 'animate-shake' : ''}`}
            value={localFormData.content}
            onChange={e => {
              setLocalFormData({...localFormData, content: e.target.value});
              if (errorFields.has('content')) {
                const newErrors = new Set(errorFields);
                newErrors.delete('content');
                setErrorFields(newErrors);
              }
            }}
            maxLength={500}
            autoFocus={autoFocus}
            required
          />
          <div className="absolute bottom-3 right-3 text-xs text-macaron-textLight font-medium pointer-events-none">
            {localFormData.content.length}/500
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-macaron-textLight hover:text-macaron-text transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-macaron-text text-white rounded-lg text-sm font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${isReply ? 'py-1.5 px-4 text-xs' : ''}`}
          >
            {isSubmitting ? 'Sending...' : (isReply ? 'Reply' : 'Send')}
            {!isSubmitting && <Send className={isReply ? "w-3 h-3" : "w-3 h-3"} />}
          </button>
        </div>
      </form>
    );
  };

  const [ownedCommentIds, setOwnedCommentIds] = useState<Set<number>>(() => {
    // Initialize from local storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kejin_owned_comments');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    }
    return new Set();
  });

  const handleLoadMore = () => {
    setVisibleComments(prev => prev + 5);
  };

  const handleDeleteComment = (id: number) => {
    const deleteFromList = (list: Comment[]): Comment[] => {
      return list.filter(c => c.id !== id).map(c => ({
        ...c,
        replies: c.replies ? deleteFromList(c.replies) : undefined
      }));
    };
    setComments(deleteFromList(comments));
  };

  const currentComments = comments.slice(0, visibleComments);
  const hasMoreComments = comments.length > visibleComments;

  // Helper to find a comment recursively
  const findComment = (list: Comment[], id: number): Comment | undefined => {
    for (const comment of list) {
      if (comment.id === id) return comment;
      if (comment.replies) {
        const found = findComment(comment.replies, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleCommentSubmit = (data: any, parentId?: number) => {
    const newComment: Comment = {
      id: Date.now(),
      nickname: data.nickname,
      content: data.content,
      // Use custom avatar for Admin, otherwise generate from email
      avatar: isAdmin 
        ? "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square"
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email.trim().toLowerCase()}`,
      date: new Date().toLocaleString(),
      email: data.email,
      phone: data.phone
    };
    
    // Update local storage with new comment ID only if NOT admin
    if (!isAdmin) {
      const newOwnedIds = new Set(ownedCommentIds);
      newOwnedIds.add(newComment.id);
      setOwnedCommentIds(newOwnedIds);
      localStorage.setItem('kejin_owned_comments', JSON.stringify(Array.from(newOwnedIds)));
      
      // Save user info to local storage for auto-fill
      const newUserInfo = {
        nickname: data.nickname,
        email: data.email,
        phone: data.phone
      };
      setUserInfo(newUserInfo);
      localStorage.setItem('kejin_user_info', JSON.stringify(newUserInfo));
    }
    
    if (parentId) {
      // Find the parent comment recursively
      const parentComment = findComment(comments, parentId);
      if (parentComment) {
        // Add reply prefix
        newComment.content = `@${parentComment.nickname} ${newComment.content}`;
      }

      // Add the new comment as a reply to the TOP-LEVEL parent if possible,
      // OR just add it to the current parent but visual rendering will handle the indentation.
      // To implement "all replies are at level 2", we need to find the root comment.
      
      // However, the current data structure is nested (replies inside replies).
      // If we want to FLATTEN the visual structure, we can keep the nested data structure
      // but change how we add the reply.
      
      // OPTION 1: Add reply to the ROOT comment's replies array.
      // We need to find which root comment this parentId belongs to.
      
      const addReplyToRoot = (list: Comment[]): Comment[] => {
        return list.map(c => {
          // If this is the comment we are replying to (it's a root comment)
          if (c.id === parentId) {
            return {
              ...c,
              replies: [...(c.replies || []), newComment]
            };
          }
          
          // If the comment we are replying to is INSIDE this root comment
          if (findComment(c.replies || [], parentId!)) {
             return {
              ...c,
              replies: [...(c.replies || []), newComment]
            };
          }
          
          return c;
        });
      };
      
      setComments(addReplyToRoot(comments));
      setReplyingToId(null);
    } else {
      setComments([newComment, ...comments]);
    }
  };

  const renderComments = (list: Comment[], depth = 0) => {
    return list.map(comment => (
      <motion.div 
        key={comment.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-4 group relative ${depth > 0 ? 'mt-4' : ''} ${depth === 1 ? 'ml-12' : ''}`}
      >
        <img src={comment.avatar} alt={comment.nickname} className="w-10 h-10 rounded-full bg-macaron-cream" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-macaron-text truncate max-w-[150px]" title={comment.nickname}>
                {comment.nickname}
              </span>
              {comment.nickname === 'Kejin.AI' && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-macaron-purple rounded-full shrink-0">
                  Admin
                </span>
              )}
              <span className="text-xs text-macaron-textLight shrink-0">{comment.date}</span>
            </div>
            
            {/* Action Buttons Group */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setReplyingToId(comment.id)}
                className={`p-1.5 rounded-lg transition-all ${replyingToId === comment.id ? 'text-macaron-blue bg-macaron-blue/10' : 'text-macaron-textLight/50 hover:text-macaron-blue hover:bg-macaron-blue/10'}`}
                title="Reply"
              >
                <Reply className="w-4 h-4" />
              </button>
              {(isAdmin || ownedCommentIds.has(comment.id)) && (
                <button 
                  onClick={() => handleDeleteComment(comment.id)}
                  className="p-1.5 text-macaron-textLight/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {isAdmin && comment.email && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-[11px] text-macaron-textLight/70 bg-macaron-text/5 rounded-md px-2 py-1 w-fit">
              <span className="flex items-center gap-1">
                <span className="opacity-70">Email:</span> {comment.email}
              </span>
              {comment.phone && (
                <span className="flex items-center gap-1">
                  <span className="opacity-70">Phone:</span> {comment.phone}
                </span>
              )}
            </div>
          )}
          <p className="text-macaron-text/80 text-sm leading-relaxed text-justify break-words">
            {comment.content.startsWith('@') ? (
              <>
                <span className="text-macaron-blue font-medium mr-1">
                  {comment.content.split(' ')[0]}
                </span>
                {comment.content.split(' ').slice(1).join(' ')}
              </>
            ) : (
              comment.content
            )}
          </p>
          
          {replyingToId === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <CommentForm 
                onSubmit={(data) => handleCommentSubmit(data, comment.id)} 
                initialUserInfo={userInfo} 
                isAdmin={isAdmin} 
                isReply 
                onCancel={() => setReplyingToId(null)}
                autoFocus
              />
            </motion.div>
          )}

          {/* Only render replies if depth is 0 (top level) to prevent infinite nesting indent */}
          {/* But we need to render all replies. The issue is indentation. */}
          {/* We want max 2 levels visually. Root -> Replies. Replies to replies should stay at level 2. */}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className={`mt-4 ${depth === 0 ? 'border-l-2 border-macaron-text/5 pl-4' : ''}`}>
              {renderComments(comment.replies, depth + 1)}
            </div>
          )}
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-macaron-pink rounded-full animate-bounce-slow shadow-md hover:scale-110 hover:rotate-12 transition-transform duration-300">
          <MessageCircleHeart className="w-6 h-6 text-white fill-white/20" />
        </div>
        <h2 className="text-2xl font-bold text-macaron-text">Comments</h2>
        <button 
          onClick={handleAdminClick}
          className="ml-2 p-1 text-macaron-textLight/30 hover:text-macaron-blue transition-colors"
          title={isAdmin ? "Logout Admin" : "Admin Login"}
        >
          {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
        {isLoginModalOpen && (
          <AdminLoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            onLogin={() => setIsAdmin(true)}
            onNotify={showToast}
          />
        )}
      </AnimatePresence>

      <div className="rounded-3xl p-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-macaron-pink/10 rounded-full blur-3xl -z-10" />
        
        <CommentForm 
          onSubmit={(data) => handleCommentSubmit(data)} 
          initialUserInfo={userInfo} 
          isAdmin={isAdmin} 
        />

        {/* Comments List */}
        <div className="mt-12 border-t border-macaron-text/5 pt-8">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-macaron-textLight font-medium">No comments yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {renderComments(currentComments)}
            </div>
          )}
          
          {hasMoreComments && (
            <div className="text-center mt-8">
              <button 
                onClick={handleLoadMore}
                className="text-sm text-macaron-textLight hover:text-macaron-pinkHover font-medium transition-colors"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
