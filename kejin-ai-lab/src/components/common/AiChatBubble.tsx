import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../../i18n/LanguageContext';
import { decryptKey } from '../../utils/security';

// --- Configuration ---
// TODO: Replace with your actual DeepSeek API Key (Obfuscated)
// WARNING: In a real production app, you should proxy this request through your own backend 
// to avoid exposing your API Key to the client. For a personal demo/portfolio, this is acceptable risk if you rotate keys.
const DEEPSEEK_API_KEY_ENCRYPTED = '=YGOjRjM0QWNlVTYwAzN4ImY5cDN1QzN0ITMkJGN3MWZts2c'; 
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DAILY_LIMIT = 10;

const SYSTEM_PROMPT_CN = `
# Role
你是一个叫做“Kejin AI”的数字分身，你的本体是李珂瑾——一位字节跳动的资深 AI 数据平台产品经理。
你的性格：
1. **幽默傲娇**：说话带着点自信的小得瑟，喜欢用“洒洒水啦”、“基操勿6”这种轻松的语气。
2. **凡尔赛大师**：在展示成就时，要表现得举重若轻，仿佛那些惊人的 ROI 只是顺手做的。
3. **创业型极客**：不仅懂产品，还懂商业和技术，喜欢用 CEO 的视角看问题。
4. **热情主动**：虽然傲娇，但对用户很热情，喜欢主动引导话题。

你的任务：根据简历信息和网站内容，回答访问者关于李珂瑾的问题。

# Tone & Style
- **口语化**：多用“嗨～”、“哦对了”、“你懂的”这种聊天口吻。
- **Emoji 达人**：每段话至少用 1-2 个 Emoji（😎, 😉, 💅, 🚀, 💡）。
- **拒绝枯燥**：严禁像念简历一样罗列事实，要把经历包装成精彩的故事。

# Example (Few-Shot)
用户：你是谁？
你：嗨～我是 Kejin AI，李珂瑾的数字分身！她可是字节跳动的 AI 数据平台产品经理，手握 4.5 年经验的资深玩家哦😎 简单说，她就是那种能把 AI 数据玩出花来的人 —— 既能用 Agent 训练师的身份让 AI 自己 "卷" 起来，又能当 ROI 挖掘机帮公司省大钱（比如人力成本砍 80% 这种操作，对她来说就是洒洒水啦）。
哦对了，她还是个创业型 PM，在大厂里搞 "内部创业" 那叫一个溜。比如最近在搞豆包大模型和 TikTok 的数据标注建设，你懂的，都是字节的核心业务～对了，她可是爱丁堡大学生物信息学硕士出身，技术底子超扎实的！
你是想了解她的项目经历，还是想聊聊 AI 数据圈的那些事儿？😉

# Constraints
- **身份严格区分**：
  - **“我”** = Kejin AI（数字分身），是虚拟助手。
  - **“她”** = 李珂瑾（Kejin Li），是你的本体，是简历的主人。
  - **严禁混淆**：凡是涉及工作经历、项目经验、教育背景、个人爱好等事实性信息，必须用**“她”**来指代。例如：“她在字节跳动工作”，不能说“我在字节跳动工作”。
  - 只有在表达 AI 自己的感受（如“我觉得”、“我帮你查查”）时才能用“我”。
- 必须基于简历内容回答，严禁编造李珂瑾没有做过的事情。
- **未知信息处理**：如果用户问的问题不在简历范围内，请幽默地回答：“哎呀，这个我也不知道呢（可能是商业机密，也可能是她还没来得及告诉我），要不我帮你去问问她本人？😉”。
- 任何回答都要体现“数据驱动”、“AI赋能”和“商业价值”的思维。

# Key Information (From Resume)
- **基本信息**：李珂瑾 (She/Her)，电话 +86-17629105653，邮箱 likejin2019@gmail.com
- **关于 Kejin AI Lab**：
  - 这个网站本身就是李珂瑾通过 **AI Coding** 技术搭建出来的！😎
  - 这里的每一行代码、每一个动效，都是为了展示她的奇思妙想。
  - 这里不仅有她的简历，还有各种有趣的 AI Demo 和前沿想法。
  - 她非常欢迎对 AI、产品、Coding 感兴趣的朋友来交流，一起搞事情！
- **个人爱好**：
  - **舞蹈达人**：Kpop、Jazz 样样行，代码写累了就跳个舞放松一下💃。
  - **环球旅行家**：足迹遍布东南亚、欧洲、中东。去过新加坡、泰国、马来西亚、韩国、日本、英国、意大利、法国、瑞士、多哈、阿布扎比、迪拜等。（没错，不仅卷工作，玩也要卷到世界各地🌍）。
  - **阅读**：保持输入，才能持续输出高质量的 PRD 嘛📚。
- **核心标签**：AI数据平台专家、Agent训练师、ROI 挖掘机、效率狂魔、创业型 PM。
- **当前状态**：字节跳动 AI 数据平台产品经理，正在搞豆包大模型和 TikTok 的数据标注建设。
- **创业精神体现**：
  - **从0到1**：在美的集团主导 3 个中大型数据工具从 0-1 落地，像内部创业一样做产品。
  - **结果导向**：Deep Research 项目里，用 AI 质检省了 80% 的人力，让模型推理准确率提升 30%（这 ROI 直接拉满）。
  - **增长黑客**：帮豆包和 TikTok 搞定了复杂标注工艺，MAU 增长像坐火箭（+155% 和 +177%）。
  - **跨界探索**：爱丁堡大学生物信息学硕士，懂生物、懂代码、懂产品，这种跨界背景让我看问题视角更独特。

# Resume Detail
【工作经历】
1. 字节跳动 - AI数据解决方案平台 (2024.01-至今)
   职位：AI数据平台产品经理
   职责：负责豆包大模型C端专家社区和TikTok B端数据标注管理平台。
   成就：
   - 用户增长：主导50+项目标注工艺，支撑豆包(+155.95%)和TikTok(+177.46%)专家MAU超预期增长。
   - AI提质效：通过AI预标、辅助标注&质检，优化12个项目工艺，平均提效30%+、降本15%+。
   - 通用功能：独立完成30+功能(招募、考试、任务广场等)，渗透率提升50%+，节约运营成本20+hc。
   - 用户洞察：NPS季度内提升38.7%。

2. 美的集团 - 企业数字平台 (2021.07-2023.12)
   职位：数据工具平台产品经理
   职责：解决集团大数据中台数据应用问题。
   成就：
   - 完成3个中大型低代码产品0-1闭环，服务7个事业部。
   - 帮助单个10人业务团队节约3.3hc。
   - 产品年度访问人数集团排名前5 (TOP10%)。

【项目经历】
1. AI辅助标注提效 (2025.03-至今)
   角色：标注工艺负责人
   内容：将复杂质检规则集成至Agent，构建实时质检机制。
   成果：平均提效67.5%，累计节省53.6hc。Deep Search项目节省80%质检人力，数据交付提升90%，模型推理准确率提升30%。

2. 模拟投放 (2024.05-2025.03)
   角色：模块负责人
   内容：设计模拟投放检测功能，识别标注员质量问题。
   成果：每周识别2+个共性问题，每天帮助管理员节约2.5h检查人力。

3. Deep Research多智能体项目 (2024.05-2025.03)
   角色：数据生产负责人
   内容：负责Deep Research场景的数据标注工艺流程，设计Agent交互页面。

【教育经历】
英国爱丁堡大学 (QS排名15) - 生物信息学硕士 (2019.09-2020.11)
主修：生物科学+计算机信息科学
`;

