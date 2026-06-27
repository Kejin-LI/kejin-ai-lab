import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from '../components/CommentSection';

// Content from MD files (English)
const CONTENT_TRACING_JOURNEY = `
# Let’s Get Real: What Exactly Is This APP? (AI Native for Newbies)

Folks, don’t be intimidated by "AI Native"! It’s not a "fake AI" that slaps an AI label on an old APP, but a total game-changer designed with AI as its backbone—like water and electricity—from day one, focusing on "AI+" native design!

To put it simply: Traditional guides are "tools first, AI added later," like putting a smart input method on a feature phone; ours is "AI first, tools built around it," equivalent to a fully-equipped smartphone that knows how you want to visit museums better than you do. The difference is like "manual bathing" vs. "full-service SPA"—you get the vibe～

# Truth Bomb: Have You Faced These Museum Nightmares Too?

Whether you’re a student, a office worker, or a museum enthusiast, these pain points hit close to home—check if you can relate:

❌ Newbie Pain: Staring blankly at artifacts, guides droning on like a monk chanting scriptures, jargon you can’t understand with no way to ask follow-ups. After visiting, you only remember "it’s old" and "it looks good in photos"—basically just wandering aimlessly;

❌ Office Worker Pain: Scraping together time for a visit, only to be slowed down by long, rambling guides. You want to skip to the highlights or dive deeper, but can’t—afterward, you forget everything, and all that time goes down the drain;

❌ Middle-Aged & Elderly Pain: Guide devices are hard to operate, exhibit descriptions are too small to read, no one to explain things, and visiting alone is so boring you could scratch the walls;

❌ Overseas Visitor Pain: Visiting museums abroad with language barriers—guides only have foreign languages, so you’re left feeling like an outsider the whole time, basically just tagging along;

❌ Trendsetter Pain: Taking photos at museums is just crowds everywhere, bad compositions that can’t be posted online, and your album is full of tourist traps—awkward enough to dig a three-bedroom apartment!

# Life-Saver: This APP’s Core Features Take Museum Visits to the Next Level!

Don’t panic! This APP solves every pain point perfectly—everyone loves it once they try it:

✅ Smart Guide: No more droning pre-recorded audio! Scan an artifact, and AI kicks in instantly—versions for newbies, enthusiasts, and the middle-aged & elderly, with dialect support. Ask follow-ups if you don’t understand; it’s more patient than your personal guide;

✅ Efficient Routes: A lifesaver for office workers and students! Enter your time and needs, and AI generates the best route—avoid crowds, focus on highlights, and visit efficiently without wasting a minute;

✅ Viral-Worthy Photos: A must-have for trendsetters! AI predicts compositions and avoids crowds to take perfect shots in one click. It can even turn artifacts into trendy styles (like cyberpunk or cartoons) for Instagram-worthy posts;

✅ Global Compatibility: Worry-free for overseas visitors! AI real-time translation lets you understand guides worldwide in your native language, breaking language barriers—visit museums around the globe with ease;

✅ Friendly Companion: Perfect for the middle-aged, elderly, and introverts! Voice-controlled, responsive in seconds, and a virtual companion chats with you the whole time—entertaining and informative;

✅ Exclusive Memories: No more meaningless check-ins! After your visit, it generates digital collectibles and knowledge graphs to record your journey—more meaningful than photos, and you can show them off like badges～

# Final Word: No Matter Who You Are, This Is All You Need for Museums!

Simply put, this is a museum essential "born from AI, built for AI"—no gimmicks, no lazy AI add-ons, just a solution to all your museum headaches!

Whether you’re a newbie or an enthusiast, at home or abroad, with this APP, museum visits are hassle-free, embarrassment-free, and time-efficient!

Don’t hesitate! Click to download, unlock a new way to visit museums, say goodbye to aimless wandering, and let AI take you on a fun, insightful tour of museums around the world ✨
`;

const CONTENT_PM_CHEST = `
### 💢 PM Daily Life: On the Verge of a Breakdown Every Day

Who gets it, guys! A product manager’s daily life is literally an endless cycle of constant overthinking and back-and-forth 🤯 Stuck between business, R&D, and design teams every day, we have to meet all the business team’s requirement ideas, accommodate the R&D team’s technical feasibility, and match the design team’s visual aesthetics. It’s all about "pleasing both sides and getting wronged in the middle" — by the end of the day, my brain is buzzing and my energy is completely drained!

### 🤯 4 Core Pain Points of PMs: Each One Can Drive You Crazy

First, let’s talk about the most frustrating part: sorting out requirements. It’s just like opening a blind box — you never know where the next vague requirement will come from! The business team usually just drops a sentence like "I want something useful" without specifying the actual use case or core functions, leaving you to guess. Meanwhile, the R&D team is super rigorous, pestering you for clear function specifications and logical boundaries: "What exactly do you want?" "What are the trigger conditions?" I’m stuck in the middle as a two-way translator, refining requirements with the business team and explaining logic to the R&D team. My head is about to explode, and I’m losing clumps of hair one after another～

Next up is writing PRDs — it’s like going through a trial! The logic has to be flawless, the format has to meet all team standards, and the details have to cover every interaction scenario. After staying up late and revising it several times, your work gets sent back in a heartbeat: "The logic isn’t structured enough" "The interaction details aren’t clear" "The data indicators are ambiguous" 😭 Every revision means re-organizing your thoughts all over again. I’m so done — sometimes I feel like I’m not a product manager, but a tool for revising documents repeatedly!

Prototyping isn’t any better — it forces PMs to unlock a hidden skill: becoming a "soul artist"! Dragging components and adjusting layouts one by one in the prototyping tool until your fingers ache and your eyes go blurry. You revise versions so many times that you can’t remember which one is the final draft, and sometimes you even forget your original design ideas halfway. What’s more frustrating? After slaving away on a full set of prototypes, you show them to the R&D team, and they frown and say "I don’t understand this interaction logic" or "This layout isn’t feasible". Suddenly, all your hard work feels like it’s gone down the drain — total waste of time～

The worst part is the requirement review meeting, which is basically a PM’s public "social death" moment! Demonstrating interactions relies entirely on talking and gesturing. You point at the prototype and explain repeatedly: "Click here to pop up this box, which should show these buttons — clicking a button will jump to the details page" "Swipe to switch to that page, and it should keep the filter conditions from the previous page". You talk until your mouth is dry and you’re spitting, but the people listening just look confused, nodding frequently but not really getting the interaction logic. The review efficiency is ridiculously low, and you end up revising and adjusting repeatedly～

### ✨ My Designed PM Tool! Recommended to All Fellow PMs

As a PM who’s tortured by these pain points every day, I simply designed a Skill myself — PM Chest (Product Manager’s Treasure Chest) ✨ It’s specifically made to solve our core PM troubles. Now I’m recommending it to all fellow PMs — no more stress from requirements, PRDs, or prototypes. Finally, we can break free from useless overthinking!

### ✅ Core Advantages of the Treasure Chest: Help You Work Effortlessly Step by Step

Since I’ve been through the struggle, I want to help my fellow PMs out～ This Skill truly understands PMs’ pain! No need to rack your brain or mess around — it helps you tackle everything from requirement sorting to UI prototyping step by step. There’s a clear progress bar at every stage, telling you which steps are done, which one you’re currently on, and which ones are pending. You can move forward calmly, no more rushing around～ Everyone can click the "Online Demo" button above to try it directly!

✅ Requirement Clarification: No matter how vague or scattered your requirements are, it helps you sort out the details and logic bit by bit. What’s super thoughtful? It only asks one key question at a time — no bombarding you with multiple questions that make your head spin. You can even choose "Decide for me directly" — total win for lazy people! No more wasting brainpower on trivial details!

✅ Structured PRDs: No need to build templates or organize logic yourself. It generates a complete PRD with industry-standard templates in one click, including all core content like business processes and interaction tables. The details are top-notch — you just need to review and confirm. Once confirmed, it directly provides a copyable Markdown file — copy and paste, and you’re good to go. Save tons of formatting time～

✅ Interactive UI: No need to beg designers for mockups. Choose your favorite style (Minimalist, Business, Tech — all available to match different product tones), and it will generate 3 different visual previews for you to choose from. After selecting, you can adjust the details, and finally generate a fully interactive prototype that you can demonstrate directly. Both beauty and practicality are on point!

### 💥 Review Game-Changer: No More Talking & Gesturing

For requirement reviews, just share the prototype link! No more talking and gesturing — R&D can open the link and directly see all interaction logic and page layouts. No more repeated explanations — R&D will praise how clear it is, and review efficiency will double. No more delays due to poor communication～

### 💅 A Must-Try for PMs! Say Goodbye to Useless Overthinking

Fellow PMs, this is a total game-changer! Whether you’re a new PM just starting out or a senior PM swamped with requirements every day, the treasure chest I designed can help you say goodbye to useless overthinking. Stop wasting energy on trivial matters — spend more time on actually building products and polishing core experiences. Balance work and leisure effortlessly～ Hurry up and click the "Online Demo" button above to try it. If it’s not useful, you can come find me 💅
`;

