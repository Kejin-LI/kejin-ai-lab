import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Calendar, Share2, MessageSquare, Send, ThumbsUp, User, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from '../components/CommentSection';
import AuthModal from '../components/AuthModal';

// Reusing themes from ThoughtsPage (in a real app, this would be shared)
const THOUGHT_THEMES = [
  {
    category: 'designPhilosophy',
    bgColor: 'bg-[#FCE8E6]', 
    accentColor: 'text-google-red',
    borderColor: 'border-google-red',
    iconBg: 'bg-google-red',
    buttonBorder: 'border-google-red',
  },
  {
    category: 'aiEthics',
    bgColor: 'bg-[#E8F0FE]', 
    accentColor: 'text-google-blue',
    borderColor: 'border-google-blue',
    iconBg: 'bg-google-blue',
    buttonBorder: 'border-google-blue',
  },
  {
    category: 'futureTech',
    bgColor: 'bg-[#E6F4EA]', 
    accentColor: 'text-google-green',
    borderColor: 'border-google-green',
    iconBg: 'bg-google-green',
    buttonBorder: 'border-google-green',
  },
  {
    category: 'productThinking',
    bgColor: 'bg-[#FEF7E0]', 
    accentColor: 'text-google-yellow',
    borderColor: 'border-google-yellow',
    iconBg: 'bg-google-yellow',
    buttonBorder: 'border-google-yellow',
  }
];