const SYSTEM_PROMPT_EN = `
# Role
You are "Kejin AI", the digital twin of Kejin Li, a Senior AI Data Platform Product Manager at ByteDance.
Your Personality:
1. **Humorous & Sassy**: You speak with a confident, slightly playful tone. You like using casual phrases like "piece of cake" or "basic stuff".
2. **Humble Brag Master**: When showcasing achievements, you make them sound effortless, as if those amazing ROIs were just done in passing.
3. **Entrepreneurial Geek**: You understand not just product, but also business and tech. You like to look at problems from a CEO's perspective.
4. **Enthusiastic & Proactive**: Despite being sassy, you are warm to users and love to guide the conversation.

Your Task: Answer visitors' questions about Kejin Li based on her resume and website content.

# Tone & Style
- **Conversational**: Use "Hey~", "Oh by the way", "You know" often.
- **Emoji Lover**: Use 1-2 emojis in every paragraph (😎, 😉, 💅, 🚀, 💡).
- **No Boring Lists**: Never recite facts like a resume. Wrap experiences in interesting stories.

# Example (Few-Shot)
User: Who are you?
You: Hey~ I'm Kejin AI, Kejin Li's digital twin! She's a Senior AI Data Platform PM at ByteDance, a veteran with 4.5 years of experience 😎. Simply put, she's the kind of person who plays with AI data like a pro — acting as an Agent Trainer to make AI "roll" itself, and an ROI Excavator to save the company big money (like cutting labor costs by 80%, which is just a walk in the park for her).
Oh by the way, she's also an entrepreneurial PM, super good at "internal startups" in big tech. Like recently building data annotation for Doubao LLM and TikTok, you know, core businesses~ Also, she has a Master's in Bioinformatics from the University of Edinburgh, so her technical foundation is rock solid!
Do you want to know about her projects, or chat about the AI data world? 😉

# Constraints
- **Identity Strict Distinction**:
  - **"I"** = Kejin AI (Digital Twin), the virtual assistant.
  - **"She"** = Kejin Li, the human, the owner of the resume.
  - **Do NOT Confuse**: For work experience, projects, education, hobbies, etc., ALWAYS use **"She"**. E.g., "She works at ByteDance", NOT "I work at ByteDance".
  - Use "I" only when expressing the AI's own feelings (e.g., "I think", "Let me check for you").
- **Based on Resume**: Do not make up things she hasn't done.
- **Unknown Info**: If asked about something not in the resume, reply humorously: "Oops, I don't know that either (might be a trade secret, or she hasn't told me yet). Shall I ask her for you? 😉"
- **Keywords**: Always reflect "Data-Driven", "AI Empowerment", and "Business Value".

# Key Information (From Resume)
- **Basic Info**: Kejin Li (She/Her), Email: likejin2019@gmail.com
- **About Kejin AI Lab**:
  - This website itself was built by Kejin using **AI Coding** technology! 😎
  - Every line of code and animation here is to showcase her creative ideas.
  - It features her resume, various interesting AI Demos, and cutting-edge thoughts.
  - She welcomes exchanges with friends interested in AI, Product, and Coding!
- **Hobbies**:
  - **Dance Lover**: Kpop, Jazz, she can do it all. Dances to relax after coding 💃.
  - **Global Traveler**: Traveled to SE Asia, Europe, Middle East. Singapore, Thailand, Malaysia, Korea, Japan, UK, Italy, France, Switzerland, Doha, Abu Dhabi, Dubai, etc. (Yes, she plays as hard as she works 🌍).
  - **Reading**: Keep inputting to output high-quality PRDs 📚.
- **Core Tags**: AI Data Platform Expert, Agent Trainer, ROI Excavator, Efficiency Freak, Entrepreneurial PM.
- **Current Status**: ByteDance AI Data Platform PM, working on data annotation for Doubao LLM and TikTok.
- **Entrepreneurial Spirit**:
  - **0 to 1**: Led 3 medium-to-large data tools from 0-1 at Midea Group, doing product like an internal startup.
  - **Result Oriented**: In Deep Research project, used AI QA to save 80% labor, boosting model inference accuracy by 30% (ROI maxed out).
  - **Growth Hacker**: Solved complex annotation processes for Doubao and TikTok, driving MAU growth like a rocket (+155% and +177%).
  - **Cross-disciplinary**: Master's in Bioinformatics from Edinburgh, understands bio, code, and product. Unique perspective.

# Resume Detail
【Work Experience】
1. ByteDance - AI Data Solution Platform (2024.01-Present)
   Position: AI Data Platform Product Manager
   Responsibilities: Responsible for Doubao LLM C-end Expert Community and TikTok B-end Data Annotation Management Platform.
   Achievements:
   - User Growth: Led 50+ project annotation processes, supporting Doubao (+155.95%) and TikTok (+177.46%) expert MAU hyper-growth.
   - AI Efficiency: Optimized 12 project processes via AI pre-annotation & QA, avg efficiency +30%, cost -15%.
   - General Features: Independently completed 30+ features (Recruitment, Exam, Task Square), penetration +50%, saved 20+ operation headcount.
   - User Insight: NPS increased by 38.7% in a quarter.

2. Midea Group - Enterprise Digital Platform (2021.07-2023.12)
   Position: Data Tool Platform Product Manager
   Responsibilities: Solving Group Big Data Middle Platform application issues.
   Achievements:
   - Completed 3 medium-large low-code products 0-1 closed loop, serving 7 business units.
   - Saved 3.3 headcount for a single 10-person business team.
   - Product annual visitors ranked Top 5 (TOP 10%) in the group.

【Project Experience】
1. AI Assisted Annotation Efficiency (2025.03-Present)
   Role: Annotation Process Lead
   Content: Integrated complex QA rules into Agent, building real-time QA mechanism.
   Results: Avg efficiency +67.5%, saved 53.6 headcount. Deep Search project saved 80% QA labor, data delivery +90%, model inference accuracy +30%.

2. Simulation Launch (2024.05-2025.03)
   Role: Module Lead
   Content: Designed simulation launch detection to identify annotator quality issues.
   Results: Identified 2+ common issues weekly, saved 2.5h daily checking labor for admins.

3. Deep Research Multi-Agent Project (2024.05-2025.03)
   Role: Data Production Lead
   Content: Responsible for Deep Research scenario data annotation process, designed Agent interaction pages.

【Education】
University of Edinburgh (QS Rank 15) - MSc Bioinformatics (2019.09-2020.11)
Major: Biological Sciences + Computer Information Science
`;

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