const CONTENT_TRACING_JOURNEY_ZH = `
# 先唠实嗑：这APP到底是个啥？（AI Native 小白友好版）

家人们，别被“AI Native”这四个字唬住！说白了，它不是那种“旧瓶装新酒”、在老APP上贴个AI标签的“伪智能”，更不是赶时髦的“外挂补丁”——而是从出生那天起，就把AI当“水电煤”的狠角色！

举个最通俗的例子：传统导览APP是“先有逛展工具，再勉强加个AI”，就像给老年机装个智能输入法，别扭又不好用；而我们这个AI Native 文博导览APP，是“先有AI，再做逛展工具”，相当于直接给你一部满配智能手机，从头到脚都透着“聪明劲儿”，不用你瞎琢磨，它比你还懂你想怎么逛展！简单说，别人是“+AI”，我们是“AI+”，差别大到像“手动搓澡”和“全自动SPA”，懂的都懂～

# 扎心暴击：逛展的那些破事儿，你是不是也中枪了？

不管你是16岁的学生党、30岁的打工人，还是50岁的逛展达人，逛博物馆的痛点，简直能凑成一本《人类逛展尴尬实录》，快来对号入座：

❌ 小白痛点：面对文物一脸懵，讲解器念得比念经还催眠，术语听不懂还没法追问，逛完只记得“这东西挺老”“拍照挺好看”，问啥都答不上来，主打一个“走马观花凑数”；

❌ 打工人痛点：挤破头抽半天时间逛展，被冗长讲解拖慢节奏，想快速看重点却被迫听废话，想深入了解又找不到资料，逛完转头就忘，感觉时间全白费，还不如在家刷手机；

❌ 中老年痛点：讲解器按钮多到眼花，怎么调都不会用；说明文字太小看不清，想听个明白却没人讲；一个人逛展孤单到抠墙，想找个伴讨论文物都难；

❌ 出国党痛点：好不容易出国看个展，讲解器只有英文或本地语，全程像个局外人，看着别人听得津津有味，自己只能瞎逛，主打一个“陪跑式看展”；

❌ 潮人痛点：逛展拍照全是人从众，构图丑到没法发圈，想整个有特色的打卡图，翻遍相册全是“游客照”，尴尬到抠出三室一厅！

# 救命神器：这APP的核心功能，直接把逛展体验拉满！

别慌！AI Native 文博导览APP，就是来给你“对症下药”的，每一个功能都踩在痛点上，幽默又好用，谁用谁夸：

✅ 智能讲解：拒绝“念经式”预制音频！扫一眼文物，AI立马上线，小白版讲八卦、达人版讲深度、中老年版讲通俗，方言也能安排，听不懂就追问，它比你的专属讲解员还耐心，再也不用硬扛晦涩术语；

✅ 高效路线：打工人/学生党福音！输入“只有1小时”“只想看镇馆之宝”，AI立马生成最优路线，避开人流高峰，不浪费你每分钟，主打一个“精准逛展，高效涨知识”；

✅ 拍照封神：潮人必冲！AI实时预判构图、自动避开人群，一键拍出博物馆氛围感大片，看完还能让AI把文物改成赛博朋克、卡通画风，发圈直接封神，再也不用羡慕别人的打卡图；

✅ 全球通吃：出国党再也不用慌！AI实时同传，不管你在哪个国家，用母语就能听懂所有讲解，打破语言壁垒，逛遍全球博物馆都不费劲；

✅ 贴心陪伴：中老年友好+社恐友好！全程语音操控，不用点复杂按钮，“讲解这件文物”“找休息区”，AI一呼即应；一个人逛展不孤单，虚拟陪逛搭子全程陪聊，解闷又解惑；

✅ 专属纪念：拒绝无效打卡！逛完自动生成专属数字藏品、知识图谱，记录你的逛展足迹，比单纯拍照有意义多了，还能当成“逛展勋章”炫耀～

# 总结唠句：不管你是谁，逛展有它就够了！

说白了，这就是一个“生于AI、长于AI”的逛展神器，不搞花里胡哨的噱头，不做敷衍了事的外挂，每一个功能都只为解决你逛展的糟心事！

不管你是文博小白还是资深爱好者，不管你是学生党、打工人还是中老年逛展达人，不管你在国内还是国外，有了它，逛展再也不用犯难、不用尴尬、不用浪费时间！

别犹豫了！现在点击demo，点亮star，解锁逛展新姿势，告别走马观花、告别尴尬懵懂，让AI带你轻松逛遍全球博物馆，把枯燥逛展变成一件有趣、有料、有面子的事儿✨
`;

const CONTENT_PM_CHEST_ZH = `
### 💢 PM日常：每天都在崩溃边缘反复横跳

谁懂啊家人们！产品经理的日常真的就是疯狂内耗+反复横跳的无限循环🤯 每天夹在业务、研发、设计三大阵营中间，既要满足业务方的各种需求设想，又要迁就研发的技术实现难度，还要配合设计的视觉审美，主打一个“两边都得哄，中间受委屈”，一天下来脑子嗡嗡的，精力直接被榨干！

### 🤯 PM四大核心痛点：每一个都能逼疯人

先说说最磨人的需求梳理，简直像拆盲盒，永远不知道下一个模糊需求会从哪冒出来！业务那边往往只甩一句“要个好用的”，既不说具体应用场景，也不明确核心功能，全靠你猜；而研发这边又极其严谨，追着你要明确的功能规格、逻辑边界，问“具体要啥功能”“触发条件是什么”，我夹在中间当双向翻译，一边帮业务提炼需求，一边跟研发解释逻辑，脑壳都要抠破，头发都掉了一把又一把～

紧接着是写PRD，更是渡劫级别的难度！逻辑要顺到没有一丝漏洞，格式要标准到符合团队所有规范，细节要全到覆盖每一个交互场景，熬了大半夜、改了好几版写出来的内容，分分钟被打回重写：“逻辑不够结构化”“交互细节没说清”“数据指标不明确”😭 每次返工都要重新梳理一遍思路，真的会谢，感觉自己不是产品经理，是反复修改文档的工具人！

画原型也没好到哪去，直接逼出PM的隐藏技能——灵魂画手上线！对着原型工具一个个拖组件、调布局，拖到手指发酸、眼睛发花，改版本改到记不清哪版是最终版，有时候改着改着就忘了最初的设计思路。更崩溃的是，辛辛苦苦画完一整套原型，拿给研发看，对方却皱着眉说“看不懂这个交互逻辑”“这个布局实现不了”，瞬间感觉所有付出都打了水漂，白忙活一场～

最绝的还是需求评审环节，堪称PM的大型“社死现场”！演示交互全靠嘴说+手比划，一边指着原型图，一边反复解释：“点这里弹这个框，弹框里要显示这几个按钮，点击按钮后跳转至详情页”“滑一下跳那个页，跳转后要保留上一页的筛选条件”，我说得口干舌燥、唾沫横飞，听的人却一脸懵圈，频频点头却没真正get到交互逻辑，评审效率低到离谱，还得反复返工调整～

### ✨ 我设计的PM神器！推荐给所有同行

作为每天被这些痛点折磨的PM，我干脆自己设计了一个Skill——PM Chest（产品经理百宝箱）✨ 专门解决咱们PM的核心烦恼，现在推荐给所有同行，再也不用被需求、PRD、原型这些事情逼疯，终于能从无效内耗里解脱出来了！

### ✅ 百宝箱核心优势：一步步帮你躺平

因为自己淋过雨，所以想给同行撑把伞～ 这个Skill完全懂PM的痛！不用自己瞎琢磨、瞎折腾，一步步帮你搞定从需求梳理到UI原型的所有麻烦，全程都有清晰的进度条提示，告诉你已完成、正在做和即将做的步骤，让你不慌不忙推进，再也不用手忙脚乱～ 大家可以点击上方的“在线演示”按钮，直接体验使用！

✅ 需求澄清：不管你说的需求多模糊、多零散，它都能帮你一点点抠细节、理逻辑，而且特别贴心的是，一次只问一个关键问题，不会一次性抛一堆问题让你头大，还能直接选“直接帮我决定”，懒人直接狂喜，再也不用费脑纠结细节！

✅ 结构化PRD：不用再自己搭建模板、梳理逻辑，它会按行业标准模板一键生成完整PRD，包含业务流程、交互表格等所有核心内容，细节拉满，你只需要审阅确认，确认无误后直接给可复制的markdown文件，复制粘贴就能用，省去大量排版时间～

✅ 可交互UI：不用再求着设计出图，自己选好喜欢的风格（极简风、商务风、科技风全都有，满足不同产品调性），它会直接出3种不同的视觉方案预览图让你挑，选好后还能调整细节，最后生成能直接演示的可交互原型，颜值和实用性双在线！

### 💥 评审神器：再也不用嘴说手比划

需求评审直接甩原型链接就够了！再也不用嘴说手比划，研发打开链接就能直观看到所有交互逻辑、页面布局，不用再反复解释，研发看了都夸清晰，评审效率直接翻倍，再也不用因为沟通不畅耽误进度～

### 💅 PM必冲！告别无效内耗

PM们真的谁用谁香！不管是刚入门的新手PM，还是每天被需求缠身的资深PM，我设计的这个百宝箱都能帮你告别无效内耗，不用再被琐事消耗精力，把更多时间花在真正做产品、打磨核心体验上，摸鱼和高效工作两不耽误～ 赶紧点击上方“在线演示”试试，不好用你找我💅
`;

const CONTENT_ANNOTATION = `
# Platform Positioning and Core Value

This platform demo is built based on AI coding technology, serving as a precise supply-demand matching tool focusing on the AI data training field. Its core value lies in establishing an efficient connection bridge between AI data training/evaluation demanders and top annotation experts in various fields. It accurately addresses the core pain points of algorithm teams and AI product teams in the data processing process, such as "scarcity of high-quality experts and inefficient supply-demand connection", while providing high-educated experts in various fields with flexible and controllable task undertaking channels and compliant and transparent reward acquisition paths.

The platform focuses on highly specialized fields including finance, law, healthcare, physics, and mathematics. The recruitment targets are mainly undergraduate, master's, and doctoral graduates from world-renowned universities, ensuring that each annotation expert possesses solid academic foundation and professional literacy. They can accurately tackle high-difficulty and high-precision data training and evaluation tasks, providing highly reliable and accurate data support for the iteration and optimization of AI models.

# Core Functional Framework

With the core design concept of "two-way empowerment for supply and demand", the demo version constructs two core modules: demand submission and connection for demanders, and expert recruitment and task undertaking for suppliers. AI tools are embedded in key links to improve quality and efficiency, forming a complete business closed loop of "demand sorting - expert screening - task connection - reward settlement" (Note: The demo phase only realizes the demonstration of core processes, and the reward settlement module is reserved for subsequent iteration and implementation).

# Operation Processes for Supply and Demand Sides

## Operation Process for Demanders

Demanders mainly include algorithm teams and AI product teams with data training and evaluation needs. The platform provides standardized demand submission portals and form templates to guide demanders in clearly conveying their needs, ensuring the accuracy and efficiency of supply-demand connection.

1. **Demand Sorting and Submission**: Demanders need to clarify core requirements in advance, including key information such as data type, training/evaluation objectives, task cycle, and quality acceptance standards. Meanwhile, they should sort out a clear talent profile, specifying rigid requirements such as the expert's field, educational background, and core skills, and complete information submission through the platform's standardized demand submission portal.

2. **Supply-Demand Matching and Connection**: After receiving the demand, the platform quickly screens suitable candidates from the expert database through AI algorithms based on demand keywords and talent profiles, generating a precise matching list for demanders to review. Demanders can select preferred candidates by referring to experts' resumes and qualification certification reports, and confirm task details and reach cooperation intentions through the platform's built-in communication channel.

3. **Task Monitoring and Acceptance**: After the task starts, demanders can real-time view the task progress and synchronize experts' work dynamics through the platform, realizing full-process visual management and control. After the task is completed, demanders submit acceptance opinions through the platform to confirm whether the data quality meets the standards, completing the closed-loop management.

## Operation Process for Suppliers

Suppliers are top professionals in various fields. The platform establishes a "multi-level, high-threshold" access mechanism to ensure the compliance of experts' qualifications and the qualification of professional capabilities from the source. It also provides a flexible and independent task undertaking mode, balancing experts' schedule and income needs.

1. **Registration and Document Submission**: Experts complete account registration through the platform's registration portal, upload personal resumes as required (core information such as educational background, professional field, research direction, and relevant project experience must be specified), and simultaneously submit supporting materials such as academic certificates and professional qualification certifications to complete basic information entry and document filing.

2. **AI Interview and Written Test Assessment**: The platform conducts automated preliminary review on the documents submitted by experts. After passing the preliminary review, experts need to participate in AI online interviews and professional written tests organized by the platform. AI interviews focus on professional cognition, practical operation capabilities, and problem-solving abilities, while written tests focus on core knowledge in the field, data annotation skills, and accuracy control. The dual assessment system ensures that experts' capabilities are highly compatible with task requirements.

3. **Qualification Certification and Settlement**: After passing the assessment, the platform completes official qualification certification for experts and includes them in the platform's core expert database. Experts simultaneously unlock task undertaking permissions and can independently browse various data training and evaluation tasks released on the platform.

4. **Task Undertaking and Reward Acquisition**: Experts can independently apply for suitable tasks based on their professional fields and schedule, and start work after confirming cooperation details with demanders. After the task is completed and accepted, corresponding rewards can be obtained through the reserved reward settlement channel on the platform (the demo phase only demonstrates the process link, and specific settlement rules and payment methods will be iterated and optimized in subsequent versions).

# Core Highlights of the Demo

1. **AI-Driven Precise Matching**: Relying on AI algorithms to realize rapid portrait comparison and candidate screening between supply and demand sides, breaking the information barrier of traditional recruitment models, greatly shortening the connection cycle, multiplying the efficiency of supply-demand matching, and reducing the time cost for both parties.

2. **High-Threshold Qualification Control**: Constructing a three-layer access barrier of "document review + AI interview + professional written test", focusing on high-educated talents from world-renowned universities, strictly controlling expert quality from the source, ensuring that the team has the ability to cope with high-professional tasks, and laying a solid foundation for high-quality data output.

3. **Full-Process Standardized Management and Control**: Providing end-to-end standardized operation processes for both supply and demand sides. From demand submission, expert recruitment to task acceptance and reward settlement, the whole link adopts online closed-loop management, greatly reducing cross-party communication costs and improving process controllability and traceability.

4. **In-Depth Coverage of Multiple Fields**: Fully covering highly specialized vertical fields such as finance, law, healthcare, physics, and mathematics, which can accurately match the differentiated data training and evaluation needs of different AI teams, and adapt to various application scenarios such as scientific research and commercial landing.

# Future Iteration Directions of the Demo

This demo focuses on the demonstration of core functions and business processes. In the future, it will continue to iterate and optimize based on actual usage feedback. The key directions include: first, improving the reward settlement system to support multiple payment methods and detailed reconciliation functions; second, iterating AI interview and written test algorithms to improve assessment accuracy and efficiency; third, adding data security encryption modules to comprehensively protect the information and data security of both supply and demand sides; fourth, expanding more vertical fields, enriching the expert resource pool and task types, and building a more complete supply-demand matching ecosystem for AI data services.
`;

// Content from MD files (Chinese)
const CONTENT_ANNOTATION_ZH = `
# 平台定位与核心价值

本平台Demo依托AI编码技术构建，是一款聚焦AI数据训练领域的精准供需匹配工具，核心价值在于搭建AI数据训练/评测需求方与各领域顶尖标注专家的高效对接桥梁，精准解决算法团队、AI产品团队在数据处理环节中“优质专家稀缺、供需对接低效”的核心痛点，同时为各领域高学历专家提供灵活可控的任务承接渠道与合规透明的报酬获取路径。

平台聚焦金融、法律、医疗、物理、数理等高度专业化领域，招募对象以世界名校本科、硕士及博士生为核心群体，确保每一位标注专家均具备扎实的学科功底与专业素养，能够精准应对高难度、高精度的数据训练与评测任务，为AI模型的迭代优化提供高可靠性、高精准度的数据支撑。

# 核心功能框架

Demo版本以“供需双向赋能”为核心设计理念，构建了需求方提需对接与供应方招募承接两大核心模块，各关键环节嵌入AI工具提质增效，形成“需求梳理-专家筛选-任务对接-报酬结算”的完整业务闭环（注：Demo阶段仅实现核心流程演示，报酬结算模块为功能预留，待后续迭代落地）。

# 供需双方操作流程

## 需求方操作流程

需求方主要为有数据训练、评测需求的算法团队及AI产品团队，平台提供标准化提需入口与表单模板，引导需求方清晰传递需求，保障供需对接的精准度与效率。

1. **需求梳理与提交**：需求方需提前明确核心诉求，包括数据类型、训练/评测目标、任务周期、质量验收标准等关键信息；同时梳理清晰的人才画像，明确专家所属领域、学历背景、核心技能等硬性要求，通过平台标准化提需入口完成信息提交。

2. **供需匹配与对接**：平台接收需求后，通过AI面试能力基于需求关键词与人才画像，从专家库中快速筛选适配候选人，生成精准匹配列表供需求方查阅。需求方可结合专家简历、资质认证报告筛选心仪对象，通过平台内置沟通渠道完成任务细节确认与合作意向达成。

3. **任务监控与验收**：任务启动后，需求方可通过平台实时查看任务进度，同步专家工作动态，实现全流程可视化管控；任务完成后，需求方通过平台提交验收意见，确认数据质量是否达标，完成闭环管理。

## 供应方操作流程

供应方为各领域顶尖专业人才，平台建立“多层级、高门槛”准入机制，从源头保障专家资质合规性与专业能力达标，同时提供灵活自主的任务承接模式，兼顾专家时间安排与收益需求。

1. **报名与资料提交**：专家通过平台报名入口完成账号注册，按要求上传个人简历（需明确学历背景、专业领域、研究方向、相关项目经验等核心信息），同步提交学历证书、专业资格认证等佐证材料，完成基础信息录入与资料备案。

2. **AI面试与笔试考核**：平台对专家提交的资料进行自动化初步审核，审核通过后，专家需参与平台组织的AI线上面试与专业笔试。AI面试聚焦专业认知、实操能力与问题解决能力，笔试侧重领域内核心知识、数据标注技巧与精准度把控，双重考核体系确保专家能力与任务需求高度适配。

3. **资质认证与入驻**：考核通过后，平台为专家完成官方资质认证，纳入平台核心专家库，专家同步解锁任务承接权限，可自主浏览平台发布的各类数据训练、评测任务。

4. **任务承接与报酬获取**：专家可结合自身专业领域、时间规划，自主报名承接适配任务，与需求方确认合作细节后启动工作。任务完成并通过验收后，可通过平台预留的报酬结算通道获取对应报酬（Demo阶段仅展示流程链路，具体结算规则、支付方式将在后续版本迭代优化）。

# Demo核心亮点

1. **AI驱动精准匹配**：依托AI算法实现供需双方的快速画像比对与候选人筛选，打破传统招募模式的信息壁垒，大幅缩短对接周期，将供需匹配效率提升数倍，降低双方时间成本。

2. **高门槛资质管控**：构建“资料审核+AI面试+专业笔试”三层准入屏障，聚焦世界名校高学历人才群体，从源头严控专家质量，确保团队具备应对高专业度任务的能力，为高质量数据输出筑牢根基。

3. **全流程标准化管控**：为供需双方提供端到端标准化操作流程，从需求提交、专家招募到任务验收、报酬结算，全环节线上化闭环管理，大幅降低跨方沟通成本，提升流程可控性与可追溯性。

4. **多领域深度覆盖**：全面覆盖金融、法律、医疗、物理、数理等高度专业化垂直领域，可精准匹配不同AI团队的差异化数据训练、评测需求，适配科研、商业落地等多类应用场景。

# Demo后续迭代方向

本Demo聚焦核心功能与业务流程演示，后续将结合实际使用反馈持续迭代优化，重点方向包括：一是完善报酬结算系统，支持多元支付方式与明细对账功能；二是迭代AI面试与笔试算法，提升考核精准度与效率；三是增设数据安全加密模块，全方位保障供需双方信息及数据安全；四是拓展更多垂直领域，丰富专家资源池与任务类型，构建更完善的AI数据服务供需匹配生态。
`;

