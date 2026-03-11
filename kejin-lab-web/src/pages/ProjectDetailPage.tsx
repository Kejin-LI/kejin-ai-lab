import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
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

// Mock Data for Detail Page
const PROJECT_DETAILS: Record<string, any> = {
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
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] uppercase break-words">
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
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 mt-10" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-5 mt-8" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
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
            title="Discussion" 
            description="Share your thoughts on this project."
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
               to={`/projects/${(parseInt(project.id) % 3) + 1}`} 
               className="group inline-flex flex-col items-center"
               onClick={() => window.scrollTo(0, 0)}
             >
               <span className="text-5xl md:text-8xl font-bold mb-6 group-hover:opacity-70 transition-opacity">
                 {PROJECT_DETAILS[String((parseInt(project.id) % 3) + 1)].title[currentLang]}
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
