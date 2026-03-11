import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const THOUGHT_THEMES = [
  {
    bgColor: 'bg-[#FFD6F4]', 
    imageBg: 'bg-[#FBBC05]',
    imagePrompt: 'classical oil painting portrait remix collage glitch art yellow background minimalist'
  },
  {
    bgColor: 'bg-[#9D85FF]', 
    imageBg: 'bg-[#202124]',
    imagePrompt: 'abstract map topography 3d typography talking tours dark mode minimalist'
  },
  {
    bgColor: 'bg-[#4F9DFF]', 
    imageBg: 'bg-[#FCE8E6]', 
    imagePrompt: 'fusion food bowl ramen minimalist photography top down view bright colors'
  },
  {
    bgColor: 'bg-[#FF9F5A]', 
    imageBg: 'bg-[#8AB4F8]', 
    imagePrompt: 'abstract brain neurons learning ai visualization colorful minimalist vector art'
  }
];

interface ThoughtData {
  id: string;
  content?: string;
  author: string;
  role: string;
  // Derived
  theme: typeof THOUGHT_THEMES[0];
  title: string;
  subtitle: string;
  desc: string;
  image_url?: string;
}

const Thoughts = () => {
  const { t } = useTranslation();
  const carousel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [thoughts, setThoughts] = useState<ThoughtData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force fallback data for now to ensure static content is displayed
    setThoughts(getFallbackThoughts());
    setLoading(false);
    
    // const fetchThoughts = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('thoughts')
    //       .select('*')
    //       .order('created_at', { ascending: false });

    //     if (error) throw error;

    //     if (data && data.length > 0) {
    //       const formattedThoughts = data.map((t, index) => ({
    //         ...t,
    //         theme: THOUGHT_THEMES[index % THOUGHT_THEMES.length],
    //         // Map content to UI fields. Since DB has 'content' (short quote), we use it as subtitle or desc
    //         // For now, let's assume 'content' is the main text.
    //         title: 'Thought', // Generic title or extract from content
    //         subtitle: t.author || 'Kejin Li',
    //         desc: t.content
    //       }));
    //       setThoughts(formattedThoughts);
    //     } else {
    //        setThoughts(getFallbackThoughts());
    //     }
    //   } catch (err) {
    //     console.error("Error fetching thoughts:", err);
    //     setThoughts(getFallbackThoughts());
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchThoughts();
  }, [t]);

  const getFallbackThoughts = () => [
    {
      id: '1',
      title: 'Social',
      subtitle: t('thoughtsPage.article1.title', 'After Trying Elys, I Realized: The Surprise of AI Socializing Lies in "Imperfection"'),
      desc: t('thoughtsPage.article1.excerpt', 'What impressed me the most was the exclusive digital avatar it creates for each user. It’s not the cold, scripted robot you find on most platforms...'),
      author: 'Kejin Li',
      role: 'Founder',
      theme: THOUGHT_THEMES[0],
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=digital%20avatar%20social%20connection%20human%20imperfection%20warm%20lighting%20emotional%20depth%20minimalist&image_size=square'
    },
    {
      id: '2',
      title: 'Workflow',
      subtitle: t('thoughtsPage.article2.title', 'AI Product Manager’s Delight: Turning Idea into MVP in 24 Hours'),
      desc: t('thoughtsPage.article2.excerpt', 'As an AI product manager drained daily by weekly reports, prototypes, and AI news roundups, I had a late-night epiphany...'),
      author: 'Kejin Li',
      role: 'Founder',
      theme: THOUGHT_THEMES[1],
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=fast%20paced%20prototyping%20ai%20tools%20virtual%20team%20productivity%20spark%20idea%20minimalist&image_size=square'
    },
    {
      id: '3',
      title: 'Tools',
      subtitle: t('thoughtsPage.article3.title', 'PM Lifesaver: No More Stress from Requirements & PRDs'),
      desc: t('thoughtsPage.article3.excerpt', 'A product manager’s daily life is literally an endless cycle of constant overthinking and back-and-forth...'),
      author: 'Kejin Li',
      role: 'Founder',
      theme: THOUGHT_THEMES[2],
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=product%20manager%20zen%20state%20organized%20documents%20peaceful%20workspace%20minimalist%20blue%20tones&image_size=square'
    },
    {
      id: '4',
      title: 'Micro-Interactions',
      subtitle: t('thoughtsPage.article4.title', 'Micro-Interactions Matter'),
      desc: t('thoughtsPage.article4.excerpt', 'The subtle details that turn a functional product into a delightful experience.'),
      author: 'Kejin Li',
      role: 'Founder',
      theme: THOUGHT_THEMES[3],
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=sparkles%20and%20ripples%20micro%20interactions%20yellow%20tones%20minimalist%20abstract&image_size=square'
    }
  ];

  // Update carousel width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };
    // Call updateWidth after data is loaded
    if (!loading) {
       updateWidth();
       setTimeout(updateWidth, 500); // Extra check for image loading
    }
    
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [loading, thoughts]);

  // Handle Mouse Wheel horizontal scrolling
  useEffect(() => {
    const component = carousel.current;
    if (!component) return;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      if (Math.abs(delta) < 5) return; 

      const currentX = x.get();
      const newX = currentX - delta;
      
      const clampedX = Math.max(-width, Math.min(0, newX));
      
      if (clampedX !== currentX || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          x.set(clampedX);
          if (clampedX !== currentX) {
             e.preventDefault();
          }
      }
    };
    
    component.addEventListener('wheel', onWheel, { passive: false });
    return () => component.removeEventListener('wheel', onWheel);
  }, [width, x, loading]); // Added loading dependency

  if (loading) return <div className="py-32 text-center">Loading thoughts...</div>;

  return (
    <section id="thoughts" className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center px-6"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-labs-orange mb-4 block">
            {t('thoughts.subtitle')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-google-grey-900 tracking-tight">
            {t('thoughts.title')}
          </h2>
        </motion.div>
        
        {/* Carousel Container */}
        <motion.div 
          ref={carousel} 
          className="cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-[max(2rem,calc(50vw-600px))]"
        >
          <motion.div 
            style={{ x }}
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-4 md:gap-6 pb-12 pr-6 md:pr-12"
          >
            {thoughts.map((item) => (
              <motion.div
                key={item.id}
                className={cn(
                  "relative flex-shrink-0 w-[85vw] max-w-[340px] md:w-[380px] h-[520px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl",
                  item.theme.bgColor
                )}
              >
                {/* Top Image Area (Approx 50% height) */}
                <div className="h-[55%] w-full flex items-center justify-center p-6">
                  {/* Circular/Geometric Frame for Image */}
                  <div className={cn("relative w-full h-full rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center", item.theme.imageBg)}>
                     <img 
                        src={item.image_url || `https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=${encodeURIComponent(item.theme.imagePrompt)}&image_size=square`} 
                        alt={item.title}
                        className="w-[80%] h-[80%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                     />
                     {/* Overlay Title in Image Area */}
                     <div className="absolute top-4 font-serif text-3xl italic text-black/80 mix-blend-multiply">
                        {item.title}
                     </div>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="h-[45%] w-full px-8 pb-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                      {item.subtitle}
                    </h3>
                    <p className="text-black/80 text-sm font-medium leading-relaxed line-clamp-4">
                      {item.desc}
                    </p>
                  </div>

                  <Link 
                    to={`/thoughts/${item.id}`}
                    className={cn(
                    "w-fit px-6 py-2.5 rounded-full border bg-transparent text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 group/btn",
                    "border-black text-black hover:bg-black hover:text-white"
                  )}>
                    {t('thoughtsPage.readArticle', 'Read More')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-4">
          <Link 
            to="/thoughts"
            className="px-10 py-3 bg-transparent border-2 border-google-grey-900 text-google-grey-900 rounded-full font-bold transition-all hover:bg-google-grey-900 hover:text-white hover:shadow-lg"
          >
            {t('projects.viewAll', 'View All')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Thoughts;