const CONTENT_AI_WORKSPACE = `
# TuringArena 项目介绍

## 项目定位

TuringArena 是一个面向高阶专家与 AI 企业的智能协作平台。它要解决的不是“再做一个聊天窗口”，而是把专家在复杂问题里的判断、推理、反驳、纠错和决策过程，转化为可协作、可复用、可交付的高质量 AI 数据资产。

大模型已经很会回答问题了，但在医疗、法律、金融、代码、科研这类高风险场景里，真正稀缺的不是“答案”，而是专家为什么这样判断、如何发现模型的问题、什么时候坚持反驳、怎样把一个模糊结论打磨成可信决策。普通数据告诉模型“结果对不对”，TuringArena 想补上的，是“为什么对、错在哪里、应该怎么变得更专业”。

换句话说，TuringArena 不是让专家给 AI 打工，而是让 AI 帮专家把能力放大。专家不再只是一次性完成任务，而是在每次协作中沉淀自己的知识、方法和判断资产。模型也不再只吃“标准答案快餐”，而是开始摄入更有营养的专家过程数据。

## 核心判断

AI 行业正在从“通用能力竞争”进入“专业能力竞争”。在这个阶段，模型需要的不只是更多数据，而是更高密度、更可解释、更接近真实工作场景的数据。

传统标注模式擅长生产规模化结果数据，例如分类、打分、排序、正确错误判断。但对于复杂任务来说，这些数据只能看到终点，看不到路径。模型知道某个答案被判为错误，却不知道专家为什么判错、哪一步推理出了问题、应该引用什么证据、怎样修正才符合专业标准。

TuringArena 的核心判断是：下一阶段高质量 AI 数据的价值，不在于“人类给模型一个答案”，而在于“人类专家如何和模型共同完成一次高质量决策”。这中间的讨论、分歧、验证、纠偏和最终裁决，才是最有训练价值的部分。

如果把普通标注数据比作成品菜，TuringArena 关注的是厨房里的完整烹饪过程：食材怎么选、火候怎么控、哪里差点翻车、最后为什么这样装盘。模型只吃成品当然也能学，但学不到真正的手艺。

## 目标用户

TuringArena 的用户主要分为两类。

第一类是行业专家，包括医生、律师、算法工程师、金融研究员、教育专家、内容创作者、研究员和企业内部资深业务人员。他们拥有高价值判断力，但不应该被低效表单、重复标注和机械审核消耗。让专家反复点“正确/错误”，就像请米其林主厨去流水线贴标签，不能说没用，只能说有点浪费。

第二类是 AI 企业和模型团队。他们需要更高质量的数据来提升模型能力，尤其是在医疗、法律、代码、金融、科研等复杂领域。传统标注数据往往只能回答“结果对不对”，但模型真正需要的是“为什么错、应该怎么改、判断依据是什么、专家在关键分歧点如何决策”。

TuringArena 连接的正是这两端：一端是拥有专业知识和真实判断力的人，另一端是急需高质量训练信号的 AI 团队。平台的价值不只是撮合供需，而是把专家工作过程变成模型进化所需的“高信噪比燃料”。

## 产品闭环

TuringArena 的产品闭环可以概括为：专家完成真实任务，平台增强专家效率，系统记录协作过程，数据经过结构化处理后交付给模型团队，模型能力提升后再反哺下一轮专家协作。

这个闭环包含五个关键步骤：

- **任务进入平台**：企业发布专业任务，明确领域、目标、输入材料、验收标准和数据交付格式。
- **专家参与协作**：专家在工作台中调用多模型圆桌、知识库、Skills 和数字分身完成分析与判断。
- **过程被结构化记录**：平台记录模型输出、专家修改、证据引用、分歧处理、Prompt 调整、编辑轨迹和最终裁决。
- **数据进入质量治理**：系统对过程数据进行清洗、脱敏、聚类、评分和复核，形成可训练、可审计、可追溯的数据资产。
- **结果服务模型训练**：数据可用于 SFT、RLHF、RLAIF、模型评测、偏好建模、红蓝对抗和专业能力 Benchmark 构建。

这不是简单的“任务平台 + 聊天工具”。TuringArena 的重点是把专家协作过程产品化，把专家能力资产化，把过程数据工程化。

## 核心场景

### 专家工作台

专家可以在平台内使用多模型对话、圆桌讨论、知识库引用和技能工具，完成复杂问题分析、任务评审、内容生成、代码审查、案例判断等工作。

这不是简单地问一个 AI “帮我看看”，而是让多个模型、多个角色和专家本人一起进入同一个协作空间。模型负责提出方案、补充视角、暴露分歧，专家负责判断、纠偏和拍板。AI 可以充分讨论，甚至可以“吵”得很热闹，但最后谁有道理，还是专家说了算。

工作台需要支持清晰的任务上下文、可引用资料、分轮讨论、版本对比、专家批注、最终结论生成和过程记录。它的目标不是让专家多看几个 AI 回复，而是让专家更快抵达高质量判断。

### 任务大厅

平台可以承接来自企业侧的数据任务，例如高难度 RLHF、红蓝对抗、模型评测、专业问答、推理轨迹采集、代码审查、研究资料分析等。专家通过任务大厅领取任务，完成后获得收益或积分。

这个场景解决的是供需匹配问题：企业不再盲目找人标注，专家也不必在零散任务里“海底捞针”。平台把任务、专家、质量标准和交付流程组织起来，让高价值专业劳动更容易被发现、被定价、被复用。

专业任务不是普通问卷，不能只靠“谁有空谁来做”。TuringArena 可以根据专家领域、历史质量、任务难度、知识库匹配度和交付记录进行推荐，让任务分发更像专业调度，而不是随机派单。

### 数字分身与 Skills

平台支持沉淀专家知识、System Prompt、私有知识库和专业技能，逐步形成可复用的数字分身。专家可以把自己的经验封装为更稳定的能力模块，让平台在后续任务中调用。

这类能力不是单纯的模板，而是结合知识库、技能编排和任务上下文形成的专业工作流。真正有价值的不是“保存一个 Prompt”，而是把专家的处理方式、判断偏好和验证路径沉淀成可以持续升级的能力系统。

例如，一位法律专家可以沉淀“合同风险审查 Skill”，包含条款拆解、风险等级判断、相似案例检索、修改建议生成和最终审查清单。一位算法工程师可以沉淀“模型评测分析 Skill”，包含指标解释、失败样本归因、误差类型聚类和改进建议生成。

### 插件与轨迹采集

浏览器插件承担数据采集入口的角色，可以记录专家在真实工作中的操作轨迹、编辑过程、页面交互和问题处理路径。平台再将这些过程数据清洗、结构化，转化为模型训练所需的数据。

这个场景的关键在于“过程”。最终答案当然重要，但专家如何发现问题、如何修改、如何验证，往往比答案本身更有训练价值。毕竟只看结果训练模型，就像只看比赛比分学习战术，能学到一点，但关键动作全错过了。

插件采集不应该变成“录屏式监控”，而应该围绕任务目标捕捉有价值的决策信号：用户查看了哪些资料、在哪些段落停留、如何修改模型答案、哪些建议被接受、哪些被拒绝、最终结论如何形成。

## 解决的问题

TuringArena 主要解决四个问题。

第一，传统标注平台数据深度不足。普通标注适合判断简单任务，却难以覆盖复杂推理、专业决策和多步骤纠错。模型想学会专业判断，只看“答案对错”远远不够。

第二，专家参与 AI 数据生产的效率太低。很多工具把专家当成高级按钮点击器使用，没有真正放大专家能力，也没有沉淀专家资产。TuringArena 要让专家的每一次判断都能产生复利。

第三，AI 企业缺少高质量过程数据。模型训练不只需要答案，还需要推理路径、错误修正、人类偏好、证据引用和价值判断。特别是在专业场景中，过程数据往往比结果数据更能决定模型上限。

第四，专家能力难以规模化复用。一个优秀专家的知识通常停留在个人经验中，难以被复制、组合和持续迭代。TuringArena 试图把它转化为可组合的知识库、Skills 和数字分身。

## 产品模块

| 模块 | 面向对象 | 核心能力 | 产出价值 |
| --- | --- | --- | --- |
| 专家工作台 | 行业专家 | 多模型协作、资料引用、批注修改、结论生成 | 提升复杂任务处理效率 |
| 任务大厅 | 企业与专家 | 任务发布、专家匹配、进度管理、验收结算 | 建立专业数据供需网络 |
| 多模型圆桌 | 专家与模型团队 | 多角色讨论、反方质疑、观点汇总、分歧暴露 | 提高判断质量和覆盖盲区 |
| 知识库 | 专家与团队 | 文档管理、语义检索、引用追踪、上下文增强 | 降低幻觉风险，提升依据透明度 |
| Skills 编排 | 专家与平台 | Prompt、工具、知识库、输出模板组合 | 复用专家工作流 |
| 数字分身 | 专家 | 偏好学习、初稿生成、预审建议、任务分发辅助 | 放大专家个人能力 |
| 过程数据管线 | AI 企业 | 轨迹采集、清洗脱敏、质量评分、结构化交付 | 形成可训练数据资产 |

## 特别功能

### 多模型圆桌讨论

平台支持多个模型和角色同时参与讨论，形成类似“专家会议”的协作体验。不同模型可以负责提出方案、质疑观点、总结结论或模拟反方，让复杂问题不再只依赖单一模型输出。

这项功能的价值在于发现盲区。一个模型可能自信地错，多个模型一起讨论时，分歧会更早暴露，假设会被反复挑战，专家也更容易看到问题的关键。它不是为了让 AI 开会凑热闹，而是把“多视角推理”变成可观察、可比较、可沉淀的协作过程。

专业场景中，正确答案往往不是一次生成出来的，而是在多个假设之间被筛出来的。多模型圆桌把这种筛选过程显性化，让企业能够看到模型分歧、专家裁决和最终结论之间的关系。

### 专属知识库

用户可以围绕个人、团队或任务建立知识库，并在工作过程中引用资料、进行检索和比对。对于法律合同、医学文献、代码仓库、企业规范等长文本场景，这能显著提升处理效率，也能减少“模型说得很像真的，但来源不知道在哪”的尴尬。

知识库的专业性不仅体现在存文档，还体现在引用可追溯、片段可定位、上下文可复用。每一次专家判断都可以绑定证据来源，后续用于数据训练时，也能保留判断依据。

### Skills 能力编排

平台支持将专业技能、知识库和提示词组合成可复用能力。用户不需要每次从零开始描述任务，而是可以直接调用已经沉淀好的专业工作流。

这让专家能力从“一次性手工处理”变成“可复制的专业流程”。一个好的 Skill 可以承载任务拆解、资料检索、判断标准和输出格式，让复杂任务更稳定，也让交付质量更可控。

从平台角度看，Skills 是专家能力产品化的关键。它让平台不只拥有“专家名单”，还拥有一组不断演进的专业能力组件。

### 数字分身

数字分身用于承载专家的知识结构、任务偏好和处理方式。它可以辅助专家完成初筛、草稿生成、评审建议和任务分发，让专家把精力集中在高价值判断上。

它不是一个“替你发言的虚拟人设”，而是专家能力的工作副本。专家仍然掌握最终判断权，但大量前置分析、资料整理和初步建议可以交给数字分身先跑一轮。

数字分身的长期价值在于持续学习专家偏好。随着专家完成更多任务，系统可以更好地理解专家的判断标准、常用资料、表达风格和风险敏感点。

### 过程数据沉淀

TuringArena 关注的不只是“交付答案”，更是“记录专家如何得到答案”。包括模型对比、Prompt 修改、人工纠偏、资料查证、编辑轨迹等，都可以转化为高价值训练数据。

这正是项目最独特的地方：它把原本散落在脑子里、聊天框里、文档批注里的专家过程，变成可结构化分析的数据。对模型来说，这比普通答案更接近真实世界的专业决策现场。

## 数据资产设计

TuringArena 的数据资产不是一条简单的问答记录，而是一组围绕任务过程组织的结构化对象。

| 数据类型 | 示例内容 | 训练价值 |
| --- | --- | --- |
| 任务上下文 | 任务目标、领域、输入材料、约束条件 | 帮助模型理解真实问题边界 |
| 模型候选输出 | 多模型回答、不同角色观点、反方质疑 | 用于偏好比较和多样性学习 |
| 专家干预记录 | 修改、删除、补充、反驳、重新排序 | 学习专家如何纠错和优化 |
| 证据引用 | 文档片段、案例来源、知识库命中结果 | 提升可解释性和事实一致性 |
| 决策轨迹 | 关键分歧点、判断依据、最终裁决 | 学习复杂推理和价值判断 |
| 质量标签 | 难度、置信度、风险类型、错误类型 | 支持评测、筛选和模型改进 |

这些数据可以服务多个方向：监督微调、偏好训练、奖励模型构建、专家模型评测、专业 Benchmark、失败案例库和模型安全评估。

## 质量治理

专业数据的核心不是“多”，而是“可信”。TuringArena 需要建立一套围绕专家、任务和数据的质量治理机制。

专家侧，需要有准入认证、领域标签、历史质量评分、任务完成记录和复核机制。不是所有人都适合处理所有任务，平台需要明确“谁擅长什么、谁做得稳定、谁需要复核”。

任务侧，需要有清晰的难度分级、交付规范、验收标准和风险提示。医疗、法律、金融等高风险任务不能只看完成速度，更要看依据是否充分、结论是否可追溯、是否存在过度推断。

数据侧，需要进行脱敏、去重、异常检测、质量抽检和版本管理。训练数据一旦进入模型链路，后续追责和修正成本会很高，所以前置治理必须足够严肃。模型可以偶尔糊涂，数据管线最好别跟着糊涂。

## 差异化优势

TuringArena 与传统标注平台、普通 AI 工作台和单一专家社区都有明显差异。

| 对比对象 | 典型问题 | TuringArena 的不同 |
| --- | --- | --- |
| 传统标注平台 | 重结果、轻过程，专家能力难沉淀 | 捕捉专家推理、纠错和验证过程 |
| 普通 AI 工作台 | 提升个人效率，但数据资产化不足 | 将协作过程结构化为可训练数据 |
| 专家社区 | 有人脉和内容，但缺少任务闭环 | 提供任务、工具、交付和质量治理 |
| 单模型评测工具 | 能看模型表现，但缺少专家决策链 | 记录多模型分歧与专家裁决过程 |

这个差异化决定了 TuringArena 的长期价值不只是工具效率，而是数据网络效应。专家越多，任务越丰富，过程数据越密集，平台越能形成领域能力壁垒。

## 项目价值

对专家而言，TuringArena 是一个提升效率、沉淀能力和获得收益的平台。它让专家不再只是完成一次性任务，而是逐步积累可复用的专业资产。

对 AI 企业而言，TuringArena 提供的是更接近真实专业场景的数据来源。相比普通问答数据，这类数据更能帮助模型理解复杂任务中的判断链路、错误边界和人类偏好。

对平台自身而言，TuringArena 的长期价值在于构建一个高阶专家网络。这个网络既能服务模型训练，也能服务真实业务场景，最终形成“工具提升专家效率，专家产出高质量数据，数据反哺模型能力”的闭环。

它的创新点不在于把专家、任务和 AI 简单放在一起，而在于把三者之间的互动过程产品化：专家工作被工具增强，AI 讨论被结构化记录，过程数据被转化为训练资产。这个闭环一旦跑起来，平台积累的就不只是数据量，而是专业判断的密度。

## 可衡量指标

一个专业平台不能只讲愿景，也要能被衡量。TuringArena 可以围绕以下指标评估价值：

- **专家效率**：单任务完成时间、专家修改比例、AI 初稿采纳率、重复任务复用率。
- **数据质量**：专家一致性、复核通过率、错误标签覆盖率、证据引用完整率。
- **模型收益**：评测集提升、偏好模型胜率、专业任务通过率、红蓝对抗失败率下降。
- **平台网络**：专家留存、任务复购、领域覆盖数、可复用 Skills 数量。
- **商业转化**：企业任务 GMV、专家收益规模、单任务交付成本、数据资产复用次数。

这些指标能够把“专家协作更高级”转化为可验证的业务结果。

## 演进路线

TuringArena 可以分阶段推进。

第一阶段，完成专家工作台、任务大厅、多模型圆桌和基础知识库，跑通专家协作与数据交付的核心闭环。

第二阶段，强化过程数据管线，包括轨迹采集、数据清洗、质量评分、脱敏处理和结构化导出，让数据能够稳定服务模型训练。

第三阶段，建设专家数字分身和 Skills 市场，让专家能力从个人经验沉淀为可复用的产品化能力。

第四阶段，形成领域 Benchmark 和模型评测服务，围绕医疗、法律、代码、金融等垂直场景建立专业数据壁垒。

最终，TuringArena 不只是一个任务平台，而是一套连接专家能力、AI 工具和模型训练的专业数据基础设施。

## 总结

TuringArena 的核心目标，是把人类专家的高阶判断力转化为可协作、可沉淀、可规模化的数据与能力网络。

它不是要替代专家，而是让专家从重复劳动中解放出来，把真正有价值的判断、推理和纠错过程放大。对于正在进入深水区的大模型行业来说，这类数据和能力可能正是下一阶段竞争的关键燃料。

当然，燃料质量越高，发动机越有劲。TuringArena 要做的，就是让 AI 少吃一点“标准答案快餐”，多吃一点真正有营养的专家过程数据。
`;

