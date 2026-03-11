import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

// --- Configuration ---
// TODO: Replace with your Supabase Project URL if using Supabase Edge Functions
// Example: 'https://xlaxuiz...supabase.co/functions/v1/chat'
const SUPABASE_FUNCTION_URL = 'https://hazifuwkvyqhcwlztzce.supabase.co/functions/v1/chat'; 

const DAILY_LIMIT = 10;

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

export const AiChatBubble: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('zh') ? 'zh' : 'en';
  const [isOpen, setIsOpen] = useState(false);
  
  // --- Text Constants based on Language ---
  const WELCOME_MESSAGE_CN = "👋 嘿！我是李珂瑾的数字分身。欢迎来到 Prism AI/AI棱镜实验室（Kejin AI Lab），这里的寓意是期望AI可以为我们折射出更美好的世界和无限的可能。\n\n我有她所有的“黑历史”（划掉）和项目经验。想知道我怎么把 ROI 挖出来的？或者聊聊 Agent 怎么搞？随便问，我主打一个知无不言（只要不涉及商业机密😜）。";
  const WELCOME_MESSAGE_EN = "👋 Hey! I'm Kejin Li's digital twin. Welcome to Prism AI / AI Prism Lab (Kejin AI Lab), which symbolizes the hope that AI can refract a better world and infinite possibilities for us.\n\nI have all her 'dark history' (scratched) and project experience. Want to know how I dig out ROI? Or chat about how to build Agents? Ask me anything, I'm an open book (as long as it's not a trade secret 😜).";

  const LIMIT_MESSAGE_CN = "😅 哎哟，今天问太多啦，明天再来吧！李珂瑾的 tokens 快要被你薅完啦（钱包在滴血🩸）～ 如果你有兴趣多交流，欢迎在网站下方的留言板留言，或者直接发邮件给她哦！📫";
  const LIMIT_MESSAGE_EN = "😅 Oops, too many questions today, come back tomorrow! Kejin's tokens are almost depleted by you (wallet is bleeding 🩸)~ If you want to chat more, feel free to leave a message on the board below or email her directly! 📫";

  const ERROR_MESSAGE_CN = "哎呀，我的大脑刚才短路了一下（可能是 API 余额不足或者网络波动）。请稍后再试一次吧！😅";
  const ERROR_MESSAGE_EN = "Oops, my brain just short-circuited (maybe low API balance or network issues). Please try again later! 😅";

  const SUGGESTED_QUESTIONS_CN = [
    "你是谁？👀",
    "Kejin AI Lab 是做什么的？🧪",
    "讲讲李珂瑾的项目经历 🚀",
    "有什么个人爱好？💃"
  ];
  const SUGGESTED_QUESTIONS_EN = [
    "Who are you? 👀",
    "What is Kejin AI Lab? 🧪",
    "Tell me about Kejin's projects 🚀",
    "Any hobbies? 💃"
  ];

  const ALL_QUESTIONS_CN = [
    "Kejin AI Lab 是做什么的？🧪",
    "你是谁？👀",
    "讲讲李珂瑾的项目经历 🚀",
    "有什么个人爱好？💃",
    "李珂瑾的教育背景是什么？🎓",
    "在这个网站能看到什么？✨",
    "李珂瑾会什么技术栈？💻"
  ];
  const ALL_QUESTIONS_EN = [
    "What is Kejin AI Lab? 🧪",
    "Who are you? 👀",
    "Tell me about Kejin's projects 🚀",
    "Any hobbies? 💃",
    "What is Kejin's education background? 🎓",
    "What can I see on this website? ✨",
    "What tech stack does Kejin know? 💻"
  ];

  const currentAllQuestions = language === 'zh' ? ALL_QUESTIONS_CN : ALL_QUESTIONS_EN;

  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize messages from localStorage if available, otherwise use welcome message
    const savedMessages = localStorage.getItem('ai_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Ensure welcome message is updated based on current language if it's the only message
        if (parsed.length === 1 && parsed[0].id === 'welcome') {
          return [{
            id: 'welcome',
            role: 'assistant',
            content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
          }];
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
    return [{
      id: 'welcome',
      role: 'assistant',
      content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
    }];
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ai_chat_history', JSON.stringify(messages));
  }, [messages]);
  
  // Update welcome message when language changes, but only if it's the only message
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          id: 'welcome',
          role: 'assistant',
          content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
        }];
      }
      return prev;
    });
    // Reset suggestions when language changes
    setCurrentSuggestions((language === 'zh' ? SUGGESTED_QUESTIONS_CN : SUGGESTED_QUESTIONS_EN).slice(0, 3));
  }, [language]);


  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    // Check localStorage for dismissed state
    // Per user request: "Every time user refreshes page, bubble should appear again".
    // So we should NOT persist the dismissed state across reloads.
    // Instead, we only keep it hidden for the current session (component lifecycle) if dismissed.
    // Actually, "refresh" means full page reload. 
    // If I use localStorage, it persists across reloads.
    // To reset on refresh, I should NOT read from localStorage, or use sessionStorage (which persists per tab but not across new sessions usually, but refresh keeps session storage).
    // Actually, the simplest way to "reappear on refresh" is to just initialize it to true.
    // If the user wants to hide it, they click hide, and it sets state to false.
    // When they refresh, component re-mounts, state resets to true.
    
    return true; 
  }); 
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 }); // State for eye movement

  const handleDismissGuide = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling to parent click handler
    setShowGuide(false);
    // Removed localStorage setting to allow reappearance on refresh
  };

  // --- Dynamic Suggestions Logic ---
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>((language === 'zh' ? SUGGESTED_QUESTIONS_CN : SUGGESTED_QUESTIONS_EN).slice(0, 3));

  const updateSuggestions = (history: Message[]) => {
    // Get all user messages
    const userQueries = history
      .filter(m => m.role === 'user')
      .map(m => m.content.toLowerCase());
    
    // Filter out questions that have already been asked (fuzzy match)
    const availableQuestions = currentAllQuestions.filter(q => {
      const qText = q.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, ''); // Keep only text for comparison
      return !userQueries.some(userQ => userQ.includes(qText.substring(0, 4))); // Simple fuzzy check
    });

    // Pick top 2-3
    setCurrentSuggestions(availableQuestions.slice(0, 3));
  };
  // ---------------------------------

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Daily Limit Logic ---
  const checkDailyLimit = (): boolean => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('ai_chat_date');
    const storedCount = parseInt(localStorage.getItem('ai_chat_count') || '0', 10);

    if (storedDate !== today) {
      // New day, reset count
      localStorage.setItem('ai_chat_date', today);
      localStorage.setItem('ai_chat_count', '0');
      return true;
    }

    return storedCount < DAILY_LIMIT;
  };

  const incrementDailyCount = () => {
    const currentCount = parseInt(localStorage.getItem('ai_chat_count') || '0', 10);
    localStorage.setItem('ai_chat_count', (currentCount + 1).toString());
  };
  // -------------------------

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle mouse movement for eye tracking with smooth animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle and distance
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit movement range (max 8px in any direction)
      const maxMove = 8;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15, maxMove);
      
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (!checkDailyLimit()) {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'zh' ? LIMIT_MESSAGE_CN : LIMIT_MESSAGE_EN,
      }]);
      return;
    }

    // Create a placeholder for the assistant's response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true
    };
    
    setMessages(prev => [...prev, assistantMessage]);

    // Update suggestions based on user input immediately
    updateSuggestions([...messages, userMessage]);

    try {
      // Construct the message history for the API
      // We filter out 'isStreaming' and ensure the format is correct for OpenAI/DeepSeek API
      // Note: System Prompt is now handled by the Backend (Supabase Edge Function)
      
      const apiMessages = [
        { 
          role: 'system', 
          content: language === 'zh' 
            ? "你现在的身份包含：Prism AI/AI棱镜实验室（这是 Kejin AI Lab 的标题），寓意是期望AI可以为我们折射出更美好的世界和无限的可能。" 
            : "Your identity now includes: Prism AI / AI Prism Lab (title of Kejin AI Lab), meaning: expecting AI to refract a better world and infinite possibilities for us."
        },
        ...messages.filter(m => m.role !== 'system' && m.id !== 'welcome' && m.content && m.content.trim() !== '').map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: userMessage.content }
      ];

      // --- Send to Supabase Proxy ---
      let proxyUrl = '/api/chat'; // Default fallback (though we prefer Supabase now)
      
      // If Supabase URL is configured, use it
      if (SUPABASE_FUNCTION_URL) {
        proxyUrl = SUPABASE_FUNCTION_URL;
      }

      console.log('Sending request to:', proxyUrl); // DEBUG: Log URL
      console.log('Request payload:', {
        model: "deepseek-chat",
        messages: apiMessages,
        language: language || 'zh'
      }); // DEBUG: Log payload

      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: apiMessages,
          language: language || 'zh' // Pass language to backend so it can select the right System Prompt
        })
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read error text from response
        console.error('API Error Response:', response.status, errorText); // DEBUG: Log error details
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      
      // Increment daily usage only on success
      incrementDailyCount();

      if (!response.body) throw new Error('No response body');

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          
          // Process buffer line by line
          const lines = buffer.split('\n');
          // Keep the last partial line in buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            if (trimmedLine === 'data: [DONE]') continue;
            
            if (trimmedLine.startsWith('data:')) {
              const dataStr = trimmedLine.slice(5).trim();
              try {
                const data = JSON.parse(dataStr);
                const content = data.choices?.[0]?.delta?.content || '';
                
                if (content) {
                  fullContent += content;
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessageId 
                      ? { ...msg, content: fullContent } 
                      : msg
                  ));
                }
              } catch (e) {
                console.warn('Error parsing JSON chunk:', e);
              }
            }
          }
        }
      } catch (streamError) {
        console.error('Stream reading error:', streamError);
        throw streamError;
      } finally {
        reader.releaseLock();
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: language === 'zh' ? ERROR_MESSAGE_CN : ERROR_MESSAGE_EN, isStreaming: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGuide(false);
        }}
        className="fixed bottom-6 right-6 z-50 p-0 bg-transparent rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <div className="w-14 h-14 rounded-full bg-google-grey-900 flex items-center justify-center text-white">
            <X className="w-6 h-6" />
          </div>
        ) : (
          <div className="relative w-16 h-16">
            {/* Guide Bubble - Top */}
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-[20%] right-[115%] bg-white px-5 py-3 rounded-[20px] rounded-br-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-google-grey-200 text-sm font-medium text-google-grey-800 whitespace-nowrap flex flex-col items-center gap-1 z-50 font-sans group/guide"
                >
                  {/* Cat Animation - Smaller & Cuter */}
                  <div className="absolute -top-7 right-3 w-8 h-8 pointer-events-none">
                    {/* Body */}
                    <div className="absolute bottom-0 right-0 w-7 h-4 bg-orange-200 rounded-t-full rounded-bl-full" />
                    {/* Head */}
                    <div className="absolute bottom-2 right-4 w-5 h-4 bg-orange-200 rounded-full">
                      {/* Ears */}
                      <div className="absolute -top-1.5 left-0 w-2 h-2 bg-orange-200 clip-triangle" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                      <div className="absolute -top-1.5 right-0 w-2 h-2 bg-orange-200 clip-triangle" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                      {/* Face */}
                      <div className="absolute top-1.5 left-1 w-0.5 h-0.5 bg-black rounded-full" />
                      <div className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-black rounded-full" />
                      <div className="absolute top-2 left-2 w-1 h-0.5 bg-pink-300 rounded-full" />
                      {/* Blush */}
                      <div className="absolute top-2 left-0.5 w-1 h-0.5 bg-pink-200 rounded-full opacity-60" />
                      <div className="absolute top-2 right-0.5 w-1 h-0.5 bg-pink-200 rounded-full opacity-60" />
                    </div>
                    {/* Tail */}
                    <motion.div 
                      className="absolute bottom-0.5 -right-1 w-1.5 h-5 bg-orange-200 rounded-full origin-bottom"
                      animate={{ rotate: [0, 15, 0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Paws */}
                    <div className="absolute bottom-0 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute bottom-0 right-4 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  <span>{language === 'zh' ? '聊聊AI，或者...我的八卦？🤫' : 'Talk AI, or... my gossip? 🤫'}</span>
                  
                  {/* Close button - ALWAYS visible now, with reduced opacity when not hovering */}
                  <div 
                    onClick={handleDismissGuide}
                    className="absolute -top-2 -left-2 w-5 h-5 bg-google-grey-100 rounded-full flex items-center justify-center text-google-grey-400 hover:text-google-grey-600 hover:bg-google-grey-200 transition-all cursor-pointer shadow-sm border border-google-grey-200 z-50"
                    title="Hide this tip"
                  >
                    <X className="w-3 h-3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Anime Character Image - Parallax & Breathing Effect */}
            <div 
              className="w-full h-full rounded-full overflow-hidden shadow-md bg-google-grey-100 relative"
              style={{
                transform: `perspective(300px) rotateX(${-eyePosition.y * 2}deg) rotateY(${eyePosition.x * 2}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
               <motion.div
                 className="w-full h-full"
                 animate={{ 
                   y: [0, -3, 0],
                   scale: [1, 1.02, 1]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               >
                 <img 
                   src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                   alt="Kejin AI Avatar" 
                   className="w-full h-full object-cover"
                 />
               </motion.div>
               
               {/* 3D Highlight Overlay for depth */}
               <div 
                  className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/20 rounded-full pointer-events-none"
                  style={{
                    backgroundPosition: `${50 + eyePosition.x * 2}% ${50 + eyePosition.y * 2}%`
                  }}
               />
            </div>
            
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md flex flex-col overflow-hidden z-50 font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-labs-purple/10 to-labs-blue/10 border-b border-google-grey-900/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50 shadow-sm flex-shrink-0">
                  <img 
                    src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                    alt="Kejin AI Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-google-grey-900 text-sm">{language === 'zh' ? '李珂瑾的数字分身' : "Kejin's Digital Twin"}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-google-grey-700">{language === 'zh' ? '在线 & 准备吐槽' : 'Online & Ready to Roast'}</p>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-google-yellow" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-google-grey-100/30 scrollbar-thin scrollbar-thumb-labs-purple/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-google-grey-900' 
                      : 'border border-white/50'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img 
                        src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                        alt="AI" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-google-grey-900 text-white rounded-tr-none'
                      : 'bg-white text-google-grey-900 border border-google-grey-900/5 rounded-tl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:my-4 prose-p:leading-relaxed prose-a:text-labs-blue">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-labs-purple animate-pulse align-middle"></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Dynamic Suggested Questions */}
              {!isLoading && currentSuggestions.length > 0 && (
                <div className="mt-4 ml-11 space-y-2 animate-fadeIn">
                  <p className="text-xs text-google-grey-700 font-medium ml-1">{language === 'zh' ? '或许你还想问：' : 'You might also ask:'}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentSuggestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="px-3 py-2 bg-labs-purple/10 border border-labs-purple/20 rounded-xl text-xs text-google-grey-900 hover:bg-labs-purple hover:text-white hover:border-labs-purple transition-all duration-200 shadow-sm text-left active:scale-95"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-google-grey-900/5">
              <div className="relative flex items-center gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'zh' ? "问我关于李珂瑾的任何事..." : "Ask me anything about Kejin..."}
                  className="w-full resize-none rounded-xl border border-google-grey-900/10 bg-google-grey-100/20 px-4 py-3 pr-12 text-sm focus:outline-none focus:border-labs-purple/50 focus:ring-1 focus:ring-labs-purple/50 transition-all max-h-[100px] min-h-[44px]"
                  rows={1}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-2 bg-google-grey-900 text-white rounded-lg hover:bg-google-grey-900/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[10px] text-center text-google-grey-700 mt-2 flex flex-col gap-0.5">
                <p>
                  {language === 'zh' 
                    ? "AI 可能会产生幻觉 (就像产品经理有时候也会画饼 😜)"
                    : "AI might hallucinate (just like PMs sometimes 😜)"
                  }
                </p>
                <p>Powered by DeepSeek & Kejin's AI Lab</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatBubble;