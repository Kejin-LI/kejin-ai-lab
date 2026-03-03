import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CommentFormProps {
  onSubmit: (data: any) => void;
  initialUserInfo?: any;
  isAdmin: boolean;
  isReply?: boolean;
  onCancel?: () => void;
  autoFocus?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  initialUserInfo, 
  isAdmin, 
  isReply = false,
  onCancel,
  autoFocus = false
}) => {
  const { t } = useLanguage();
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
        setTimeout(() => setShakingFields(new Set()), 200);
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
            placeholder={t('comments.nickname')}
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

        <div className={`w-full sm:flex-1 sm:w-auto min-w-[140px] relative flex items-center bg-white/50 rounded-lg border focus-within:ring-2 transition-all ${errorFields.has('email') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus-within:border-macaron-blue focus-within:ring-macaron-blue/20'} ${shakingFields.has('email') ? 'animate-shake' : ''}`}>
          <input 
            type="email" 
            placeholder={t('comments.email')}
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

        <div className={`w-full sm:flex-1 sm:w-auto min-w-[140px] flex items-center bg-white/50 rounded-lg border transition-all ${errorFields.has('phone') ? 'border-macaron-pink ring-2 ring-macaron-pink/20' : 'border-macaron-text/10 focus-within:border-macaron-blue focus-within:ring-2 focus-within:ring-macaron-blue/20'} ${shakingFields.has('phone') ? 'animate-shake' : ''}`}>
          <span className="pl-3 text-sm text-macaron-text font-medium border-r border-macaron-text/10 pr-2">+86</span>
          <input 
            type="tel" 
            placeholder={t('comments.phone')}
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
          placeholder={isReply ? t('comments.reply') : t('comments.placeholder')}
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
            {t('comments.cancel')}
          </button>
        )}
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-macaron-text text-white rounded-lg text-sm font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${isReply ? 'py-1.5 px-4 text-xs' : ''}`}
        >
          {isSubmitting ? t('comments.sending') : (isReply ? t('comments.reply') : t('comments.send'))}
          {!isSubmitting && <Send className={isReply ? "w-3 h-3" : "w-3 h-3"} />}
        </button>
      </div>
    </form>
  );
};
