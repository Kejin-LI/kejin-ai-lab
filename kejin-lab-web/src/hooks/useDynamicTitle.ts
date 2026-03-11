import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useDynamicTitle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isZh = i18n.language.startsWith('zh');

      if (document.hidden) {
        document.title = isZh 
          ? '别走，这里有 AI！🤖' 
          : 'Come back, human! 🤖';
      } else {
        document.title = isZh 
          ? 'Kejin AI Lab - 探索 AI 原生交互的疆界' 
          : 'Kejin AI Lab - Exploring the frontier of AI-native interactions';
      }
    };

    // Initial title set
    handleVisibilityChange();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [i18n.language]);
};
