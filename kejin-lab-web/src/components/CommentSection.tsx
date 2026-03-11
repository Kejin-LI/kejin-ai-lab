import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import CommentCard from './CommentCard';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  nickname: string;
  avatar: string;
  likes: number;
  parent_id: number | null;
  user_id: string | null;
  page_id: string; // Add page_id to interface
}

interface CommentSectionProps {
  pageId: string; // Required prop to identify the page/context
  title?: string;
  description?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  pageId, 
  title,
  description
}) => {
  const { t, i18n } = useTranslation();
  
  // Default values using translation keys if props are not provided
  const displayTitle = title || (i18n.language === 'zh' ? "社区讨论" : "Community Discussion");
  const displayDescription = description || (i18n.language === 'zh' ? "加入对话。分享您的想法，提出问题，或者只是打个招呼。" : "Join the conversation. Share your thoughts, ask questions, or just say hi.");

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  
  // Pagination states
  const [visibleRootComments, setVisibleRootComments] = useState(5);
  // Map of parentId -> number of visible replies
  const [visibleReplies, setVisibleReplies] = useState<Record<number, number>>({});

  // Fetch comments and subscribe to changes
  useEffect(() => {
    fetchComments();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel(`public:comments:${pageId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'comments',
        filter: `page_id=eq.${pageId}` // Filter by page_id
      }, (payload) => {
        const newComment = payload.new as Comment;
        setComments(prev => {
          if (prev.some(c => c.id === newComment.id)) return prev;
          return [newComment, ...prev];
        });
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'comments',
        filter: `page_id=eq.${pageId}`
      }, (payload) => {
        const updatedComment = payload.new as Comment;
        setComments(prev => {
          const target = prev.find(c => c.id === updatedComment.id);
          if (target && target.likes === updatedComment.likes && target.content === updatedComment.content) {
            return prev;
          }
          return prev.map(c => c.id === updatedComment.id ? { ...c, ...updatedComment } : c);
        });
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'comments',
        filter: `page_id=eq.${pageId}`
      }, (payload) => {
        const deletedId = payload.old.id;
        setComments(prev => prev.filter(c => c.id !== deletedId));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageId]);

  // Check auth state and fetch user likes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserLikes(currentUser.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserLikes(currentUser.id);
      } else {
        setLikedComments([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserLikes = async (userId: string) => {
    const { data, error } = await supabase
      .from('comment_likes')
      .select('comment_id')
      .eq('user_id', userId);
    
    if (!error && data) {
      setLikedComments(data.map(like => like.comment_id));
    }
  };

  const fetchComments = async () => {
    // Determine if we need to filter by page_id.
    // Ideally, we should always filter by page_id.
    // However, existing comments might have null page_id.
    // For backward compatibility, if pageId is 'community-page' (default), 
    // we might want to include nulls OR we migrate data.
    // For now, let's just query where page_id equals the prop.
    
    // Note: If the column doesn't exist yet, this might fail. 
    // We assume the column exists or will be created.
    
    // First, check if page_id column exists by trying to select it? 
    // Or just try to select * and filter.
    // Actually, Supabase `eq` filter will fail if column doesn't exist.
    // We'll proceed assuming the migration script will be run.
    
    // ROBUST FALLBACK STRATEGY:
    // 1. Try to fetch with the ideal query (page_id filter).
    // 2. If that fails (likely due to missing column), fallback to fetching ALL comments 
    //    and filtering in JS (for community page only).
    
    try {
      let query = supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });
        
      // Apply page_id filter
      // If pageId is provided, filter by it.
      if (pageId) {
        if (pageId === 'community-page') {
           // Special case for community page: Include comments with page_id='community-page' OR null (legacy)
           // NOTE: Supabase syntax requires specific formatting for OR.
           // 'page_id.eq.community-page,page_id.is.null' is correct for `or()`.
           query = query.or('page_id.eq.community-page,page_id.is.null');
        } else {
           query = query.eq('page_id', pageId);
        }
      } else {
        // Fallback if prop missing
        query = query.or('page_id.is.null,page_id.eq.community-page');
      }
        
      const { data, error } = await query;
      
      if (error) {
        // If error is related to missing column "page_id", fallback to fetch all
        if (error.message?.includes('page_id') || error.code === 'PGRST301' || error.code === '42703') {
           console.warn('page_id column missing, falling back to fetch all comments');
           const { data: allData, error: allError } = await supabase
             .from('comments')
             .select('*')
             .order('created_at', { ascending: false });
             
           if (!allError && allData) {
             // If we are on community page, show everything (legacy behavior)
             // If on other pages, show nothing (to be safe) or maybe filter by context?
             if (pageId === 'community-page') {
                setComments(allData as unknown as Comment[]);
             } else {
                setComments([]); 
             }
             return;
           }
        }
        throw error;
      }
      
      if (data) {
        setComments(data as unknown as Comment[]);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      // Last resort fallback: Fetch everything without filters
      // This handles cases where the OR syntax might be tricky or specific DB issues
      if (pageId === 'community-page') {
         const { data: backupData } = await supabase
           .from('comments')
           .select('*')
           .order('created_at', { ascending: false });
           
         if (backupData) {
            setComments(backupData as unknown as Comment[]);
         }
      }
    }
  };

  const handlePostComment = useCallback(async (parentId: number | null = null, contentOverride?: string) => {
    const content = contentOverride || newComment;
    if (!content.trim() || !user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          id: Date.now(),
          content: content,
          nickname: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          avatar: user.user_metadata?.avatar_url || '',
          user_id: user.id,
          parent_id: parentId,
          likes: 0,
          page_id: pageId // Save the current page ID
        });
        
      if (error) throw error;
      
      if (parentId) {
        setReplyTo(null);
      } else {
        setNewComment("");
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [user, newComment, pageId]);

  const handleDeleteComment = useCallback(async (id: number) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment.');
    }
  }, []);

  const handleLikeComment = useCallback(async (id: number, currentLikes: number) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const isLiked = likedComments.includes(id);
    const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    setLikedComments(prev => isLiked ? prev.filter(cId => cId !== id) : [...prev, id]);
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: newLikes } : c));

    try {
      const { error } = await supabase.rpc('toggle_like', { comment_id_param: id });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error toggling like:', error);
      // Revert
      setLikedComments(prev => isLiked ? [...prev, id] : prev.filter(cId => cId !== id));
      setComments(prev => prev.map(c => c.id === id ? { ...c, likes: currentLikes } : c));
    }
  }, [user, likedComments]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getInitials = (name: string) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
  };
  
  const handleReplyClick = useCallback((id: number) => {
    setReplyTo(prev => prev === id ? null : id);
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyTo(null);
  }, []);

  const handleAuthRequired = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const handleLoadMoreReplies = useCallback((parentId: number) => {
    setVisibleReplies(prev => ({
      ...prev,
      [parentId]: (prev[parentId] || 3) + 5
    }));
  }, []);

  const handleLoadMoreRootComments = useCallback(() => {
    setVisibleRootComments(prev => prev + 5);
  }, []);

  const renderComments = (parentId: number | null) => {
    const children = comments
      .filter(c => c.parent_id === parentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (children.length === 0) return null;

    const limit = parentId ? (visibleReplies[parentId] || 3) : children.length; 
    const visibleChildren = children.slice(0, limit);
    const hasMore = children.length > limit;

    return (
      <div className="relative">
        {parentId !== null && (
          <div className="absolute left-6 top-0 bottom-0 w-px bg-google-grey-200 -z-10" />
        )}
        
        {visibleChildren.map((comment) => {
          const parentComment = comments.find(c => c.id === comment.parent_id);
          
          return (
            <div key={comment.id}>
              <CommentCard 
                comment={comment}
                isReply={parentId !== null}
                user={user}
                isLiked={likedComments.includes(comment.id)}
                replyTo={replyTo}
                isLoading={isLoading}
                onLike={handleLikeComment}
                onDelete={handleDeleteComment}
                onReplyClick={handleReplyClick}
                onCancelReply={handleCancelReply}
                onPostReply={handlePostComment}
                onAuthRequired={handleAuthRequired}
                parentAuthor={parentComment?.nickname}
              />
              {renderComments(comment.id)}
            </div>
          );
        })}

        {hasMore && (
          <button 
            onClick={() => handleLoadMoreReplies(parentId!)}
            className="ml-12 mt-2 text-xs font-bold text-google-blue hover:underline flex items-center gap-1"
          >
            <span>
              {i18n.language === 'zh' 
                ? `查看更多 ${children.length - limit} 条回复` 
                : `View ${children.length - limit} more replies`}
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <div className="flex items-center gap-3 mb-10 justify-center">
        <MessageSquare className="w-8 h-8 text-google-grey-900" />
        <h2 className="text-3xl font-bold text-google-grey-900">{displayTitle}</h2>
      </div>

      <p className="text-center text-google-grey-600 mb-12 max-w-lg mx-auto">
        {displayDescription}
      </p>

      {/* Comment Form */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-google-grey-100 mb-12 relative overflow-hidden">
        {user ? (
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-google-grey-100">
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-google-blue text-white flex items-center justify-center font-bold text-xs">
                  {getInitials(user.user_metadata?.full_name || user.email)}
                </div>
              )}
              <span className="font-medium text-google-grey-900">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-xs font-medium text-google-grey-500 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              {i18n.language === 'zh' ? '退出登录' : 'Sign Out'}
            </button>
          </div>
        ) : null}

        <div className="flex gap-4">
          <div className="flex-1 relative">
            {!user && (
              <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-3 bg-google-blue text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
                >
                  {i18n.language === 'zh' ? '登录后评论' : 'Sign in to Comment'}
                </button>
              </div>
            )}
            
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? (i18n.language === 'zh' ? "分享你的想法..." : "What's on your mind?") : (i18n.language === 'zh' ? "请登录后分享您的想法..." : "Please sign in to share your thoughts...")}
              disabled={!user}
              className="w-full min-h-[120px] p-4 rounded-2xl bg-google-grey-50 border-none focus:ring-0 focus:outline-none resize-none text-base mb-4 transition-shadow disabled:opacity-50"
            />
            <div className="flex justify-end">
              <button 
                onClick={() => handlePostComment(null)}
                disabled={!user || !newComment.trim() || isLoading}
                className={cn(
                  "px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform active:scale-95",
                  (!user || !newComment.trim() || isLoading)
                    ? "bg-google-grey-200 text-google-grey-400 cursor-not-allowed" 
                    : "bg-white text-google-grey-900 hover:bg-google-grey-50"
                )}
              >
                <Send className="w-4 h-4" />
                {isLoading ? (i18n.language === 'zh' ? '发布中...' : 'Posting...') : (i18n.language === 'zh' ? '发布' : 'Post')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <div className="text-center py-10 text-google-grey-400">
            {i18n.language === 'zh' ? "暂无评论。来做第一个发言的人吧！" : "No comments yet. Be the first to share!"}
          </div>
        ) : (
          <div className="space-y-8">
            {comments
              .filter(c => !c.parent_id)
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .slice(0, visibleRootComments)
              .map((comment) => (
                <div key={comment.id}>
                  <CommentCard 
                    comment={comment}
                    user={user}
                    isLiked={likedComments.includes(comment.id)}
                    replyTo={replyTo}
                    isLoading={isLoading}
                    onLike={handleLikeComment}
                    onDelete={handleDeleteComment}
                    onReplyClick={handleReplyClick}
                    onCancelReply={handleCancelReply}
                    onPostReply={handlePostComment}
                    onAuthRequired={handleAuthRequired}
                    parentAuthor={comments.find(c => c.id === comment.parent_id)?.nickname}
                  />
                  {renderComments(comment.id)}
                </div>
              ))}
            
            {comments.filter(c => !c.parent_id).length > visibleRootComments && (
              <div className="text-center pt-4">
                <button 
                  onClick={handleLoadMoreRootComments}
                  className="text-google-grey-500 font-medium text-sm hover:text-google-blue transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  {i18n.language === 'zh' ? "查看更多评论" : "View more comments"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
