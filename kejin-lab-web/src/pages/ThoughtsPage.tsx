import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import InteractiveCanvas from '../components/InteractiveCanvas';

// Distinct themes for Thoughts, slightly different from Projects
// Using softer, more "journal-like" or "intellectual" colors
const THOUGHT_THEMES = [
  {
    category: 'designPhilosophy',
    bgColor: 'bg-[#FCE8E6]', // Light Red/Pink
    accentColor: 'text-google-red',
    borderColor: 'border-google-red',
    iconBg: 'bg-google-red',
  },
  {
    category: 'aiEthics',
    bgColor: 'bg-[#E8F0FE]', // Light Blue
    accentColor: 'text-google-blue',
    borderColor: 'border-google-blue',
    iconBg: 'bg-google-blue',
  },
  {
    category: 'futureTech',
    bgColor: 'bg-[#E6F4EA]', // Light Green
    accentColor: 'text-google-green',
    borderColor: 'border-google-green',
    iconBg: 'bg-google-green',
  },
  {
    category: 'productThinking',
    bgColor: 'bg-[#FEF7E0]', // Light Yellow
    accentColor: 'text-google-yellow',
    borderColor: 'border-google-yellow',
    iconBg: 'bg-google-yellow',
  }
];

interface ThoughtData {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Full content would be used in a detail page
  date: string;
  readTime: string;
  image_url: string;
  theme: typeof THOUGHT_THEMES[0];
}

const ThoughtsPage: React.FC = () => {
  const { t } = useTranslation();
  const [thoughts, setThoughts] = useState<ThoughtData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data, using fallback for now
    setThoughts(getFallbackThoughts());
    setLoading(false);
  }, [t]);

  const getFallbackThoughts = () => [
    {
      id: '1',
      title: t('thoughtsPage.article1.title', 'After Trying Elys, I Realized: The Surprise of AI Socializing Lies in "Imperfection"'),
      excerpt: t('thoughtsPage.article1.excerpt', 'What impressed me the most was the exclusive digital avatar it creates for each user. It’s not the cold, scripted robot you find on most platforms...'),
      content: 'Full content here...',
      date: t('thoughtsPage.article1.date', 'Mar 03, 2026'),
      readTime: t('thoughtsPage.article1.readTime', '6 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=digital%20avatar%20social%20connection%20human%20imperfection%20warm%20lighting%20emotional%20depth%20minimalist&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[1] // AI Ethics / Social
    },
    {
      id: '2',
      title: t('thoughtsPage.article2.title', 'AI Product Manager’s Delight: Turning Idea into MVP in 24 Hours'),
      excerpt: t('thoughtsPage.article2.excerpt', 'As an AI product manager drained daily by weekly reports, prototypes, and AI news roundups, I had a late-night epiphany...'),
      content: 'Full content here...',
      date: t('thoughtsPage.article2.date', 'Feb 03, 2026'),
      readTime: t('thoughtsPage.article2.readTime', '8 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=fast%20paced%20prototyping%20ai%20tools%20virtual%20team%20productivity%20spark%20idea%20minimalist&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[3] // Product Thinking
    },
    {
      id: '3',
      title: t('thoughtsPage.article3.title', 'PM Lifesaver: No More Stress from Requirements & PRDs'),
      excerpt: t('thoughtsPage.article3.excerpt', 'A product manager’s daily life is literally an endless cycle of constant overthinking and back-and-forth...'),
      content: 'Full content here...',
      date: t('thoughtsPage.article3.date', 'Feb 01, 2026'),
      readTime: t('thoughtsPage.article3.readTime', '5 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=product%20manager%20zen%20state%20organized%20documents%20peaceful%20workspace%20minimalist%20blue%20tones&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[2] // Future Tech / Tools
    }
  ];

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading thoughts...</div>;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
      {/* Interactive Background Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <InteractiveCanvas />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-google-grey-700 mb-4 block">
            {t('thoughtsPage.subtitle', 'INSIGHTS & REFLECTIONS')}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-google-grey-900 tracking-tight mb-6 font-serif italic">
            {t('thoughtsPage.title', 'Thoughts')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-google-grey-600 leading-relaxed">
            {t('thoughtsPage.description', 'Exploring the frontiers of technology, design, and human experience. A collection of essays, notes, and musings.')}
          </p>
        </motion.div>

        {/* Thoughts Grid - Different layout than Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {thoughts.map((thought, index) => (
            <motion.article
              key={thought.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group flex flex-col h-full rounded-[2rem] overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white",
                thought.theme.borderColor
              )}
            >
              {/* Image Section - Smaller aspect ratio than projects */}
              <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
                <div className={cn("absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30", thought.theme.bgColor)}></div>
                <img 
                  src={thought.image_url} 
                  alt={thought.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-sm",
                    thought.theme.iconBg
                  )}>
                    {t(`thoughtsPage.categories.${thought.theme.category}`, thought.theme.category)}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-google-grey-600 mb-3 font-medium">
                  <span>{thought.date}</span>
                  <span>•</span>
                  <span>{thought.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-google-grey-900 mb-4 leading-tight group-hover:text-labs-blue transition-colors font-serif">
                  {thought.title}
                </h2>

                <p className="text-google-grey-700 mb-6 flex-1 leading-relaxed">
                  {thought.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", thought.theme.iconBg)}>
                        <Quote size={14} fill="currentColor" />
                     </div>
                     <span className="text-xs font-bold text-google-grey-900">Kejin Li</span>
                   </div>

                   <Link 
                     to={`/thoughts/${thought.id}`}
                     className={cn(
                     "flex items-center text-sm font-bold transition-colors group/btn",
                     thought.theme.accentColor
                   )}>
                     {t('thoughtsPage.readArticle', 'Read Article')}
                     <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                   </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Newsletter Signup (Optional Footer Element) */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-google-grey-900 text-white text-center relative overflow-hidden"
        >
          {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div> */}
          {/* <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif italic">
              {t('thoughtsPage.newsletter.title', 'Stay in the loop')}
            </h3>
            <p className="text-google-grey-300 mb-8">
              {t('thoughtsPage.newsletter.desc', 'Get the latest thoughts and experiments delivered to your inbox. No spam, just pure inspiration.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder={t('thoughtsPage.newsletter.placeholder', 'your@email.com')} 
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button className="px-8 py-3 rounded-full bg-white text-google-grey-900 font-bold hover:bg-labs-blue hover:text-white transition-all">
                {t('thoughtsPage.newsletter.button', 'Subscribe')}
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ThoughtsPage;
