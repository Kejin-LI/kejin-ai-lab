
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);
  const email = "likejin2019@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/kejin-li/";
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative pt-20 pb-10 md:pt-32 md:pb-20 bg-google-grey-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-white to-transparent rounded-full opacity-50 blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-google-blue mb-4 block">
            {t('contact.subtitle')}
          </span>
          <h2 className="text-4xl md:text-7xl font-bold text-google-grey-900 tracking-tight mb-6">
            {t('contact.title')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-labs-blue via-labs-pink to-labs-orange animate-gradient bg-300%">
              {t('contact.amazing')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-white rounded-[2rem] p-8 border border-google-grey-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-labs-blue/5 to-labs-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-labs-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-google-blue" />
              </div>
              
              <h3 className="text-2xl font-bold text-google-grey-900 mb-2">{t('contact.email.title')}</h3>
              <p className="text-google-grey-600 mb-8">{t('contact.email.desc')}</p>
              
              <div className="mt-auto flex gap-3 w-full">
                <a 
                  href={`mailto:${email}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-google-grey-900 text-white font-medium hover:bg-google-blue transition-colors flex items-center justify-center gap-2"
                >
                  {t('contact.email.cta')}
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="p-3 rounded-xl border border-google-grey-200 hover:bg-google-grey-50 hover:border-google-grey-300 transition-all text-google-grey-700"
                  title={t('contact.email.copy')}
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white rounded-[2rem] p-8 border border-google-grey-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-labs-blue/5 to-labs-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0077b5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-8 h-8 text-[#0077b5]" />
              </div>
              
              <h3 className="text-2xl font-bold text-google-grey-900 mb-2">{t('contact.linkedin.title')}</h3>
              <p className="text-google-grey-600 mb-8">{t('contact.linkedin.desc')}</p>
              
              <div className="mt-auto w-full">
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-google-grey-200 hover:border-[#0077b5] hover:text-[#0077b5] font-medium transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {t('contact.linkedin.cta')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
