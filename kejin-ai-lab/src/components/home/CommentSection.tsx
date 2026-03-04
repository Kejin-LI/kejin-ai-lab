import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart, Lock, Trash2, X, QrCode, CheckCircle, AlertCircle, Unlock, Reply } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useLanguage } from '../../i18n/LanguageContext';
import { CommentForm } from './CommentForm';

interface Comment {
  id: number;
  nickname: string;
  content: string;
  avatar: string;
  date: string;
  email?: string;
  phone?: string;
  parent_id?: number | null;
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
  onLogin: (password: string) => void;
  onNotify: (message: string, type: 'success' | 'error') => void;
}> = ({ isOpen, onClose, onLogin, onNotify }) => {
  const { t } = useLanguage();
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
      // Verify password via Edge Function
      const { error: verifyError } = await supabase.functions.invoke('verify-admin', {
        body: { password }
      });

      if (!verifyError) {
        onLogin(password);
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
          {t('comments.adminLogin')}
        </h3>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-macaron-textLight mb-1">
              {t('comments.password')}
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-macaron-blue focus-within:ring-2 focus-within:ring-macaron-blue/20 transition-all px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-macaron-text"
                placeholder={t('comments.password')}
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-macaron-pink mt-1">{error}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100"
          >
            {t('comments.login')}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const CommentSection: React.FC<{ pageId?: string }> = ({ pageId = 'home' }) => {
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to build comment tree from flat list
  const buildCommentTree = (flatComments: any[]): Comment[] => {
    const commentMap = new Map();
    const roots: Comment[] = [];

    // First pass: create comment objects
    flatComments.forEach(c => {
      commentMap.set(c.id, {
        id: c.id,
        nickname: c.nickname,
        content: c.content,
        avatar: c.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.email || c.nickname}`,
        date: new Date(c.created_at).toLocaleString(),
        email: c.email,
        phone: c.phone,
        parent_id: c.parent_id,
        is_hidden: c.is_hidden, // Map is_hidden
        replies: []
      });
    });

    // Second pass: link parents and children
    flatComments.forEach(c => {
      const comment = commentMap.get(c.id);
      if (c.parent_id) {
        const parent = commentMap.get(c.parent_id);
        if (parent) {
          parent.replies.push(comment);
        } else {
          roots.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    // Sort by date descending for roots, ascending for replies usually (or desc)
    return roots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('page_id', pageId) // Filter by pageId
        .order('created_at', { ascending: true }); // Get all, sort later

      if (error) {
        // If error is 404, table might not exist or RLS issue
        // But for 'No rows', error is usually null and data is []
        throw error;
      }

      if (data) {
        setComments(buildCommentTree(data));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Don't show toast for initial fetch error to avoid annoyance if it's just empty
      // showToast('Failed to load comments', 'error'); 
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to Realtime changes
  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel(`public:comments:${pageId}`) // Unique channel per page
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'comments' 
        // Filter removed to ensure reliability. We filter manually below.
      }, (payload) => {
        // Optimistic update or refetch
        // Since we need to rebuild the tree, refetch is safer
        // Only refetch if the change is relevant to this page
        const newData = payload.new as any;
        const oldData = payload.old as any;
        
        // If inserted/updated record belongs to this page
        if (newData && newData.page_id === pageId) {
          fetchComments();
        } 
        // If deleted record (we might not know its page_id if payload.old is empty, but usually it has ID)
        // For safety, just refetch if it's a delete event or if we are unsure
        else if (payload.eventType === 'DELETE' || !newData) {
           fetchComments();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageId]); // Re-subscribe when pageId changes

  const [visibleComments, setVisibleComments] = useState(3);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    setAdminPassword(null);
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

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      if (isAdmin) {
        // Admin: Try Edge Function first (bypasses RLS)
        const { error: fnError } = await supabase.functions.invoke('delete-comment', {
          body: { id, password: adminPassword }
        });

        if (fnError) {
          console.warn('Edge Function delete failed, trying direct delete...', fnError);
          // Fallback to direct delete (might fail due to RLS)
          const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);
          if (error) throw error;
        }
      } else {
        // User: Soft delete (hide it)
        // Note: This requires 'is_hidden' column in DB and Policy allowing update
        const { error } = await supabase
          .from('comments')
          .update({ is_hidden: true })
          .eq('id', id);
          
        if (error) {
          console.error("Soft delete error:", error);
          // Fallback if column doesn't exist yet or policy fails: 
          // Just remove locally to give immediate feedback (fake delete)
          // But since we use Realtime, it might pop back if we don't handle it right.
          // Let's assume user has run the SQL.
          throw error;
        }
      }

      showToast('Comment deleted', 'success');
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast('Failed to delete comment', 'error');
    }
  };

  const currentComments = comments.slice(0, visibleComments);
  const hasMoreComments = comments.length > visibleComments;

  // Helper to find a comment recursively
  // const findComment = (list: Comment[], id: number): Comment | undefined => { ... } // No longer needed for Supabase version logic simplification


  const handleCommentSubmit = async (data: any, parentId?: number) => {
    const avatar = isAdmin 
      ? "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square"
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email.trim().toLowerCase()}`;

    try {
      const { data: insertedData, error } = await supabase
        .from('comments')
        .insert({
          nickname: data.nickname,
          content: data.content,
          email: data.email,
          phone: data.phone,
          avatar: avatar,
          parent_id: parentId || null,
          page_id: pageId
        })
        .select() // Important: return the inserted row so we get the ID
        .single();

      if (error) throw error;

      showToast('Comment submitted successfully', 'success');
      setReplyingToId(null);
      
      // Save user info locally
      if (!isAdmin) {
        // Track owned comments for deletion permission
        if (insertedData) {
          setOwnedCommentIds(prev => {
            const next = new Set(prev);
            next.add(insertedData.id);
            if (typeof window !== 'undefined') {
              localStorage.setItem('kejin_owned_comments', JSON.stringify(Array.from(next)));
            }
            return next;
          });
        }

        const newUserInfo = {
          nickname: data.nickname,
          email: data.email,
          phone: data.phone
        };
        setUserInfo(newUserInfo);
        localStorage.setItem('kejin_user_info', JSON.stringify(newUserInfo));
      }

      // Manually refresh comments to ensure UI updates immediately even if Realtime is slow
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      showToast('Failed to submit comment', 'error');
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
                <span className="opacity-70">{t('comments.email')}:</span> {comment.email}
              </span>
              {comment.phone && (
                <span className="flex items-center gap-1">
                  <span className="opacity-70">{t('comments.phone')}:</span> {comment.phone}
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
        <h2 className="text-2xl font-bold text-macaron-text">{t('comments.title')}</h2>
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
            onLogin={(password) => {
              setIsAdmin(true);
              setAdminPassword(password);
            }}
            onNotify={showToast}
          />
        )}
      </AnimatePresence>

      <div className="rounded-3xl p-4 sm:p-8 relative overflow-hidden -mx-4 sm:mx-0">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-macaron-pink/10 rounded-full blur-3xl -z-10" />
        
        <div className="px-4 sm:px-0">
          <CommentForm 
            onSubmit={(data) => handleCommentSubmit(data)} 
            initialUserInfo={userInfo} 
            isAdmin={isAdmin} 
          />
        </div>

        {/* Comments List */}
        <div className="mt-12 border-t border-macaron-text/5 pt-8 px-4 sm:px-0">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-macaron-textLight font-medium">{t('comments.noComments')}</p>
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
                {t('comments.loadMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
