import React from 'react';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { motion } from 'framer-motion';

import { CommentSection } from './CommentSection';
import { useLanguage } from '../../i18n/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="p-12 bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm relative overflow-hidden scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-macaron-yellow/30 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-macaron-pink/30 rounded-full blur-2xl" />
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-macaron-text">
            {t('contact.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-macaron-pinkHover to-macaron-purple whitespace-nowrap">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-macaron-textLight text-xl max-w-xl mx-auto mb-12">
            {t('contact.subtitle')}
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            {[
              { icon: Mail, href: "mailto:likejin2019@gmail.com", color: "hover:text-macaron-pinkHover hover:border-macaron-pinkHover" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/kejin-li/", color: "hover:text-macaron-blueHover hover:border-macaron-blueHover" }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href={item.href}
                target={item.icon === Mail ? "_self" : "_blank"}
                rel={item.icon === Mail ? "" : "noopener noreferrer"}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-5 bg-white rounded-full border-2 border-transparent shadow-md hover:shadow-xl transition-all duration-300 group ${item.color}`}
              >
                <item.icon className="w-6 h-6 text-macaron-textLight group-hover:text-current transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Embedded Comment Section */}
        <div className="text-left">
          <CommentSection pageId="home" />
        </div>
      </div>
    </section>
  );
};