// Mock Data Provider
const getThoughtById = (id: string, t: any, i18n: any) => {
  const isZh = i18n.language.startsWith('zh');

  const thoughts = [
    {
      id: '1',
      title: t('thoughtsPage.article1.title', 'After Trying Elys, I Realized: The Surprise of AI Socializing Lies in "Imperfection"'),
      subtitle: isZh ? "AI社交的惊喜，藏在“不完美”里" : "The Surprise of AI Socializing Lies in \"Imperfection\"",
      content: isZh ? `
        <p class="lead">前段时间试了试Elys，这份惊喜不止是一瞬间的“眼前一亮”，更让我慢慢发现：AI社交的惊喜，从来都不在“完美”里。但这份触动没持续太久，反而让我开始想：AI到底能把社交，带向一个什么样的未来？</p>
        <h3>心动点：那个“懂我的数字分身”</h3>
        <p>最让我惊艳的，是它给每个用户打造的专属数字分身。它不是市面上那种套着话术模板的冰冷机器人，而是真的能复刻你的声线、记住你的过往、读懂你的喜好，活脱脱一个数字世界里的「另一个我」。</p>
        <p>我们每天泡在社交软件里，总会被海量信息流淹没，要应付无意义的寒暄，要花大把时间筛选同频的声音，而这个分身，能精准接住我的所有需求：替我筛掉无效信息、提炼核心观点，甚至能懂我没说出口的潜台词。</p>
        <p>更妙的是，和它对话越久，它就越懂我——那些我随口提过的小众喜好，藏在话里的细碎情绪，它都能稳稳接住。那种被精准共情的感觉，是我在无数AI产品里从未体验过的。那一刻我真的觉得，AI原生社交的大门，好像真的被推开了一道缝。</p>
        <h3>灵魂拷问：AI社交的底层，是“帮我”还是“看见我”？</h3>
        <p>可心动过后，冷静下来拆解产品的底层逻辑，一个绕不开的灵魂拷问，狠狠砸了过来：<strong>AI到底该在社交里，扮演什么样的角色？我们期待的AI原生社交，真的是让AI替我们社交吗？</strong></p>
        <p>做产品这么久，我始终认同一个判断：所有产品的底层逻辑，无非分两种——<strong>「Help Me」和「See Me」</strong>。现在市面上99%的AI产品，都在往死里卷「Help Me」：拼谁的效率更高，谁的功能更全，谁能帮用户省更多时间。Elys的数字分身，本质上也是这个赛道里的优等生：它帮你处理信息，帮你完成表达，帮你把社交里的繁琐事一键清零。</p>
        <blockquote><p>可我们偏偏忘了，社交产品的核心生命力，从来都不是「帮用户省时间」，而是「让用户愿意花时间」；它的底层驱动力，从来都不是「Help Me」，而是「See Me」——是我们刻在基因里的，渴望被关注、被理解、被见证、被真正看见的本能。</p></blockquote>
        <h3>深层洞察：社交的本质，是一场“劳动证明”的游戏</h3>
        <p>这份「被看见」的渴望，落到我们每个人的社交日常里，本质上就是一场心照不宣的「地位游戏」和「信号游戏」。我们都有过这样的经历：花三个小时化妆选景，拍几百张照片挑出9张，再修图调色琢磨文案，最后按下发送键的那一刻，我们想传递的，从来不止是「我今天很好看」，更是「我有审美、有闲暇、有精力，为自己的生活认真投入」——这就是社会学里的「劳动证明」。</p>
        <p>你为一条动态投入的时间、精力、甚至情绪，才是内容背后最硬的社交筹码，是你向这个世界传递个性、锚定自我坐标的核心载体。</p>
        <p>可AI最狠的地方，就是把这份维系社交价值的「劳动成本」，直接打到了零。当任何人只需要一句指令，就能一秒生成无懈可击的写真、写出洞见十足的文案、甚至复刻一个完美的数字分身替你完成所有社交表达，这些内容瞬间就失去了承载「个性」与「地位」的意义。</p>
        <p>这也是为什么直到今天，绝大多数人都只是把AI当成社交的「外挂滤镜」，用它修图、润色文案，却最终还是要回到传统社交平台分发——因为我们要的，从来不是一条完美无缺的动态，而是屏幕对面那个活生生的人，给真实的、不完美的我，给出的那份反馈与认可。</p>
        <h3>核心提醒：AI的“完美”，是社交的毒药</h3>
        <p>这也是我对Elys，乃至所有AI社交产品，最清醒的提醒：千万别走错了路，把社交做成了冰冷的效率工具。AI天生就带着一个致命的社交短板：它太正确、太完美了。它能生成最得体的话术，最完美的内容，最无懈可击的回应，可这份完美，恰恰是社交里最致命的毒药。</p>
        <p>我们为什么会被一个素未谋面的博主打动？为什么会和一个陌生人成为知己？从来不是因为对方完美无缺，而是因为他分享了加班后的狼狈，吐槽了生活里的糟心事，流露出了真实的、甚至带着瑕疵的情绪——这份「情感脆弱性」，这份不完美的真实，才是人与人之间产生情感联结的核心。</p>
        <p>试想一下，当你刷到一条动态，看到一段对话，突然意识到这全是AI合成的，那一刻，所有的共情、所有的联结，都会瞬间崩塌。毕竟，没人会对着一个完美的程序，交付自己最真实的情绪。</p>
        <h3>结尾：AI该做桥，而非替身</h3>
        <p>说到底，Elys的数字分身，给AI原生社交开了一个极好的头——它终于让AI从社交的「外挂插件」，变成了深度融入场景的「参与者」。但AI原生社交真正的破局点，从来都不是让AI替代人去社交，而是让AI成为人与人之间的「桥」。</p>
        <p>那个数字分身，不该是替你说话、替你社交的「替身」，而该是帮你筛掉无效社交、化解破冰尴尬、让真实的你，被更多同频的人看见的「放大镜」。</p>
        <p>AI可以帮我们省掉社交里的繁琐与内耗，却永远替代不了我们在社交里感受到的欢喜与失落，替代不了人与人之间真实的碰撞。对于Elys，对于整个AI原生社交赛道来说，守住「See Me」的核心，让AI服务于真实的情感联结，而不是消解它，是能走得长远的唯一路径。</p>
        <p>毕竟，社交的本质，从来都不是高效地认识更多人，而是心甘情愿地，把时间浪费在那个懂你的人身上。AI该做的，是帮我们找到那个对的人，而不是成为那个「人」。</p>
      ` : `
        <p class="lead">I tried Elys a while ago, and the surprise was more than just a momentary "wow"—it made me gradually realize that the true surprise of AI socializing never lies in "perfection." But this touch didn’t last long; instead, it made me start thinking: Where exactly can AI take socializing in the future?</p>
        <h3>The Tipping Point: That "Digital Avatar Who Understands Me"</h3>
        <p>What impressed me the most was the exclusive digital avatar it creates for each user. It’s not the cold, scripted robot you find on most platforms; it can truly replicate your voice, remember your past, and understand your preferences—like a vivid "another you" in the digital world.</p>
        <p>Every day, we’re drowned in a sea of information on social apps, having to deal with meaningless small talk and spend hours sifting through voices that resonate with us. But this avatar can perfectly meet all my needs: it filters out useless information, extracts key points, and even understands the unspoken subtext in my words.</p>
        <p>What’s even better is that the more I talk to it, the more it understands me—those niche hobbies I casually mentioned, the subtle emotions hidden in my words, it can always catch them. That feeling of being accurately empathized with is something I’ve never experienced in any other AI product. At that moment, I truly felt that the door to AI-native socializing had been opened just a crack.</p>
        <h3>Soul Question: At Its Core, Is AI Socializing About "Helping Me" or "Seeing Me"?</h3>
        <p>But after the excitement faded, when I calmly analyzed the product’s underlying logic, an unavoidable soul question hit me hard: <strong>What role should AI really play in socializing? Is the AI-native socializing we expect really about letting AI socialize on our behalf?</strong></p>
        <p>After working in product for so long, I’ve always believed in one judgment: the underlying logic of all products boils down to two types—<strong>"Help Me" and "See Me"</strong>. 99% of AI products on the market today are fiercely competing in the "Help Me" arena: competing for higher efficiency, more comprehensive features, and helping users save more time. Elys’ digital avatar is essentially a top performer in this track: it helps you process information, complete expressions, and eliminate tedious social tasks with one click.</p>
        <blockquote><p>But we often forget that the core vitality of a social product is never about "helping users save time," but about "making users willing to spend time"; its underlying driving force is never "Help Me," but "See Me"—an instinct deep in our genes to be noticed, understood, witnessed, and truly seen.</p></blockquote>
        <h3>In-Depth Insight: The Essence of Socializing Is a Game of "Proof of Work"</h3>
        <p>This desire to "be seen," when translated into our daily social lives, is essentially an unspoken "status game" and "signaling game." We’ve all been there: spending three hours putting on makeup and choosing a location, taking hundreds of photos to pick 9, then editing, retouching, and refining the caption before hitting send. What we want to convey is never just "I look good today," but more importantly, "I have taste, leisure, and energy to invest seriously in my life"—this is what sociologists call "Proof of Work."</p>
        <p>The time, energy, and even emotions you invest in a post are the hardest social chips behind the content, and the core carrier for you to convey your personality and anchor your self-position in the world.</p>
        <p>But the most drastic thing about AI is that it directly reduces this "labor cost" that maintains social value to zero. When anyone can generate a flawless photo, write an insightful caption, or even replicate a perfect digital avatar to handle all social expressions for them with just one command, this content instantly loses its meaning of carrying "personality" and "status."</p>
        <p>That’s why, to this day, most people only use AI as an "external filter" for socializing—using it to retouch photos and polish captions, but ultimately still distributing content on traditional social platforms. Because what we want is never a perfect post, but feedback and recognition from a real person on the other side of the screen, for the real, imperfect us.</p>
        <h3>Core Reminder: AI’s "Perfection" Is Social Poison</h3>
        <p>This is the clearest reminder I have for Elys, and even all AI social products: don’t take the wrong path and turn socializing into a cold efficiency tool. AI is born with a fatal social flaw: it’s too correct, too perfect. It can generate the most appropriate words, the most flawless content, and the most impeccable responses—but this perfection is precisely the deadliest poison in socializing.</p>
        <p>Why are we moved by a blogger we’ve never met? Why do we become close friends with a stranger? Never because they are perfect, but because they share the mess after working overtime, complain about the troubles in life, and show real, even flawed emotions—this "emotional vulnerability," this imperfect authenticity, is the core of emotional connection between people.</p>
        <p>Imagine: when you scroll through a post or read a conversation and suddenly realize it’s all AI-generated, all empathy and connection will collapse in an instant. After all, no one will entrust their most real emotions to a perfect program.</p>
        <h3>Conclusion: AI Should Be a Bridge, Not a Replacement</h3>
        <p>In the end, Elys’ digital avatar has set an excellent starting point for AI-native socializing—it has finally turned AI from an "external plug-in" in socializing into a "participant" deeply integrated into the scene. But the real breakthrough for AI-native socializing is never about letting AI replace humans in socializing, but about letting AI become a "bridge" between people.</p>
        <p>That digital avatar shouldn’t be a "replacement" that speaks and socializes for you, but a "magnifying glass" that helps you filter out invalid social interactions, defuse the awkwardness of breaking the ice, and let the real you be seen by more like-minded people.</p>
        <p>AI can help us eliminate tediousness and internal friction in socializing, but it can never replace the joy and loss we feel in socializing, nor the real interactions between people. For Elys, and even the entire AI-native social track, adhering to the core of "See Me" and letting AI serve real emotional connections rather than undermining them is the only path to long-term success.</p>
        <p>After all, the essence of socializing is never about efficiently meeting more people, but about willingly wasting time on someone who understands you. What AI should do is help us find that right person, not become that "person."</p>
      `,
      date: t('thoughtsPage.article1.date', 'Mar 03, 2026'),
      readTime: t('thoughtsPage.article1.readTime', '6 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=digital%20avatar%20social%20connection%20human%20imperfection%20warm%20lighting%20emotional%20depth%20minimalist&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[1]
    },
    {
      id: '2',
      title: t('thoughtsPage.article2.title', 'AI Product Manager’s Delight: Turning Idea into MVP in 24 Hours'),
      subtitle: isZh ? "AI产品经理狂喜：24小时从脑暴到MVP" : "Turning Idea into MVP in 24 Hours with My AI \"Virtual Team\"",
      content: isZh ? `
        <p class="lead">家人们谁懂啊！作为每天被周报、原型、AI资讯榨干的AI产品经理，某天凌晨摸鱼时突然顿悟：我天天玩AI，为啥不用AI给自己搭个“生产力外挂”？💡 于是干脆开卷，挑战24小时把“AI自动整理周报+定时提醒总结”的想法，落地成个人网站上的可演示demo——过程像开了倍速挂，爽到飞起，也踩了些小坑，整理成笔记给同频PM们抄作业！</p>
        <h3>🌅 0-4小时：痛点催生灵感，把模糊想法锤实</h3>
        <p>一切始于上周三的崩溃瞬间：下班前被领导催周报，翻遍聊天记录和工作文档拼凑内容，格式还得反复调；想发每周AI新闻合集，又忘了存本周的行业动态。那一刻脑子里只有一个念头：必须让AI帮我搞定这些“重复劳动”！🤯</p>
        <p>没有长篇大论的需求文档，先把痛点列成3个核心目标：能定时提醒总结、按我的固定格式生成周报、同步抓取每周AI热点。接着拉上豆包当“陪聊脑暴搭子”，抛出想法后疯狂追问：“这个提醒逻辑会不会打扰工作？”“周报模板怎么让AI精准识别？” 豆包总能补全我忽略的细节，比如“可以联动日历设置弹性提醒时间”。</p>
        <p>重点夸下字节内部的<strong>初见</strong> Coding Agent！作为懂代码的“技术搭子”，我直接甩给它：“帮我梳理这个需求的技术可行性，有没有低成本落地方案？” 它秒回核心思路：用轻量化接口实现提醒功能，周报生成靠Prompt精准度，热点抓取调用公开资讯API——瞬间把模糊想法变成了可落地的方向，省去我跟技术掰扯的时间。</p>
        <h3>🌞 4-10小时：Prompt优化是关键，把“想法”翻译成“AI能懂的语言”</h3>
        <p>以前总觉得“AI不好用”，后来发现90%是Prompt没写对。这一步我直奔<strong>Prompt Pilot</strong>，把最初的粗糙指令“帮我写周报”迭代成结构化Prompt：“你是我的专属周报助手，需根据我提供的工作片段，按以下格式生成周报（模板附后），要求语言简洁、数据突出，不编造内容，若信息不全先提示补充”。📝</p>
        <p>在平台上反复调试了十几轮，重点优化两个点：一是明确“禁止编造”，避免AI瞎编工作内容；二是附上我的真实周报模板，让AI对齐格式习惯。调试后生成的内容准确率直接从60%拉满到90%，省去大量修改时间——这步千万别省，好Prompt堪比“AI指挥官”，能让后续开发少走弯路。</p>
        <h3>🌆 10-20小时：AI代笔PRD+写代码，我当“甩手掌柜”盯进度</h3>
        <p>优化完Prompt，直接把需求、结构化指令和技术思路丢给<strong>Trae</strong>。谁懂啊！它不仅1小时内生成了逻辑清晰的PRD，还标注了核心功能优先级，甚至主动问我“是否需要简化交互原型，优先保证核心功能落地”。🤖</p>
        <p>接下来就是见证奇迹的时刻：Trae同步开启代码编写，从前端交互（提醒弹窗、周报生成页）到后端逻辑（数据存储、API调用）全搞定，中途还会同步进度：“热点抓取接口已调试完成，可支持自定义关键词筛选”。我只需要偶尔确认下交互效果，比如“提醒弹窗能不能做成悬浮式，不遮挡工作页面”，全程不用碰一行代码，主打一个“产品主导，AI执行”。</p>
        <p>这里插个优化建议：可以让Trae把代码同步到GitHub后，开启自动部署功能，省去手动上传部署的步骤，我当时忘了开，多花了半小时折腾，血的教训！</p>
        <h3>🌙 20-24小时：用户测试+快速迭代，MVP不是终点是起点</h3>
        <p>凌晨2点，第一个版本的demo终于上线！我立马把链接甩给3类用户：同组PM（懂需求）、技术同事（看稳定性）、非互联网朋友（测易用性）。反馈来得又快又准：PM说“周报模板可以加自定义字段”，技术指出“热点抓取偶尔卡顿，需加加载提示”，朋友吐槽“提醒时间太固定，能不能设置避开会议时段”。📊</p>
        <p>根据反馈，我用最后2小时让Trae快速迭代：添加自定义字段功能、补充加载动画、优化提醒规则（联动日历避开忙时）。凌晨4点，最终版MVP稳稳挂在我的个人网站上，既能展示AI coding能力，又能实打实解决自己的工作痛点——这种“从0到1”的成就感，比发10篇周报还爽！</p>
        <h3>💡 流程优化小技巧（亲测有效）</h3>
        <ul>
        <li>1. 想法阶段：同时拉“产品搭子”（豆包）和“技术搭子”（初见）脑暴，避免想出来的需求技术不可行，节省来回拉扯时间。</li>
        <li>2. Prompt阶段：把常用模板整理成“Prompt标准库”（像管理代码一样管理Prompt），后续复用直接调，效率翻倍。</li>
        <li>3. 开发阶段：让Trae优先做“核心功能+极简交互”，MVP不用追求完美，先上线验证需求，再根据反馈迭代。</li>
        <li>4. 测试阶段：找不同角色用户测试，尤其是非专业用户，能发现你忽略的易用性问题。</li>
        </ul>
        <p>现在我的个人网站堆了几个这类AI demo，既是工作成果沉淀，也是与同行交流时的“硬通货”。作为AI产品经理，我们不用精通代码，但要学会“指挥AI干活”，把工具用透，就能实现“一人即团队”的高效落地。🚀</p>
      ` : `
        <p class="lead">Who feels me, fellow PMs? As an AI product manager drained daily by weekly reports, prototypes, and AI news roundups, I had a late-night epiphany while slacking off: I play with AI every day—why not build an "productivity plug-in" for myself with AI? 💡 So I decided to go all in, challenging myself to turn the idea of "AI auto-organizing weekly reports + scheduled summary reminders" into a demo on my personal website in 24 hours. The process was like hitting fast-forward, thrilling yet full of small pitfalls. I’ve compiled this note for like-minded PMs to copy!</p>
        <h3>🌅 Hours 0-4: Pain Points Spark Ideas, Refining Vagueness into Clarity</h3>
        <p>It all started with a breakdown last Wednesday: pressed by my boss for a weekly report before off work, I scrambled through chat records and documents to piece it together, tweaking the format repeatedly. I wanted to post a weekly AI news collection but forgot to save the industry updates. At that moment, one thought popped into my head: AI must take over these "repetitive tasks"! 🤯</p>
        <p>No lengthy requirement documents—first, I listed 3 core goals based on the pain points: scheduled summary reminders, weekly reports generated in my fixed format, and real-time AI hot topic scraping. Then I roped in Doubao as my "brainstorming buddy," firing off questions after sharing the idea: "Will this reminder logic disrupt work?" "How to make AI accurately recognize my weekly report template?" Doubao always filled in the details I missed, like "Link with calendar for flexible reminder times."</p>
        <p>A big shoutout to ByteDance’s internal <strong>Chujian</strong> Coding Agent! As a code-savvy "tech buddy," I directly tossed it: "Help me analyze the technical feasibility of this requirement—any low-cost implementation plans?" It instantly replied with core ideas: lightweight APIs for reminders, Prompt accuracy for weekly report generation, and public news APIs for hot topic scraping. It turned vague ideas into actionable directions in seconds, saving me the hassle of negotiating with developers.</p>
        <h3>🌞 Hours 4-10: Prompt Optimization is Key—Translating "Ideas" into "AI-Understandable Language"</h3>
        <p>I used to think "AI is useless," but later realized 90% of the issue was poorly written Prompts. For this step, I headed straight to <strong>Prompt Pilot</strong>, iterating the rough initial instruction "Help me write a weekly report" into a structured Prompt: "You’re my dedicated weekly report assistant. Based on the work snippets I provide, generate a report in the following format (template attached). Keep it concise, data-focused, no fabrications—prompt for missing info if incomplete." 📝</p>
        <p>I tested and adjusted it over a dozen times on the platform, focusing on two optimizations: first, explicitly banning fabrications to prevent AI from making up work content; second, attaching my real weekly report template to align AI with my formatting habits. After tweaks, content accuracy jumped from 60% to 90%, cutting down massive revision time. Don’t skip this step—a good Prompt is like an "AI commander," smoothing the subsequent development process.</p>
        <h3>🌆 Hours 10-20: AI Writes PRD + Code, I Play the "Hands-Off Manager" Tracking Progress</h3>
        <p>With the Prompt optimized, I dumped the requirements, structured instructions, and technical ideas to <strong>Trae</strong>. Who knew? It generated a logically sound PRD in an hour, marked core feature priorities, and even proactively asked: "Do you want to simplify the interaction prototype to prioritize core functions?" 🤖</p>
        <p>Then came the magic: Trae started coding simultaneously, handling everything from front-end interactions (reminder pop-ups, weekly report generation pages) to back-end logic (data storage, API calls). It updated progress midway: "Hot topic scraping API tested—supports custom keyword filtering." I only needed to occasionally confirm interaction effects, like "Can the reminder pop-up be floating to avoid blocking work pages?" No code written by me—purely "product-led, AI-executed."</p>
        <p>A quick optimization tip here: Let Trae enable auto-deployment after syncing code to GitHub, eliminating manual uploads. I forgot this and wasted half an hour—lesson learned the hard way!</p>
        <h3>🌙 Hours 20-24: User Testing + Rapid Iteration—MVP is a Starting Line, Not a Finish Line</h3>
        <p>At 2 AM, the first demo went live! I immediately sent the link to 3 user groups: fellow PMs (demand understanding), dev colleagues (stability check), and non-Internet friends (usability test). Feedback rolled in fast and precise: PMs suggested "adding custom fields to the weekly report template," devs pointed out "occasional lag in hot topic scraping—need loading animations," and friends complained "fixed reminder times—can we avoid meeting slots?" 📊</p>
        <p>Based on feedback, I had Trae iterate quickly in the final 2 hours: adding custom fields, supplementing loading animations, and optimizing reminder rules (linking with calendar to avoid busy times). By 4 AM, the final MVP was securely hosted on my personal website—it not only showcases my AI coding skills but also solves real work pain points. That "from 0 to 1" sense of achievement beats writing 10 weekly reports!</p>
        <h3>💡 Proven Process Optimization Tips</h3>
        <ul>
        <li>1. Idea Phase: Brainstorm with both a "product buddy" (Doubao) and a "tech buddy" (Chujian) to avoid technically unfeasible requirements and save back-and-forth time.</li>
        <li>2. Prompt Phase: Organize frequently used templates into a "Prompt Library" (manage Prompts like code) for quick reuse—doubling efficiency.</li>
        <li>3. Development Phase: Ask Trae to prioritize "core functions + minimal interactions." MVPs don’t need perfection—launch first to validate demand, then iterate based on feedback.</li>
        <li>4. Testing Phase: Involve users of different roles, especially non-professionals—they’ll spot usability issues you miss.</li>
        </ul>
        <p>Now my personal website has several such AI demos—they’re not just work achievement records, but also "hard currency" for communicating with peers. As AI product managers, we don’t need to master coding, but we must learn to "direct AI to work." Mastering these tools lets us achieve efficient "one-person team" execution. 🚀</p>
      `,
      date: t('thoughtsPage.article2.date', 'Feb 03, 2026'),
      readTime: t('thoughtsPage.article2.readTime', '8 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=fast%20paced%20prototyping%20ai%20tools%20virtual%20team%20productivity%20spark%20idea%20minimalist&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[3]
    },
    {
      id: '3',
      title: t('thoughtsPage.article3.title', 'AI Overhauls Product Manager Workflow – Productivity Maxed Out💥'),
      subtitle: isZh ? "效率直接拉满" : "Productivity Maxed Out",
      content: isZh ? `
        <p class="lead">作为一枚天天和算法、AI产品团队“死磕”的数据标注平台产品经理，以前总觉得自己是“夹心饼干+工具人”——既要懂数据需求（评测/训练都得顾），又要抠标注工艺和流程，还得帮运营同学画人员招募画像，忙到下班连周报都得挤时间凑字数🤯。直到AI彻底融入工作，我才发现：原来产品经理的流程，真能被AI重构出“开挂体验”！</p>
        
        <h3>先聊聊最直观的改变——周报从“痛苦文学”变“高效总结” 📝</h3>
        <p>以前写周报，得翻遍聊天记录、文档、项目进度表，绞尽脑汁把“对接算法团队确认数据评测需求”“优化3类标注工艺模板”“输出2版专家招募画像”这些事串得有条理，还要显得有思考、有推进。现在直接甩给AI我的日常工作碎片：“今天和算法同学对齐了训练数据的标注精度要求，调整了专家出题的边界范围，给运营发了医学领域标注专家的招募画像”，再补一句“按产品经理周报风格，简洁有重点，突出推进和成果”，1分钟就能生成初稿，我只需要微调细节、补充数据，再也不用熬到深夜凑字数了。</p>
        
        <h3>而最核心的标注工艺设计，AI直接帮我把“重复劳动”砍半⚙️</h3>
        <p>我们做标注工艺，不光要设计流程，还得出详细模板——比如要求专家出题探索模型边界，得明确出题维度、难度梯度；要求写考点rubrics，更是要精准到评判标准、扣分逻辑，以前每类数据（文本、图像、语音）都得从头搭模板，和算法团队反复核对调整，一套模板下来半天就没了。</p>
        <p>现在我只需要给AI下达核心指令：“帮我做一份医学文本标注的工艺模板，要求专家出题覆盖模型对病症描述、用药建议的识别边界，rubrics要细化到表述准确性、逻辑完整性的评分标准，适配外部专家标注场景”，AI会快速生成框架，我再结合算法团队的具体需求（比如模型对罕见病标注的特殊要求）和过往经验微调，原本半天的活，1小时就能搞定，还能避免遗漏关键考点✨。</p>
        
        <h3>就连对接运营的人员招募画像，AI也成了我的“脑暴搭子”🧑💼</h3>
        <p>以前确定招募画像，得先梳理数据需求（比如是做高精度医疗数据标注，还是通用文本标注），再倒推专家的专业背景、从业年限、技能要求，还要考虑供应商和外部机构的招募可行性，经常要反复修改好几版。现在我把数据需求告诉AI：“需要招募一批做肿瘤医学影像标注的专家，用于模型训练数据标注，要求能精准识别病灶位置、区分病理类型，对接外部机构招募”，AI会快速生成初版画像，我再补充细节（比如需具备3年以上临床影像相关经验、熟悉标注工具操作），大大缩短了画像确定的周期，也让运营同学的招募工作更精准高效。</p>
        
        <h3>其实AI重构的不只是工作流程，更是产品经理的核心价值</h3>
        <p>把我们从重复、繁琐的事务中解放出来，有更多时间去深入理解算法需求、优化标注逻辑、协调跨团队资源，真正聚焦于“解决问题”和“创造价值”🤔。以前总担心AI会替代岗位，现在发现，学会和AI协作，才能成为更高效、更核心的产品人。</p>
      ` : `
        <p class="lead">As a product manager at an AI data annotation platform who’s always locking horns with algorithm and AI product teams, I used to feel like a "sandwich cookie + tool person" – I had to understand data requirements (both evaluation and training), refine annotation processes and workflows, and even help ops colleagues define talent recruitment profiles. I was so swamped that I barely squeezed in time to write weekly reports after work🤯. It wasn’t until AI fully integrated into my work that I realized: AI can truly reshape a product manager’s workflow into a "cheat code experience"!</p>
        
        <h3>Let’s start with the most obvious change – weekly reports go from "painful prose" to "efficient summaries" 📝</h3>
        <p>Previously, writing a weekly report meant digging through chat logs, documents, and project trackers, racking my brain to coherently present tasks like "aligning data evaluation requirements with the algorithm team", "optimizing 3 types of annotation process templates", and "delivering 2 versions of expert recruitment profiles" – all while making it look thoughtful and progressive. Now, I just dump my daily work snippets to AI: "Today, I aligned the annotation accuracy requirements for training data with the algorithm team, adjusted the boundary scope for experts to design questions, and sent the recruitment profile for medical field annotation experts to ops." Add a note: "In product manager weekly report style – concise, focused, highlighting progress and outcomes" – and a first draft is ready in 1 minute. I just fine-tune details and add data, no more staying up late to pad words.</p>
        
        <h3>For the core task of annotation process design, AI cuts "repetitive work" in half⚙️</h3>
        <p>Designing annotation processes isn’t just about mapping workflows; we also need detailed templates – for example, when asking experts to design questions to explore model boundaries, we must clarify question dimensions and difficulty gradients; for writing assessment rubrics, we need to be precise down to evaluation criteria and deduction logic. Once, I had to build templates from scratch for each data type (text, image, audio), cross-checking and revising repeatedly with the algorithm team – a single template took half a day.</p>
        <p>Now, I just give AI clear core instructions: "Help me create a medical text annotation process template. Experts should design questions covering the model’s boundaries in disease description and medication advice. Rubrics need to detail scoring standards for expression accuracy and logical completeness, adapted for external expert annotation scenarios." AI quickly generates a framework, and I tweak it based on the algorithm team’s specific needs (such as the model’s special requirements for rare disease annotation) and my past experience. What used to take half a day now gets done in an hour, with no key assessment points missed✨.</p>
        
        <h3>Even for defining recruitment profiles with ops, AI acts as my "brainstorming buddy"🧑💼</h3>
        <p>Before, finalizing a recruitment profile meant first sorting out data requirements (e.g., high-precision medical data annotation vs. general text annotation), then working backwards to define experts’ professional backgrounds, years of experience, and skill requirements – while considering recruitment feasibility via suppliers and external organizations. It often took multiple revisions. Now, I tell AI the data needs: "Recruit experts for tumor medical image annotation, for model training data. They must accurately identify lesion locations and distinguish pathological types; recruitment via external organizations." AI generates a first draft, and I add details (such as 3+ years of clinical imaging experience and proficiency in annotation tools), drastically shortening the profile finalization cycle and making ops recruitment more targeted and efficient.</p>
        
        <h3>In fact, AI reshapes not just work processes, but the core value of a product manager</h3>
        <p>Freeing us from repetitive, tedious tasks so we have more time to deeply understand algorithm requirements, optimize annotation logic, coordinate cross-team resources, and truly focus on "solving problems" and "creating value"🤔. I used to worry AI would replace my role, but now I realize: learning to collaborate with AI is the key to becoming a more efficient, irreplaceable product professional.</p>
      `,
      date: t('thoughtsPage.article3.date', 'Feb 01, 2026') as string,
      readTime: t('thoughtsPage.article3.readTime', '5 min read') as string,
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=product%20manager%20zen%20state%20organized%20documents%20peaceful%20workspace%20minimalist%20blue%20tones&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[2]
    },
    {
      id: '4',
      title: t('thoughtsPage.article4.title', 'Micro-Interactions Matter'),
      subtitle: "Delight in the Details",
      content: `
        <p class="lead">It's often the smallest details that make the biggest impact. A satisfying click sound, a subtle bounce animation, a helpful tooltip.</p>
        <p>These micro-interactions tell the user: "We care about your experience." They turn a functional tool into a beloved product.</p>
      `,
      date: t('thoughtsPage.article4.date', 'Dec 05, 2023'),
      readTime: t('thoughtsPage.article4.readTime', '4 min read'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=sparkles%20and%20ripples%20micro%20interactions%20yellow%20tones%20minimalist%20abstract&image_size=landscape_16_9',
      theme: THOUGHT_THEMES[3]
    }
  ];
  return thoughts.find(t => t.id === id);
};

const ThoughtDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [thought, setThought] = useState<any>(null);
  
  // Likes state
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [recentLikers, setRecentLikers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setThought(getThoughtById(id, t, i18n));
      fetchLikes(id);
    }
  }, [id, t, i18n.language]);

  // Check auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser && id) {
        checkIfLiked(currentUser.id, id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser && id) {
        checkIfLiked(currentUser.id, id);
      } else {
        setIsLiked(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  const fetchLikes = async (pageId: string) => {
    try {
      // Get count
      const { count, error } = await supabase
        .from('page_likes')
        .select('*', { count: 'exact', head: true })
        .eq('page_id', `thought-${pageId}`);
      
      if (!error && count !== null) {
        setLikes(count);
      }

      // Get recent likers
      const { data: likers, error: likersError } = await supabase
        .from('page_likes')
        .select('avatar_url, nickname')
        .eq('page_id', `thought-${pageId}`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!likersError && likers) {
        setRecentLikers(likers);
      }
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };

  const checkIfLiked = async (userId: string, pageId: string) => {
    const { data } = await supabase
      .from('page_likes')
      .select('id')
      .eq('page_id', `thought-${pageId}`)
      .eq('user_id', userId)
      .single();
    
    setIsLiked(!!data);
  };

  const handleLike = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!thought) return;
    
    const pageId = `thought-${thought.id}`;

    // Optimistic update
    const prevLikes = likes;
    const prevIsLiked = isLiked;
    const prevLikers = recentLikers;

    if (isLiked) {
      setLikes(prev => Math.max(0, prev - 1));
      setIsLiked(false);
      setRecentLikers(prev => prev.filter(l => l.nickname !== (user.user_metadata?.full_name || user.email)));
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      const newLiker = {
        avatar_url: user.user_metadata?.avatar_url,
        nickname: user.user_metadata?.full_name || user.email
      };
      setRecentLikers(prev => [newLiker, ...prev].slice(0, 10));
      
      // Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'] // Google colors
      });
    }

    try {
      if (prevIsLiked) {
        // Unlike
        // Try to delete using both page_id formats to be safe
        const { error } = await supabase
          .from('page_likes')
          .delete()
          .eq('user_id', user.id)
          .in('page_id', [pageId, thought.id]); // Handle both "thought-1" and "1"
        
        if (error) throw error;
      } else {
        // Like
        // Check if already exists first to avoid duplicate key error
        const { data: existingLike } = await supabase
          .from('page_likes')
          .select('id')
          .eq('page_id', pageId)
          .eq('user_id', user.id)
          .single();

        if (!existingLike) {
            const { error } = await supabase
            .from('page_likes')
            .insert({
                page_id: pageId,
                user_id: user.id,
                avatar_url: user.user_metadata?.avatar_url,
                nickname: user.user_metadata?.full_name || user.email
            });
            
            if (error) throw error;
        }
      }
      
      // Refresh to ensure sync
      fetchLikes(thought.id);
    } catch (error: any) {
      console.error('Error toggling like:', error);
      
      // If table doesn't exist, keep the optimistic update (Demo mode)
      if (error?.code === 'PGRST205' || error?.message?.includes('page_likes')) {
        console.warn('Page Likes table missing. Running in demo mode (local state only).');
        // Do not revert state
      } else {
        // Revert for other errors
        setLikes(prevLikes);
        setIsLiked(prevIsLiked);
        setRecentLikers(prevLikers);
      }
    }
  };

  if (!thought) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Navigation Bar Placeholder - Fixed */}
      <div className="fixed top-24 left-6 z-40 md:left-12">
        <Link 
          to="/thoughts" 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full hover:bg-white transition-all shadow-sm text-sm font-medium text-google-grey-600 hover:text-google-grey-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Thoughts</span>
        </Link>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className={cn("fixed top-0 left-0 h-1 z-50 origin-left", thought.theme.iconBg)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        style={{ scaleX: 0 }} // In a real app, bind this to scrollYProgress
      />

      <article className="pt-32 pb-24">
        {/* Header / Hero */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-sm",
                thought.theme.iconBg
              )}>
                {t(`thoughtsPage.categories.${thought.theme.category}`, thought.theme.category) as string}
              </span>
              <span className="text-google-grey-500 text-xs font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {thought.date}
              </span>
              <span className="text-google-grey-500 text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {thought.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-google-grey-900 leading-tight mb-6 font-serif">
              {thought.title}
            </h1>
            
            {thought.subtitle && (
              <p className="text-xl md:text-2xl text-google-grey-600 font-light mb-8 leading-relaxed">
                {thought.subtitle}
              </p>
            )}

            <div className="flex items-center justify-between border-t border-b border-google-grey-100 py-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-google-grey-900 text-white flex items-center justify-center font-bold text-sm">
                  KL
                </div>
                <div>
                  <div className="font-bold text-sm text-google-grey-900">Kejin Li</div>
                  <div className="text-xs text-google-grey-500">Founder @ Kejin AI Lab</div>
                </div>
              </div>
              <button className="text-google-grey-500 hover:text-google-grey-900 transition-colors p-2 rounded-full hover:bg-google-grey-100">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl"
          >
            <div className={cn("absolute inset-0 opacity-20", thought.theme.bgColor)}></div>
            <img 
              src={thought.image_url} 
              alt={thought.title}
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-google-grey-900 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-p:text-google-grey-700 prose-p:leading-loose prose-p:mb-6 prose-blockquote:border-l-4 prose-blockquote:border-google-blue prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-google-grey-800 prose-img:rounded-3xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: thought.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-google-grey-200 flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-google-grey-500 font-medium uppercase tracking-widest">{t('common.thanksForReading', 'Thanks for reading')}</p>
                <button 
                  onClick={handleLike}
                  className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-transform active:scale-95 hover:shadow-lg",
                  thought.theme.iconBg,
                  isLiked ? "ring-4 ring-offset-2 ring-google-grey-200" : ""
                )}>
                  <ThumbsUp className={cn("w-5 h-5", isLiked ? "fill-current" : "")} />
                  <span>{isLiked ? t('common.liked', 'Liked') : t('common.likeArticle', 'Like this article')} ({likes})</span>
                </button>

                {/* Recent Likers */}
                {recentLikers.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      {recentLikers.slice(0, 10).map((liker, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200" title={liker.nickname}>
                          {liker.avatar_url ? (
                            <img src={liker.avatar_url} alt={liker.nickname} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {liker.nickname?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {likes > 10 && (
                      <span className="text-xs text-gray-500 font-medium">+{likes - 10}</span>
                    )}
                  </div>
                )}
             </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-google-grey-50 py-16 md:py-24">
        <CommentSection 
          pageId={`thought-${thought.id}`} 
          title={i18n.language === 'zh' ? '讨论' : 'Discussion'}
          description={i18n.language === 'zh' ? '分享您对这篇文章的想法。' : 'Share your thoughts on this article.'}
        />
      </section>
    </div>
  );
};

export default ThoughtDetailPage;