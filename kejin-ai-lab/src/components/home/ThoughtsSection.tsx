import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const thoughts = [
  {
    title: "The Future of AI Product Management",
    summary: "How LLMs are reshaping the role of product managers and the skills needed to thrive.",
    date: "Feb 1, 2024",
    readTime: "5 min read",
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
  },
  {
    title: "Prompt Engineering for Designers",
    summary: "Why every designer needs to understand the language of AI models.",
    date: "Jan 15, 2024",
    readTime: "6 min read",
    tags: ["Design", "AI"],
    color: "bg-macaron-yellow/10 border-macaron-yellow"
  }
];

export const ThoughtsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div id="thoughts" className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-macaron-yellow rounded-full animate-bounce-slow shadow-md hover:scale-110 hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-white fill-white/20" />
          </div>
          <h2 className="text-2xl font-bold text-macaron-text">{t('thoughts.title')}</h2>
        </div>
        <a href="#" className="text-macaron-textLight hover:text-macaron-pinkHover flex items-center gap-2 text-sm font-medium transition-colors">
          {t('thoughts.viewAll')} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="space-y-6">
        {thoughts.map((thought, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01, x: 10 }}
            className={`group rounded-3xl border ${thought.color} bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden`}
          >
            <Link to={`/project/${index + 1}`} className="block p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 text-sm text-macaron-textLight font-medium">
                  <span>{thought.date}</span>
                  <span>•</span>
                  <span>{thought.readTime}</span>
                </div>
                <div className="flex gap-2">
                  {thought.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-bold rounded-full bg-white border border-macaron-text/10 text-macaron-textLight">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-macaron-text group-hover:text-macaron-pinkHover transition-colors">
                {thought.title}
              </h3>
              <p className="text-macaron-textLight">
                {thought.summary}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