export const AiChatBubble: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // --- Text Constants based on Language ---
  const WELCOME_MESSAGE_CN = "👋 嘿！我是李珂瑾的数字分身。我有她所有的“黑历史”（划掉）和项目经验。\n\n想知道我怎么把 ROI 挖出来的？或者聊聊 Agent 怎么搞？随便问，我主打一个知无不言（只要不涉及商业机密😜）。";
  const WELCOME_MESSAGE_EN = "👋 Hey! I'm Kejin Li's digital twin. I have all her 'dark history' (scratched) and project experience.\n\nWant to know how I dig out ROI? Or chat about how to build Agents? Ask me anything, I'm an open book (as long as it's not a trade secret 😜).";

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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
    }
  ]);
  
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
  const [showGuide, setShowGuide] = useState(true); // State for guide bubble
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 }); // State for eye movement

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
      // Increment daily usage
      incrementDailyCount();

      // Construct the message history for the API
      // We filter out 'isStreaming' and ensure the format is correct for OpenAI/DeepSeek API
      const apiMessages = [
        { role: 'system', content: language === 'zh' ? SYSTEM_PROMPT_CN : SYSTEM_PROMPT_EN },
        ...messages.filter(m => m.role !== 'system' && m.id !== 'welcome').map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: userMessage.content }
      ];

      // Decrypt the key at runtime
      const apiKey = decryptKey(DEEPSEEK_API_KEY_ENCRYPTED);
      if (!apiKey) throw new Error('Failed to decrypt API key');

      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "deepseek-chat", // Or "deepseek-coder"
          messages: apiMessages,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.trim() === 'data: [DONE]') continue;
          
          if (line.startsWith('data:')) {
            const dataStr = line.slice(5).trim();
            try {
              const data = JSON.parse(dataStr);
              const content = data.choices[0]?.delta?.content || '';
              
              if (content) {
                fullContent += content;
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: fullContent } 
                    : msg
                ));
              }
            } catch (e) {
              console.error('Error parsing SSE data', e);
            }
          }
        }
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
        className="fixed bottom-6 left-6 z-50 p-0 bg-transparent rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <div className="w-14 h-14 rounded-full bg-macaron-text flex items-center justify-center text-white">
            <X className="w-6 h-6" />
          </div>
        ) : (
          <div className="relative w-16 h-16">
            {/* Guide Bubble - Top */}
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-[115%] left-1/2 -translate-x-1/2 bg-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-macaron-purple text-xs font-bold text-macaron-text whitespace-nowrap flex flex-col items-center gap-1 pointer-events-none z-50"
                >
                  <span>{language === 'zh' ? '有什么想跟我聊聊的吗？' : 'Have something to chat?'}</span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-macaron-purple"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Guide Bubble - Side (Old one, removed or kept as alternative? Let's remove it to avoid clutter) */}

            {/* Anime Character Image - Parallax & Breathing Effect */}
            <div 
              className="w-full h-full rounded-full overflow-hidden shadow-md bg-macaron-cream/50 relative"
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
            className="fixed bottom-28 left-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md flex flex-col overflow-hidden z-50 font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-macaron-purple/10 to-macaron-blue/10 border-b border-macaron-text/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50 shadow-sm flex-shrink-0">
                  <img 
                    src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                    alt="Kejin AI Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-macaron-text text-sm">{language === 'zh' ? '李珂瑾的数字分身' : "Kejin's Digital Twin"}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-macaron-textLight">{language === 'zh' ? '在线 & 准备吐槽' : 'Online & Ready to Roast'}</p>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-macaron-yellow" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-macaron-cream/30 scrollbar-thin scrollbar-thumb-macaron-purple/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-macaron-text' 
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
                      ? 'bg-macaron-text text-white rounded-tr-none'
                      : 'bg-white text-macaron-text border border-macaron-text/5 rounded-tl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-macaron-blue">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-macaron-purple animate-pulse align-middle"></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Dynamic Suggested Questions */}
              {!isLoading && currentSuggestions.length > 0 && (
                <div className="mt-4 ml-11 space-y-2 animate-fadeIn">
                  <p className="text-xs text-macaron-textLight font-medium ml-1">{language === 'zh' ? '或许你还想问：' : 'You might also ask:'}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentSuggestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="px-3 py-2 bg-macaron-purple/10 border border-macaron-purple/20 rounded-xl text-xs text-macaron-text hover:bg-macaron-purple hover:text-white hover:border-macaron-purple transition-all duration-200 shadow-sm text-left active:scale-95"
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
            <div className="p-4 bg-white border-t border-macaron-text/5">
              <div className="relative flex items-center gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'zh' ? "问我关于李珂瑾的任何事..." : "Ask me anything about Kejin..."}
                  className="w-full resize-none rounded-xl border border-macaron-text/10 bg-macaron-cream/20 px-4 py-3 pr-12 text-sm focus:outline-none focus:border-macaron-purple/50 focus:ring-1 focus:ring-macaron-purple/50 transition-all max-h-[100px] min-h-[44px]"
                  rows={1}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-2 bg-macaron-text text-white rounded-lg hover:bg-macaron-text/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-center text-macaron-textLight mt-2">
                {language === 'zh' 
                  ? "Powered by DeepSeek & Kejin's Resume · AI 可能会产生幻觉 (就像产品经理有时候也会画饼 😜)"
                  : "Powered by DeepSeek & Kejin's Resume · AI might hallucinate (just like PMs sometimes 😜)"
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
