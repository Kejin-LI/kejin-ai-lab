import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useDynamicTitle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isZh = i18n.language.startsWith('zh');

    const updateMetaTags = () => {
      const description = isZh 
        ? "🤖 欢迎来到 Prism AI / AI 棱镜实验室！这里不生产无聊的代码，只折射未来的光。有会吐槽的数字分身、脑洞大开的 AI 原生应用，还有...还没想好，反正很酷！🚀" 
        : "🤖 Welcome to Prism AI / AI Prism Lab! We don't ship boring code, we refract the future. Featuring a sassy Digital Twin, mind-bending AI-Native Apps, and... well, we're figuring it out, but it's cool! 🚀";
      
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
