import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useDynamicTitle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isZh = i18n.language.startsWith('zh');

    const updateMetaTags = () => {
      const description = isZh 
        ? "Prism AI / AI棱镜实验室（Kejin AI Lab），这里的寓意是期望AI可以为我们折射出更美好的世界和无限的可能。探索构建自主智能体、创意工具与实验性界面。" 
        : "Prism AI / AI Prism Lab (Kejin AI Lab), symbolizing the hope that AI can refract a better world and infinite possibilities for us. Exploring autonomous agents, creative tools, and experimental interfaces.";
      
      const title = isZh 
        ? 'Kejin AI Lab - 探索 AI 原生交互的疆界' 
        : 'Kejin AI Lab - Exploring the Frontier of AI-Native Interactions';

      // Update document title
      document.title = title;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);

      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      // Update Twitter tags
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', title);

      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = isZh 
          ? '别走，这里有 AI！🤖' 
          : 'Come back, human! 🤖';
      } else {
        updateMetaTags();
      }
    };

    // Initial update
    updateMetaTags();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [i18n.language]);
};