const CONTENT_AI_WORKSPACE_ZH = CONTENT_AI_WORKSPACE;

const CONTENT_AGENT_SYNAPSE = `
# Agent Synapse 项目介绍

> 给 AI Agent 装一个体检中心。
> 不是为了让它显得更聪明，而是为了在它“看起来很努力但其实在原地转圈”的时候，第一时间抓个现行。

## 一句话介绍

**Agent Synapse 是一个面向 AI Agent 的诊断与分析平台**，通过执行链路、会话质量、异常聚类和 AI 复盘能力，帮助团队回答三个非常现实的问题：

1. **最近 Agent 到底稳不稳？**
2. **某次会话为什么翻车？**
3. **这类问题是不是已经开始批量出现？**

如果说传统监控告诉你“服务器还活着”，Agent Synapse 关心的是：**Agent 活着的时候，到底有没有好好干活。**

## 为什么需要它

AI Agent 的运行过程不像普通接口那么直白。一次用户请求背后，可能有多轮思考、多次工具调用、上下文拼装、重试、截断、幻觉、空转，以及一些“它自己也解释不清”的操作。

这就带来一个问题：
**当业务方说“Agent 最近是不是变笨了”，团队很难只靠感觉回答。**

常见排查方式通常是：

- 翻日志：像在几万行文本里找一根会动的针。
- 看单次对话：容易被个例带偏。
- 问模型自评：有时像让考生自己批卷，场面比较和谐，但不一定可靠。
- 靠人工复盘：有效，但人会累，尤其是周五晚上。

Agent Synapse 的目标，就是把这些零散、主观、费眼睛的排查动作，变成一套**可量化、可追溯、可批量分析**的诊断流程。

## 它能做什么

### 1. 给每次 Session 做体检

平台会把一次完整会话视为一份体检报告，从多个角度评估 Agent 的表现：

| 能力 | 它回答的问题 |
| --- | --- |
| 执行规整 | Agent 有没有把任务流程走完整？ |
| 工具稳定 | 工具调用有没有真实办成事？ |
| 重复空转 | 它是不是在反复尝试同一件事？ |
| 资源开销 | Token 是花在刀刃上，还是花在自我感动上？ |
| 调度编排 | 工具调用是否合理、多样、高效？ |

这些指标会汇总成健康度分数，让团队不用逐条翻 trace，也能快速判断：这次是正常发挥、轻微发烧，还是已经需要急诊。

### 2. 用 DAG 看清 Agent 的执行过程

Agent Synapse 会把执行链路组织成 DAG 和时间轴，让你看到：

- 哪些步骤串行阻塞了整体耗时。
- 哪些工具调用失败或重复。
- 哪条关键路径真正决定了用户等待时间。
- Agent 是一步步解决问题，还是一步步把自己绕进去。

这比单纯看日志更直观。日志像案发现场的碎纸片，DAG 像监控录像，虽然不一定高清，但至少知道谁先进门、谁摔了杯子。

### 3. 用 LLM-as-Judge 补齐语义体验

规则指标擅长发现结构问题，比如超时、失败、重复、截断。
但用户真正关心的往往是另一层问题：

- 有没有理解我的真实意图？
- 回答是不是可执行？
- 有没有答非所问？
- 有没有看似完成、实际没解决？
- 有没有一本正经地胡说八道？

Agent Synapse 引入 LLM-as-Judge，对会话进行语义质量评估，覆盖问题解决、意图匹配、效率体感、用户情绪、可执行性、幻觉风险等维度。

简单说：
**规则负责看 Agent 有没有摔倒，LLM 负责看它是不是摔倒后还在假装跳舞。**

### 4. 把异常归堆，找到批量问题

单个 Session 翻车不可怕，可怕的是同一种翻车正在悄悄复制粘贴。

异常聚类页会按照问题标签把 Session 归堆，展示：

- 哪些异常类型最多。
- 哪些问题正在变严重。
- 哪些 Session 命中了同一类问题。
- 同一异常下的共性和差异。

这让团队可以从“救火式排查”升级到“批量治理”：
不只是修一个 case，而是发现一类问题。

### 5. AI 批量总结，自动写复盘初稿

针对某类异常，平台支持 AI 批量总结。它会把多个命中 Session 的表现归纳成一份结构化诊断：

- 整体结论
- 问题归类
- 典型案例
- 可能根因
- 改进建议

这不是替代工程师判断，而是帮工程师少做“复制 Session ID、整理现象、写第一版总结”这种低价值体力活。

换句话说，它不负责背锅，但可以把锅的形状、大小、出现频率整理得很清楚。

## 核心页面

### 大盘：先看整体体温

大盘适合日常巡检，回答“最近整体怎么样”。

你可以看到：

- E2E P95 / P50 等性能指标。
- 总成本与 Token 消耗。
- 健康度分布。
- 五维雷达图。
- 高风险 Session 排行。

适合产品、运营和业务方快速判断当前 Agent 服务质量。

### 明细：再看单次病历

明细页适合研发定位具体问题，回答“这个 Session 到底哪里坏了”。

你可以看到：

- 会话基本信息。
- 完整执行轨迹。
- DAG 甘特图。
- 健康度与异常标签。
- LLM 质量评估。
- AI 一键诊断报告。

它的定位不是“看热闹”，而是“定位根因”。

### 异常：最后看共性问题

异常页适合做批量治理，回答“同类问题是不是在扩大”。

你可以看到：

- 异常类型列表。
- 受影响 Session 数。
- 平均健康度。
- 趋势变化。
- 异常对比与 AI 总结。

适合周报、复盘、专项治理和推动跨团队修复。

## 典型使用场景

### 场景一：业务方问“最近是不是变慢了”

以前的回答可能是：“我看一下日志。”
然后半小时过去，会议气氛开始变得礼貌。

现在可以：

1. 在大盘看 P95 / P50 是否异常。
2. 看健康度分布是否劣化。
3. 下钻高风险 Session。
4. 用关键路径定位到底是工具慢、模型绕、还是重试多。

结果从“感觉慢”变成“哪类任务、哪条链路、哪种原因导致慢”。

### 场景二：某个用户投诉“它没解决我的问题”

可以进入 Session 详情页：

1. 看用户真实输入和 Agent 最终输出。
2. 看执行轨迹是否完整。
3. 看工具调用是否成功。
4. 看 LLM-as-Judge 对问题解决度和意图匹配的判断。
5. 生成 AI 诊断报告，快速形成复盘材料。

这比“我本地试了一下好像可以”更有说服力。后者通常只适合安慰自己。

### 场景三：某类异常突然变多

可以进入异常聚类页：

1. 找到上升最快的问题标签。
2. 打开命中 Session 列表。
3. 按分数从低到高查看最严重样本。
4. 让 AI 批量总结共性。
5. 输出工程改进项，例如改 prompt、加工具约束、优化重试策略、补充上下文裁剪规则。

从此复盘不再靠“大家各自看几个 case 然后凭缘分达成共识”。

## 项目亮点

### 可量化

把 Agent 的复杂行为拆成健康度、异常标签、关键路径、Token、工具稳定性等指标，让质量讨论有统一刻度。

### 可追溯

从大盘到异常，再到单个 Session 和单个 Span，层层下钻。看到一个分数，不止知道它低，还能知道它为什么低。

### 可批量

支持异常归堆、趋势观察和批量总结，适合从个案排查走向系统治理。

### 可解释

规则指标负责客观结构，LLM 评估负责语义体验，两者结合，避免只看数字或只听模型“自我表扬”。

### 面向真实落地

平台兼容多种数据源模式，支持实时拉取、聚合缓存、历史回填和前端诊断展示，目标不是做一个漂亮 Demo，而是服务真实线上 Agent 的质量治理。

## 适合谁用

| 角色 | 使用价值 |
| --- | --- |
| 产品 / 运营 | 监控 Agent 质量趋势，发现问题并推动治理 |
| 研发 / 算法 | 定位失败根因，优化工具调用、上下文、Prompt 和执行策略 |
| 业务方 | 用统一口径了解服务质量，减少“玄学争论” |
| 管理者 | 看到质量治理进展，而不是只听“我们正在优化” |

## 和普通监控有什么不同

普通监控更像给机器量血压：CPU、内存、接口耗时、错误率。
Agent Synapse 更像给 Agent 看诊：它有没有理解任务、有没有走完流程、有没有重复空转、有没有消耗过高、有没有表面完成但实际没解决。

| 普通监控 | Agent Synapse |
| --- | --- |
| 关注服务是否可用 | 关注 Agent 是否有效完成任务 |
| 看接口、机器、错误码 | 看 Session、Turn、Step、Span |
| 发现系统异常 | 发现行为异常和体验异常 |
| 偏工程稳定性 | 兼顾工程稳定性和语义质量 |
| 告诉你“哪里红了” | 尽量告诉你“为什么红、怎么修” |

## 一个更直白的比喻

如果 AI Agent 是一位新同事：

- 大盘告诉你：他这周整体状态如何。
- 明细告诉你：他某次任务具体怎么做的。
- 异常聚类告诉你：他是不是总在同一个地方犯错。
- AI 诊断告诉你：这事儿该怎么写复盘，不至于全靠人类加班。

所以 Agent Synapse 做的事情并不神秘：
**它把 Agent 的工作过程从“看结果猜过程”，变成“看过程改系统”。**

## 未来可以继续扩展的方向

Agent Synapse 已经具备诊断平台的核心骨架，后续可以继续向以下方向增强：

- 更细粒度的 Agent 版本对比。
- 异常趋势预测与自动告警。
- 与发布系统联动，分析版本变更对质量的影响。
- 更丰富的人工标注与反馈闭环。
- 面向不同业务场景的自定义评分口径。
- 自动生成专项治理报告和周报。

## 总结

Agent Synapse 的价值，不是把 AI Agent 包装得更神秘，而是把它拆开、看清、量化、归因。

当 Agent 表现良好时，它能证明“不是运气”。
当 Agent 出现问题时，它能说明“不是玄学”。
当问题开始批量出现时，它能提醒团队“别等用户替你报警”。

一句话：
**Agent Synapse 让 AI Agent 的质量治理，从拍脑袋进入有证据时代。**
`;

