
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define translations
const resources = {
  en: {
    translation: {
      brand: {
        name: "Kejin AI Lab"
      },
      nav: {
        home: "Home",
        projects: "Projects",
        thoughts: "Thoughts",
        contact: "Community",
        language: "Language"
      },
      hero: {
        subtitle: "AI Product Engineer = Idea + AI Coding",
        title: "Prism AI",
        description: "Refracting AI into a spectrum of infinite possibilities",
        cta: "Explore More"
      },
      projects: {
        title: "Selected Projects",
        subtitle: "EXPERIMENTS & PROTOTYPES",
        description: "A collection of experiments exploring the intersection of AI, design, and human interaction.",
        viewDetails: "View Details",
        viewAll: "View All",
        project1: {
          title: "Tracing Journey: AI Museum Guide",
          desc: "An AI-native design app that combines smart photo explanations, itinerary planning, and travel journals to make global museum visits easy and fun."
        },
        project2: {
          title: "PM Chest: The Ultimate Toolkit",
          desc: "An AI-powered assistant for product managers to clarify requirements, write PRDs, generate UI designs, and create interactive demos."
        },
        project3: {
          title: "Annotation Expert Recruitment Platform",
          desc: "Link AI data demanders with top domain annotation experts efficiently."
        }
      },
      thoughts: {
        title: "Latest Thoughts",
        subtitle: "INSIGHTS & REFLECTIONS",
        thought1: {
          text: "The future of coding isn't about writing syntax, it's about architecting intent.",
          author: "Kejin Li",
          role: "Founder"
        },
        thought2: {
          text: "AI agents will redefine personal productivity not by doing more, but by understanding better.",
          author: "Kejin Li",
          role: "Founder"
        },
        thought3: {
          text: "True multimodal understanding requires us to move beyond simple embedding alignment.",
          author: "Kejin Li",
          role: "Founder"
        }
      },
      thoughtsPage: {
        subtitle: "INSIGHTS & REFLECTIONS",
        title: "Thoughts",
        description: "Exploring the frontiers of technology, design, and human experience. A collection of essays, notes, and musings.",
        readArticle: "Read Article",
        categories: {
          designPhilosophy: "Design Philosophy",
          aiEthics: "AI Ethics",
          futureTech: "Future Tech",
          productThinking: "Product Thinking"
        },
        article1: {
          title: "After Trying Elys, I Realized: The Surprise of AI Socializing Lies in \"Imperfection\"",
          excerpt: "What impressed me the most was the exclusive digital avatar it creates for each user. It’s not the cold, scripted robot you find on most platforms...",
          date: "Mar 03, 2026",
          readTime: "6 min read"
        },
        article2: {
          title: "AI Product Manager’s Delight: Turning Idea into MVP in 24 Hours",
          excerpt: "As an AI product manager drained daily by weekly reports, prototypes, and AI news roundups, I had a late-night epiphany...",
          date: "Feb 03, 2026",
          readTime: "8 min read"
        },
        article3: {
          title: "AI Overhauls Product Manager Workflow – Productivity Maxed Out💥",
          excerpt: "As a product manager at an AI data annotation platform who’s always locking horns with algorithm and AI product teams...",
          date: "Feb 01, 2026",
          readTime: "5 min read"
        },
        article4: {
          title: "Micro-Interactions Matter",
          excerpt: "The subtle details that turn a functional product into a delightful experience.",
          date: "Dec 05, 2023",
          readTime: "4 min read"
        },
        newsletter: {
          title: "Stay in the loop",
          desc: "Get the latest thoughts and experiments delivered to your inbox. No spam, just pure inspiration.",
          placeholder: "your@email.com",
          button: "Subscribe"
        }
      },
      contact: {
        subtitle: "Community",
        title: "Let's Build Something ",
        amazing: "Amazing",
        email: {
          title: "Email",
          desc: "Drop me a line anytime",
          cta: "Say Hello",
          copy: "Copy Email"
        },
        linkedin: {
          title: "LinkedIn",
          desc: "Let's connect professionally",
          cta: "Connect Profile"
        }
      },
      footer: {
        copyright: "© 2026 Kejin AI Lab. All rights reserved.",
        mission: {
          title: "Exploring the frontier of AI-native interactions.",
          desc: "Building autonomous agents, creative tools, and experimental interfaces that bridge the gap between human intent and machine intelligence."
        },
        nav: {
          title: "Navigation",
          home: "Home",
          projects: "Projects",
          thoughts: "Thoughts",
          contact: "Community"
        },
        connect: {
          title: "Connect",
          email: "Email",
          linkedin: "LinkedIn",
          website: "Website"
        },
        credits: {
          designed: "Designed & Coded by",
          ai_human: "AI & KEJIN LI"
        },
        badges: {
          source: "Source: Github",
          ide: "IDE: Trae",
          model: "Model: Gemini-3-Pro"
        }
      },
      projectDetail: {
        notFound: "Project Not Found",
        backToProjects: "Back to Projects",
        experiment: "Experiment",
        story: "The Story",
        underTheHood: "Under the Hood",
        discussion: "Discussion",
        shareThoughts: "Share your thoughts on this experiment...",
        postComment: "Post Comment",
        readyToTry: "Ready to try?",
        tryItNow: "Try it Now",
        upNext: "Up Next",
        viewExperiment: "View Experiment"
      }
    }
  },
  zh: {
    translation: {
      brand: {
        name: "Kejin AI Lab"
      },
      nav: {
        home: "首页",
        projects: "项目",
        thoughts: "随想",
        contact: "社区",
        language: "语言"
      },
      hero: {
        subtitle: "AI产品工程师 = 想法 + AI编程",
        title: "AI 棱镜实验室",
        description: "将人工智能折射成无限可能的光谱",
        cta: "探索更多"
      },
      projects: {
        title: "精选项目",
        subtitle: "实验 & 原型",
        description: "一系列探索 AI、设计与人类交互交汇点的实验集合。",
        viewDetails: "查看详情",
        viewAll: "查看全部",
        project1: {
          title: "寻迹之旅：AI文博导览",
          desc: "一款 AI 原生设计APP，集智能拍照讲解、行程规划、旅游手帐等于一体，让全球逛展变轻松有趣的文博导览神器。"
        },
        project2: {
          title: "产品经理百宝箱",
          desc: "产品经理助手，用于需求澄清、撰写PRD文档、生成UI设计和可交互Demo。"
        },
        project3: {
          title: "标注专家招募平台",
          desc: "高效连接AI数据需求方与顶尖领域标注专家。"
        }
      },
      thoughts: {
        title: "最新随想",
        subtitle: "洞察 & 思考",
        thought1: {
          text: "编程的未来不在于编写语法，而在于架构意图。",
          author: "李克金",
          role: "创始人"
        },
        thought2: {
          text: "AI 智能体将重新定义个人生产力，不是通过做得更多，而是通过理解得更深。",
          author: "李克金",
          role: "创始人"
        },
        thought3: {
          text: "真正的多模态理解要求我们超越简单的嵌入对齐。",
          author: "李克金",
          role: "创始人"
        }
      },
      thoughtsPage: {
        subtitle: "洞察与思考",
        title: "随想",
        description: "探索技术、设计与人类体验的前沿。随笔、笔记与思考的集合。",
        readArticle: "阅读文章",
        categories: {
          designPhilosophy: "设计哲学",
          aiEthics: "AI 伦理",
          futureTech: "未来科技",
          productThinking: "产品思维"
        },
        article1: {
          title: "试完Elys才发现：AI社交的惊喜，藏在“不完美”里",
          excerpt: "我印象最深的是它为每位用户生成的专属数字分身。它不是大多数平台上那种冷冰冰、只会按脚本回复的机器人...",
          date: "2026年3月03日",
          readTime: "6分钟阅读"
        },
        article2: {
          title: "AI产品经理狂喜：24小时从脑暴到MVP",
          excerpt: "作为一个每天被周报、原型图和AI新闻资讯掏空的AI产品经理，我在深夜产生了一个顿悟...",
          date: "2026年2月03日",
          readTime: "8分钟阅读"
        },
        article3: {
          title: "AI爆改标注产品经理工作流，效率直接拉满💥",
          excerpt: "作为一枚天天和算法、AI产品团队“死磕”的数据标注平台产品经理，以前总觉得自己是“夹心饼干+工具人”...",
          date: "2026年2月01日",
          readTime: "5分钟阅读"
        },
        article4: {
          title: "微交互至关重要",
          excerpt: "那些将功能性产品转化为令人愉悦体验的细微细节。",
          date: "2023年12月05日",
          readTime: "4分钟阅读"
        },
        newsletter: {
          title: "保持关注",
          desc: "获取发送到您收件箱的最新思考与实验。无垃圾邮件，只有纯粹的灵感。",
          placeholder: "your@email.com",
          button: "订阅"
        }
      },
      contact: {
        subtitle: "社区",
        title: "让我们一起创造 ",
        amazing: "非凡之作",
        email: {
          title: "邮件",
          desc: "随时来信交流",
          cta: "打个招呼",
          copy: "复制邮件地址"
        },
        linkedin: {
          title: "领英",
          desc: "建立职业连接",
          cta: "查看主页"
        }
      },
      footer: {
        copyright: "© 2026 Kejin AI Lab. 保留所有权利。",
        mission: {
          title: "探索 AI 原生交互的疆界",
          desc: "构建自主智能体、创意工具与实验性界面，弥合人类意图与机器智能的鸿沟。"
        },
        nav: {
          title: "导航",
          home: "首页",
          projects: "项目",
          thoughts: "随想",
          contact: "社区"
        },
        connect: {
          title: "连接",
          email: "邮件",
          linkedin: "领英",
          website: "网站"
        },
        credits: {
          designed: "设计与开发：",
          ai_human: "AI & KEJIN LI"
        },
        badges: {
          source: "源码：Github",
          ide: "IDE：Trae",
          model: "模型：Gemini-3-Pro"
        }
      },
      projectDetail: {
        notFound: "未找到项目",
        backToProjects: "返回项目列表",
        experiment: "实验",
        story: "项目故事",
        underTheHood: "技术解密",
        discussion: "交流讨论",
        shareThoughts: "分享你对这个实验的想法...",
        postComment: "发表评论",
        readyToTry: "准备好尝试了吗？",
        tryItNow: "立即体验",
        upNext: "下一个项目",
        viewExperiment: "查看实验"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;
