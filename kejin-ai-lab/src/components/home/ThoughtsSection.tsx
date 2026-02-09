import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const thoughts = [
  {
    title: "The Future of AI Product Management",
    summary: "How LLMs are reshaping the role of product managers and the skills needed to thrive.",
    date: "Feb 3, 2026",
    readTime: "3 min read",
    tags: ["AI", "Product Management"],
    color: "bg-macaron-pink/10 border-macaron-pink"
  },
  {
    title: "From Idea to MVP in 24 Hours",
    summary: "A case study on using AI tools to rapid prototype and validate product assumptions.",
    date: "Jan 28, 2024",
    readTime: "8 min read",
    tags: ["Prototyping", "Workflow"],
    color: "bg-macaron-blue/10 border-macaron-blue"
  }
];

export const ThoughtsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const currentThoughts = thoughts.map((thought, index) => {
    if (index === 0) {
      return {
        ...thought,
        title: language === 'zh' ? 'AI 爆改产品经理工作流程' : 'The Future of AI Product Management',
        summary: language === 'zh' ? '大模型如何重塑产品经理角色及必备技能' : 'How LLMs are reshaping the role of product managers and the skills needed to thrive.',
        tags: language === 'zh' ? ['AI', '产品管理'] : ['AI', 'Product Management'],
        date: language === 'zh' ? '2026年2月3日' : 'Feb 3, 2026',
        readTime: language === 'zh' ? '3 分钟阅读' : '3 min read'
      };
    }
    if (index === 1) {
      return {
        ...thought,
        title: language === 'zh' 
          ? 'AI产品经理狂喜✨24小时从脑暴到MVP，我靠AI工具组了个“虚拟团队”' 
          : 'AI Product Manager’s Delight ✨ Turning Idea into MVP in 24 Hours with My AI "Virtual Team"',
        summary: language === 'zh'
          ? '关于利用 AI 工具快速构建原型并验证产品假设的实战复盘。'
          : 'A case study on using AI tools to rapid prototype and validate product assumptions.',
        tags: language === 'zh' 
          ? ['AI产品经理', 'MVP落地指南', 'AI工具实战', '个人网站搭建', 'Prompt工程'] 
          : ['AIProductManager', 'MVPLaunchGuide', 'AIToolPractices', 'PersonalWebsiteBuilding', 'PromptEngineering'],
        date: language === 'zh' ? '2026年2月3日' : 'Feb 3, 2026',
        readTime: language === 'zh' ? '5 分钟阅读' : '5 min read'
      };
    }
    return thought;
  });

  return (
    <div id="thoughts" className="mb-16">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-macaron-yellow rounded-full animate-bounce-slow shadow-md hover:scale-110 hover:rotate-12 transition-transform duration-300">
          <Lightbulb className="w-6 h-6 text-white fill-white/20" />
        </div>
        <h2 className="text-2xl font-bold text-macaron-text">{t('thoughts.title')}</h2>
      </div>
      
      <div className="space-y-6">
        {currentThoughts.map((thought, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`group rounded-3xl border ${thought.color} bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden`}
          >
            <Link to={`/project/thought-${index + 1}`} className="block p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 text-sm text-macaron-textLight font-medium">
                  <span>{thought.date}</span>
                  <span>•</span>
                  <span>{thought.readTime}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {thought.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 text-xs font-bold rounded-full bg-white border border-macaron-text/10 text-macaron-textLight whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-macaron-text group-hover:text-macaron-pinkHover transition-colors">{thought.title}</h3>
              <p className="text-macaron-textLight">{thought.summary}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