const CONTENT_AGENT_SYNAPSE_ZH = CONTENT_AGENT_SYNAPSE;

const CONTENT_FIGMA_TRACKER = `
# Figma 轨迹采集项目介绍

## 这项目是干什么的？

一句话概括：**它负责把设计师在 Figma 里的“创作过程”和“最终成稿”一起打包带走**。

如果说普通的设计稿交付像“交作业只看最终答案”，那这个项目做的事更像是：**不仅收卷子，还顺手把草稿纸、演算过程、最后那张漂亮答题卡一起收了**。

而且它不是靠人工回忆“我当时大概改了三版按钮”，而是直接从 Figma 插件侧采集真实操作轨迹，再由 Go 后端统一接收、存储和管理。

所以，这个项目本质上是一套：

- **前端采集器**：Figma 插件，负责记录设计过程和提取最终画板数据
- **后端接收器**：Go 服务，负责鉴权、入库、上传预览图、提供查询接口
- **数据归档链路**：把轨迹数据、成稿结构、预览图统一沉淀下来，方便后续分析、复盘和消费

它解决的核心问题很朴素：**设计过程以前像玄学，现在至少能落地成 JSON 了。**

## 为什么要做这个项目？

因为“只看最终稿”这件事，很多时候并不够。

在实际协作里，团队往往不只关心设计师最后交了什么，还关心这些问题：

- 这个方案是怎么一步步演化出来的？
- 哪些元素是新增，哪些是修改，哪些是复制粘贴后重新整理的？
- 最终成稿里到底有哪些图层、样式、文本、矢量和图片资源？
- 能不能把这些数据喂给后续的分析系统、训练链路或者自动化工具？

这个项目就是为这类需求服务的。它把“设计行为”从一个只能口述的过程，变成了一个可记录、可检索、可分析的数据链路。

说得再直白一点：

> 以前复盘设计过程，靠的是“我记得我改过”。
> 现在复盘设计过程，靠的是“数据库里真有”。

这两者的气质差别，大概相当于“凭印象写周报”和“直接贴日志截图”。

## 它到底采了什么？

这个项目主要采两类数据。

### 1. 操作轨迹

插件会监听 Figma 中的典型事件，例如 documentchange、selectionchange、currentpagechange。

当用户开始采集后，插件会在前端静默记录设计过程中的轻量快照，并做去重和防抖，避免每动一下鼠标就把系统搞成日志瀑布。

采集到的轨迹里，通常会包含：

- 当前页面信息
- 当前选中节点的状态快照
- 节点的尺寸、位置、样式、透明度等基础属性
- 文本信息、部分矢量信息、层级结构

简单说，它记录的不是“设计师此刻内心有多挣扎”，而是“画布上刚刚到底发生了什么”。

### 2. 最终成稿

当用户点击“结束并提交”时，插件会递归提取当前选中 Group 或 Frame 的完整结构，拿到：

- 图层树
- 文本内容与字体属性
- 填充、描边、阴影等样式
- 矢量图的 SVG
- 图片资源的 Base64 数据
- 预览图截图

这意味着，系统拿到的不只是“一张图”，而是一份足够结构化的设计描述。后续无论是做分析、生成、比对，还是给别的系统消费，都比“请看这张 PNG”强太多。

## 项目怎么工作？

整体流程可以概括成 5 步：

1. 用户在 Figma 中启动插件
2. 点击“开始”，进入轨迹采集状态
3. 在设计过程中，插件静默记录关键变化
4. 用户选中一个目标 Group/Frame，点击“结束并提交”
5. 插件把轨迹数据、最终成稿和预览图发给 Go 后端，后端完成存储和归档

可以把它理解成这条链路：

Figma 设计师操作 -> Figma 插件 -> 轨迹快照聚合 / 最终成稿递归提取 -> Go 后端 /api/track -> RDS MySQL、TOS 预览图存储、/api/trajectories 查询接口。

这套结构的好处是职责很清楚：

- **插件**只负责采、提、传
- **后端**只负责收、存、查
- **对象存储**负责扛图片这类大块头
- **数据库**负责沉淀结构化记录

大家各干各的，避免出现“前端想兼职数据库，后端顺便手搓文件系统”的奇妙场面。

## 这个项目的几个亮点

### 1. 不只采结果，还采过程

这是项目最核心的价值。

很多工具只能拿到最终设计稿，像只看电影最后 3 分钟，然后认真分析角色成长弧线，多少有点强人所难。这个项目把过程也留住了，所以能支持更完整的复盘与分析。

### 2. 提取粒度比较深

最终成稿提取不是只导一张截图，而是递归拿图层树和节点属性，包括：

- 文本内容
- 字体信息
- fills / strokes / effects
- 节点坐标和尺寸
- SVG
- 图片资源

这让它更像“可计算的设计数据”，而不是“设计稿照片存档”。

### 3. 对大稿子有一定性能防护

项目里做了几层比较务实的处理：

- 前端轨迹记录带防抖
- 静默快照做去重
- 子节点提取按批并发
- 提取过程支持取消
- 后端对请求体做 200MB 限制

翻译成人话就是：**它知道设计稿可能很大，也知道硬扛通常没有好下场。**

### 4. 身份信息自动获取

插件通过 Figma 的 currentUser 能直接拿到用户 ID 和用户名，不用额外再搞一套登录弹窗。

这件事听起来普通，但实际很重要，因为“少让用户点一步”通常比“架构图多漂亮一层”更能决定工具会不会真的被用起来。

### 5. 后端对生产环境有基本敬畏

Go 服务这边不是一个“本地能跑就算成功”的玩具实现，而是考虑了：

- 鉴权校验
- 大包保护
- panic recovery
- TCC 配置加载
- TOS 失败时降级
- RDS 初始化重试
- TCE / Mesh 场景下的启动顺序

至少从工程气质上看，它知道线上环境不是慈善机构。

## 项目结构怎么读？

仓库主要可以分成两块：

- figma-tracker-plugin：正式版 Figma 插件，包含 manifest.json、code.js、ui.html
- data-ingestion-go-poc：Go 后端服务，包含 main.go 与 config、db、handler、model、secret、service 等内部模块

### figma-tracker-plugin

这一部分是插件本体：

- manifest.json：插件声明文件
- code.js：和 Figma API 直接交互的主逻辑
- ui.html：插件界面和上传逻辑

这里负责完成“监听设计行为、提取节点数据、驱动交互界面”。

### data-ingestion-go-poc

这一部分是后端服务：

- main.go：服务启动入口
- handler/：HTTP 接口处理
- model/：数据库模型
- service/：TOS 上传、HTML 生成等服务逻辑
- config/：配置和密钥加载
- db/：数据库初始化
- secret/：TCC 相关能力

这里负责完成“收数据、验身份、传预览图、写数据库、提供查询接口”。

### 其他文档

- 使用说明.md：更偏操作手册
- 字节内部服务上线复盘.md：更偏内部平台部署经验总结
- build.sh：打包构建脚本，会编译 Go 服务并打包插件产物

所以这仓库不是单一插件项目，而是一整条从采集端到接收端的闭环链路。

## 适合什么场景？

这个项目比较适合下面几类场景：

- **设计过程分析**：研究一个成稿是怎么演进出来的
- **设计资产沉淀**：把成稿结构化保存，而不是只留截图
- **数据驱动复盘**：让设计评审、流程分析更有依据
- **下游模型或工具消费**：给自动生成、理解、比对等能力提供输入

尤其当你不满足于“最后这张图长什么样”，而是还想知道“它怎么一步步变成这样”的时候，这个项目就很有价值。

## 当前边界和限制

任何项目都不是万能的，这个也一样。它现在有几个很明确的边界：

- 一次只允许提交 **1 个 Group/Frame**
- 插件面板在采集过程中最好保持打开
- 超大设计稿可能触发后端的 **200MB payload 限制**
- 图片、复杂矢量较多时，提取和上传耗时会上升
- 当前更像一套内部数据采集与归档链路，不是面向公众市场的通用插件产品

这不是缺点清单，而是工程现实。

## 一句话总结

如果要给这个项目下一个最准确、也最不装腔作势的定义，我会这么写：

> **这是一个把 Figma 设计过程“数据化”的项目。**
> 它既采操作轨迹，也采最终成稿；既有插件侧的轻量记录，也有服务端的稳定落库；目标不是只保存一张设计图，而是保存一段可以被理解、复盘和继续利用的设计过程。

换句话说，它做的不是“截图保存”，而是“把设计这件事，尽量从现场口供变成结构化证据”。

这个方向很务实，也很值钱。毕竟当团队开始认真研究设计过程时，说明大家已经不满足于“作品看起来不错”，而是想进一步回答：

**这个好结果，到底是怎么做出来的？**
`;

