import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Reply, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  nickname: string;
  avatar: string;
  likes: number;
  parent_id: number | null;
  user_id: string | null;
}

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
  user: any;
  isLiked: boolean;
  replyTo: number | null;
  isLoading: boolean;
  onLike: (id: number, currentLikes: number) => void;
  onDelete: (id: number) => void;
  onReplyClick: (id: number) => void;
  onCancelReply: () => void;
  onPostReply: (parentId: number, content: string) => void;
  onAuthRequired: () => void;
  parentAuthor?: string; // Add this prop
}

const formatTime = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Within 24 hours
  if (diffInSeconds < 24 * 60 * 60) {
    const hours = Math.floor(diffInSeconds / 3600);
    if (hours < 1) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes < 1 ? 'Just now' : `${minutes}m ago`;
    }
    return `${hours}h ago`;
  }
  
  // 24h - 3 days
  if (diffInSeconds < 3 * 24 * 60 * 60) {
    const days = Math.floor(diffInSeconds / (24 * 3600));
    return `${days}d ago`;
  }
  
  // More than 3 days
  return date.toLocaleDateString();
};

const getInitials = (name: string) => {
  return name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
};

const CommentCard: React.FC<CommentCardProps> = memo(({
  comment,
  isReply = false,
  user,
  isLiked,
  replyTo,
  isLoading,
  onLike,
  onDelete,
  onReplyClick,
  onCancelReply,
  onPostReply,
  onAuthRequired,
  parentAuthor
}) => {
  const { t, i18n } = useTranslation();
  const isOwner = user && comment.user_id === user.id;

  // Debug logging for ownership issues
  if (user && !isOwner && comment.nickname === (user.user_metadata?.full_name || user.email)) {
    console.log('Ownership mismatch debug:', {
      commentId: comment.id,
      commentUserId: comment.user_id,
      currentUserId: user.id,
      userIdType: typeof comment.user_id,
      currentIdType: typeof user.id
    });
  }

  const isReplying = replyTo === comment.id;
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const isFounderComment = comment.nickname === 'Kejin Li' || comment.nickname === '珂瑾李';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-4 group relative", isReply && "ml-12 mt-4")}
    >
      <div className={cn(
        "rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-google-grey-200 shadow-sm overflow-hidden mt-4 md:mt-6",
        isReply ? "w-8 h-8" : "w-12 h-12"
      )}>
        <img 
          src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.nickname}`}
          alt={comment.nickname}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to DiceBear if image fails to load
            e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.nickname}`;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-google-grey-50 p-4 md:p-6 rounded-3xl rounded-tl-none hover:bg-google-grey-100 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 truncate mr-2">
              <h4 className="font-bold text-sm md:text-base text-google-grey-900">
                {comment.nickname || 'Anonymous User'}
              </h4>
              {isFounderComment && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                  Founder @ Kejin AI Lab
                </span>
              )}
            </div>
            <span className="text-xs text-google-grey-500 font-medium whitespace-nowrap">
              {formatTime(comment.created_at)}
            </span>
          </div>
          <p className="text-google-grey-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
            {parentAuthor && (
              <span className="text-google-blue font-medium mr-1">
                @{parentAuthor}
              </span>
            )}
            {comment.content}
          </p>
          
          {/* Action Bar */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-google-grey-200/50">
            <button 
              onClick={() => onLike(comment.id, comment.likes)}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors group/like",
                isLiked ? "text-red-500" : "text-google-grey-500 hover:text-red-500"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5 group-hover/like:scale-110 transition-transform", (isLiked || comment.likes > 0) && "fill-red-50", isLiked && "fill-red-500 text-red-500")} />
              {comment.likes || 0}
            </button>
            
            <button 
              onClick={() => {
                if (!user) onAuthRequired();
                else onReplyClick(comment.id);
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-google-grey-500 hover:text-google-blue transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              {i18n.language === 'zh' ? '回复' : 'Reply'}
            </button>

            {isOwner && (
              <div className="relative ml-auto">
                <button 
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  className="flex items-center gap-1.5 text-xs font-medium text-google-grey-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {i18n.language === 'zh' ? '删除' : 'Delete'}
                </button>
                
                {/* Inline Confirmation Bubble */}
                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute right-0 bottom-full mb-2 z-50 bg-white rounded-xl shadow-xl border border-google-grey-200 p-3 w-48"
                    >
                      <p className="text-xs text-google-grey-800 mb-2 font-medium text-center">
                        {i18n.language === 'zh' ? '确认删除此评论？' : 'Delete this comment?'}
                      </p>
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-2 py-1 rounded-md text-[10px] font-medium text-google-grey-600 hover:bg-google-grey-100 transition-colors"
                        >
                          {i18n.language === 'zh' ? '取消' : 'Cancel'}
                        </button>
                        <button 
                          onClick={() => {
                            onDelete(comment.id);
                            setShowDeleteConfirm(false);
                          }}
                          className="px-2 py-1 rounded-md bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors"
                        >
                          {i18n.language === 'zh' ? '确认' : 'Confirm'}
                        </button>
                      </div>
                      {/* Arrow pointing down to the delete button */}
                      <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-b border-r border-google-grey-200 transform rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Reply Input */}
        <AnimatePresence>
          {isReplying && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex gap-3"
            >
              <div className="flex-1">
                <textarea 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={i18n.language === 'zh' ? `回复 ${comment.nickname}...` : `Reply to ${comment.nickname}...`}
                  className="w-full min-h-[80px] p-3 rounded-xl bg-white border border-google-grey-200 focus:ring-0 focus:outline-none resize-none text-sm"
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={() => {
                      setReplyContent("");
                      onCancelReply();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-google-grey-600 hover:bg-google-grey-100 transition-colors"
                  >
                    {i18n.language === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button 
                    onClick={() => {
                      onPostReply(comment.id, replyContent);
                      setReplyContent("");
                    }}
                    disabled={!replyContent.trim() || isLoading}
                    className="px-4 py-1.5 rounded-lg bg-black text-white text-xs font-bold hover:bg-google-grey-900 transition-colors disabled:opacity-50 disabled:bg-google-grey-200 disabled:text-google-grey-400"
                  >
                    {isLoading ? (i18n.language === 'zh' ? '...' : '...') : (i18n.language === 'zh' ? '回复' : 'Reply')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for performance
  return (
    prevProps.comment.id === nextProps.comment.id &&
    prevProps.comment.likes === nextProps.comment.likes &&
    prevProps.comment.content === nextProps.comment.content &&
    prevProps.isLiked === nextProps.isLiked &&
    prevProps.isReply === nextProps.isReply &&
    prevProps.replyTo === nextProps.replyTo &&
    prevProps.isLoading === nextProps.isLoading &&
    // Shallow compare user object just in case
    prevProps.user?.id === nextProps.user?.id
  );
});

export default CommentCard;