const CONTENT_FIGMA_TRACKER_ZH = CONTENT_FIGMA_TRACKER;

// Mock Data for Detail Page
const PROJECT_DETAILS: Record<string, any> = {
  'ai-workspace': {
    id: 'ai-workspace',
    title: {
      en: 'Turing Arena Expert Workbench',
      zh: 'Turing Arena专家工作台'
    },
    subtitle: {
      en: 'Expert Data Collaboration Platform',
      zh: '专家数据协作平台'
    },
    tagline: {
      en: 'Turning expert reasoning into high-quality AI training data',
      zh: '把专家推理过程沉淀为高质量 AI 训练数据'
    },
    description: {
      en: CONTENT_AI_WORKSPACE,
      zh: CONTENT_AI_WORKSPACE_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=realistic%20premium%20AI%20workspace%20dashboard%20on%20a%20large%20desktop%20monitor%2C%20blue%20purple%20gradient%20glassmorphism%20cards%2C%20minimal%20Apple%20inspired%20interface%2C%20soft%20studio%20lighting%2C%20clean%20productivity%20workflow%20visualization&image_size=landscape_16_9',
    launchLink: 'https://kejin-li.github.io/AI-Workspace/',
    theme: {
      bg: 'bg-[#E8E2FF]',
      accent: 'text-google-grey-900',
      button: 'bg-google-grey-900 text-white hover:bg-black',
      gradient: 'from-[#E8E2FF] to-[#E8E2FF]'
    },
    techStack: [
      {
        icon: Sparkles,
        title: { en: 'Multi-model Roundtable', zh: '多模型圆桌讨论' },
        desc: { en: 'Multiple models and expert roles collaborate on complex decisions', zh: '多个模型与专家角色共同参与复杂问题判断' }
      },
      {
        icon: Layers,
        title: { en: 'Knowledge Base & Skills', zh: '知识库与 Skills' },
        desc: { en: 'Reusable expert workflows built from knowledge and prompts', zh: '把专家知识、提示词与任务流程沉淀为可复用能力' }
      },
      {
        icon: Cpu,
        title: { en: 'Process Data Capture', zh: '过程数据沉淀' },
        desc: { en: 'Captures expert corrections, reasoning paths, and interaction traces', zh: '记录专家纠偏、推理路径与真实操作轨迹' }
      }
    ]
  },
  'agent-synapse': {
    id: 'agent-synapse',
    title: {
      en: 'Agent Synapse',
      zh: 'Agent Synapse'
    },
    subtitle: {
      en: 'AI Agent Diagnostics Platform',
      zh: 'AI Agent 诊断平台'
    },
    tagline: {
      en: 'Evidence-based quality governance for AI Agents',
      zh: '让 AI Agent 的质量治理从拍脑袋进入有证据时代'
    },
    description: {
      en: CONTENT_AGENT_SYNAPSE,
      zh: CONTENT_AGENT_SYNAPSE_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=premium%20AI%20agent%20observability%20dashboard%20on%20a%20large%20desktop%20screen%2C%20trace%20DAG%20timeline%2C%20health%20score%20cards%2C%20anomaly%20clusters%2C%20LLM%20quality%20review%20panel%2C%20deep%20navy%20and%20soft%20blue%20glassmorphism%2C%20clean%20Apple%20style%20enterprise%20analytics%20interface%2C%20high%20detail%2C%20no%20random%20text&image_size=landscape_16_9',
    launchLink: 'https://kejin-li.github.io/agent_trace_analysis/',
    theme: {
      bg: 'bg-[#DDEBFF]',
      accent: 'text-google-grey-900',
      button: 'bg-google-grey-900 text-white hover:bg-black',
      gradient: 'from-[#DDEBFF] to-[#DDEBFF]'
    },
    techStack: [
      {
        icon: Sparkles,
        title: { en: 'Trace Diagnostics', zh: '执行链路诊断' },
        desc: { en: 'Uses traces, DAG timelines, and key paths to locate session issues', zh: '用 Trace、DAG 时间线和关键路径定位会话问题' }
      },
      {
        icon: Layers,
        title: { en: 'Anomaly Clustering', zh: '异常聚类' },
        desc: { en: 'Groups similar failures for batch governance instead of isolated case review', zh: '把同类失败归堆，从个案排查升级到批量治理' }
      },
      {
        icon: Cpu,
        title: { en: 'AI Review', zh: 'AI 复盘' },
        desc: { en: 'Combines metrics and LLM-as-Judge to produce structured diagnosis reports', zh: '结合指标和 LLM-as-Judge 生成结构化诊断报告' }
      }
    ]
  },
  'figma-tracker': {
    id: 'figma-tracker',
    title: {
      en: 'Figma Trace Capture',
      zh: 'Figma 轨迹采集'
    },
    subtitle: {
      en: 'Design Process Data Pipeline',
      zh: '设计过程数据链路'
    },
    tagline: {
      en: 'Turning design process traces into structured evidence',
      zh: '把 Figma 设计过程沉淀为可复盘的结构化数据'
    },
    description: {
      en: CONTENT_FIGMA_TRACKER,
      zh: CONTENT_FIGMA_TRACKER_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=premium%20realistic%20product%20mockup%20of%20a%20Figma%20design%20page%20on%20a%20desktop%20screen%2C%20large%20recognizable%20Figma%20five%20color%20icon%20floating%20in%20the%20upper%20left%2C%20visible%20design%20canvas%20with%20frames%20and%20UI%20components%2C%20left%20layer%20sidebar%2C%20right%20properties%20panel%2C%20small%20plugin%20panel%20showing%20recording%20timeline%20and%20captured%20events%2C%20soft%20cyan%20background%2C%20clean%20Apple%20style%20glassmorphism%2C%20high%20detail%2C%20no%20random%20text&image_size=landscape_16_9',
    launchLink: 'https://ai59qcdpr4m.feishu.cn/wiki/F0uCwyqppigYOykTJOWcUcIEnGh',
    theme: {
      bg: 'bg-[#DFF3F0]',
      accent: 'text-google-grey-900',
      button: 'bg-google-grey-900 text-white hover:bg-black',
      gradient: 'from-[#DFF3F0] to-[#DFF3F0]'
    },
    techStack: [
      {
        icon: Sparkles,
        title: { en: 'Figma Plugin', zh: 'Figma 插件' },
        desc: { en: 'Captures design events and extracts final frame structure', zh: '记录设计事件，并提取最终画板结构' }
      },
      {
        icon: Layers,
        title: { en: 'Structured Design Data', zh: '结构化设计数据' },
        desc: { en: 'Stores layer trees, styles, text, vectors, images, and previews', zh: '沉淀图层树、样式、文本、矢量、图片和预览图' }
      },
      {
        icon: Cpu,
        title: { en: 'Go Ingestion Service', zh: 'Go 接收服务' },
        desc: { en: 'Handles auth, persistence, preview upload, and query APIs', zh: '负责鉴权、落库、预览图上传与查询接口' }
      }
    ]
  },
  '1': {
    id: '1',
    title: {
      en: 'Tracing Journey',
      zh: '寻迹之旅'
    },
    subtitle: {
      en: 'AI Museum Guide',
      zh: 'AI 博物馆导览'
    },
    tagline: {
      en: 'Making History Come Alive with AI, Not Just a Tour Guide',
      zh: '让文物开口说话，不止是导览，更是一场跨越时空的对话'
    },
    description: {
      en: CONTENT_TRACING_JOURNEY,
      zh: CONTENT_TRACING_JOURNEY_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=minimalist%20ui%20design%20dashboard%20dark%20mode%20lime%20green%20accents%20abstract%20shapes%20clean%20modern%20interface&image_size=landscape_16_9',
    launchLink: 'https://kejin-li.github.io/museum-guide/',
    theme: {
      bg: 'bg-[#D4F976]',
      accent: 'text-black',
      button: 'bg-black text-[#D4F976] hover:bg-gray-800',
      gradient: 'from-[#D4F976] to-white'
    },
    techStack: [
      { 
        icon: Sparkles, 
        title: { en: 'Qwen-Max API', zh: '通义千问大模型' }, 
        desc: { en: 'Large language model reasoning', zh: '大语言模型推理' } 
      },
      { 
        icon: Layers, 
        title: { en: 'Supabase', zh: 'Supabase' }, 
        desc: { en: 'Real-time database & Auth', zh: '实时数据库与认证' } 
      },
      { 
        icon: Cpu, 
        title: { en: 'Amap POI', zh: '高德地图 POI' }, 
        desc: { en: 'Location-based services', zh: '地理位置服务' } 
      }
    ]
  },
  '2': {
    id: '2',
    title: {
      en: 'PM Chest',
      zh: '产品经理百宝箱'
    },
    subtitle: {
      en: 'The Ultimate Toolkit',
      zh: '终极工具包'
    },
    tagline: {
      en: 'No More Stress from Requirements & PRDs',
      zh: '再也不用被需求和 PRD 逼疯'
    },
    description: {
      en: CONTENT_PM_CHEST,
      zh: CONTENT_PM_CHEST_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=chat%20interface%20llm%20ai%20assistant%20pink%20glowing%20accents%20dark%20mode%20glassmorphism%20minimalist&image_size=landscape_16_9',
    launchLink: 'https://github.com/Kejin-LI/pm-chest/',
    theme: {
      bg: 'bg-[#FFD6F4]',
      accent: 'text-google-grey-900',
      button: 'bg-google-grey-900 text-[#FFD6F4] hover:bg-gray-800',
      gradient: 'from-[#FFD6F4] to-white'
    },
    techStack: [
      { 
        icon: Sparkles, 
        title: { en: 'Gemini 3 Pro', zh: 'Gemini 3 Pro' }, 
        desc: { en: 'Core intelligence for skill generation', zh: '生成技能的核心智能引擎' } 
      },
      { 
        icon: Cpu, 
        title: { en: 'Trae IDE Skill', zh: 'Trae IDE 技能' }, 
        desc: { en: 'Seamless execution in Coding IDE', zh: '编程 IDE 中的无缝执行环境' } 
      },
      { 
        icon: Layers, 
        title: { en: 'Github', zh: 'Github' }, 
        desc: { en: 'Skill storage & version control', zh: '技能存储与版本控制' } 
      }
    ]
  },
  '3': {
    id: '3',
    title: {
      en: 'Annotation Platform',
      zh: '专家标注平台'
    },
    subtitle: {
      en: 'Expert Recruitment',
      zh: '专家招募'
    },
    tagline: {
      en: 'Connect AI Teams with Top Domain Experts',
      zh: '连接 AI 团队与顶尖领域专家的桥梁'
    },
    description: {
      en: CONTENT_ANNOTATION,
      zh: CONTENT_ANNOTATION_ZH
    },
    image: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=computer%20vision%20object%20detection%20interface%20bounding%20boxes%20futuristic%20hud%20dark%20mode%20blue%20accents&image_size=landscape_16_9',
    launchLink: 'https://kejin-li.github.io/talent-platform/',
    theme: {
      bg: 'bg-[#E0E7FF]',
      accent: 'text-google-blue',
      button: 'bg-google-blue text-white hover:bg-blue-600',
      gradient: 'from-[#E0E7FF] to-white'
    },
    techStack: [
      { 
        icon: Sparkles, 
        title: { en: 'Matching Engine', zh: '匹配引擎' }, 
        desc: { en: 'Semantic analysis of expertise', zh: '专家能力的语义分析' } 
      },
      { 
        icon: Layers, 
        title: { en: 'Next.js', zh: 'Next.js' }, 
        desc: { en: 'High-performance SSR', zh: '高性能服务端渲染' } 
      },
      { 
        icon: Cpu, 
        title: { en: 'PostgreSQL', zh: 'PostgreSQL' }, 
        desc: { en: 'Complex relational data modeling', zh: '复杂关系型数据建模' } 
      }
    ]
  }
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<any>(null);
  const { scrollY } = useScroll();
  
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const currentLang = i18n.language.startsWith('zh') ? 'zh' : 'en';

  useEffect(() => {
    // In a real app, fetch data here. For now, use mock.
    if (projectId && PROJECT_DETAILS[projectId]) {
      setProject(PROJECT_DETAILS[projectId]);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('projectDetail.notFound')}</h2>
          <Link to="/projects" className="text-blue-600 hover:underline">{t('projectDetail.backToProjects')}</Link>
        </div>
      </div>
    );
  }

  const projectIds = Object.keys(PROJECT_DETAILS);
  const currentProjectIndex = projectIds.indexOf(project.id);
  const nextProjectId = projectIds[(currentProjectIndex + 1) % projectIds.length];
  const nextProject = PROJECT_DETAILS[nextProjectId];

  return (
    <div className="min-h-screen bg-white text-google-grey-900 font-sans selection:bg-black selection:text-white">
      {/* Navigation Bar Placeholder */}
      <div className="fixed top-24 left-6 z-40 md:left-12">
        <Link 
          to="/projects" 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full hover:bg-white transition-all shadow-sm text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('projectDetail.backToProjects')}
        </Link>
      </div>

      {/* Hero Section - Poster Style */}
      <section className={`relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden ${project.theme.bg} transition-colors duration-500 pt-20 pb-20`}>
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-8 px-6 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-sm font-bold tracking-widest uppercase">
              {t('projectDetail.experiment')} {project.id}
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight mb-8 leading-[1.05] uppercase whitespace-nowrap">
              {project.title[currentLang]}
            </h1>
            <p className="text-2xl md:text-4xl font-light opacity-90 max-w-3xl mx-auto mb-12 leading-tight">
              {project.tagline[currentLang]}
            </p>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl mx-auto max-w-5xl"
            >
              <img 
                src={project.image} 
                alt={project.title[currentLang]} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Newsletter Style */}
      <div className="relative z-20 bg-white">
        
        {/* Intro Section */}
        <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed"
          >
            <h2 className="text-5xl md:text-6xl mb-12">{t('projectDetail.story')}</h2>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, children, ...props}) => {
                  const titleText = React.Children.toArray(children).join('');
                  if (titleText.includes('项目介绍') || titleText === project.title[currentLang]) {
                    return null;
                  }

                  return <h1 className="text-4xl font-bold mb-6 mt-10" {...props}>{children}</h1>;
                },
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-5 mt-8" {...props} />,
                h3: ({node, children, ...props}) => {
                  const normalizedChildren = React.Children.map(children, (child) =>
                    typeof child === 'string' ? child.replace(/^\s*\d+[.、]\s*/, '') : child
                  );

                  return <h3 className="text-2xl font-bold mb-4 mt-6" {...props}>{normalizedChildren}</h3>;
                },
                p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                  table: ({node, ...props}) => (
                    <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200">
                      <table className="w-full text-left text-base" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-gray-50 text-google-grey-900" {...props} />,
                  th: ({node, ...props}) => <th className="px-4 py-3 font-bold border-b border-gray-200" {...props} />,
                  td: ({node, ...props}) => <td className="px-4 py-3 border-b border-gray-100 text-gray-600" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6" {...props} />,
              }}
            >
              {project.description[currentLang]}
            </ReactMarkdown>
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t('projectDetail.underTheHood')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.techStack.map((tech: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${project.theme.bg}`}>
                    <tech.icon className={`w-6 h-6 ${project.theme.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tech.title[currentLang]}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {tech.desc[currentLang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-google-grey-50 py-16 md:py-24">
          <CommentSection 
            pageId={`project-${project.id}`} 
            title={t('projectDetail.discussion')}
            description={t('projectDetail.shareThoughts')}
          />
        </section>

        {/* Floating CTA Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full p-2 pl-6 flex items-center justify-between"
          >
            <span className="font-bold text-sm mr-4">{t('projectDetail.readyToTry')}</span>
            <a 
              href={project.launchLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 ${project.theme.button}`}
            >
              {t('projectDetail.tryItNow')} <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Next Project Navigation */}
        <section className={`py-32 ${project.theme.bg} transition-colors duration-500`}>
           <div className="max-w-4xl mx-auto px-6 text-center">
             <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-8">{t('projectDetail.upNext')}</h3>
             <Link 
               to={`/projects/${nextProjectId}`}
               className="group inline-flex flex-col items-center"
               onClick={() => window.scrollTo(0, 0)}
             >
               <span className="text-5xl md:text-8xl font-bold mb-6 group-hover:opacity-70 transition-opacity">
                 {nextProject.title[currentLang]}
               </span>
               <span className="inline-flex items-center gap-3 text-xl font-medium group-hover:gap-6 transition-all">
                 {t('projectDetail.viewExperiment')} <ArrowRight className="w-6 h-6" />
               </span>
             </Link>
           </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectDetailPage;
