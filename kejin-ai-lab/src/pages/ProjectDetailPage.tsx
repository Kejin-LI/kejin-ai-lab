import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CommentSection } from '../components/home/CommentSection';
import { FloatingBubbles } from '../components/home/FloatingBubbles';
import { ArrowLeft, Github, ExternalLink, List, X, ArrowUp } from 'lucide-react';
import { GlitchText } from '../components/common/GlitchText';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const content = {
    en: {
      back: "Back to Home",
      title: id === '1' ? "Annotation Expert Recruitment Platform" : "Tracing Journey: AI Museum Guide",
      tags: id === '1' ? ["Experts", "AI Interview"] : ["AI Native", "Photo Recognition", "Smart Guide"],
      image: id === '1' 
        ? "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements&image_size=landscape_16_9"
        : "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20cute%20explorer%20character%20in%20a%20museum%20using%20an%20ai%20guide%20app%20with%20holographic%20artifacts%20ancient%20vases%20and%20paintings%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9",
      buttons: {
        demo: "Live Demo",
        code: "View Code"
      },
      disclaimer: {
        title: "Demo Notice:",
        text: "This page is for demonstrating core business processes and platform capabilities. Some interactive details, real-time data connections, and settlement features are currently under development and will be refined in future iterations."
      },
      sections: id === '1' ? [
        { id: 'section-1', title: 'I. Platform Positioning' },
        { id: 'section-2', title: 'II. Core Functional Framework' },
        { id: 'section-3', title: 'III. Operation Processes' },
        { id: 'section-4', title: 'IV. Core Highlights' },
        { id: 'section-5', title: 'V. Future Iteration' },
      ] : [],
      body: id === '1' ? (
        <>
          <h2 id="section-1" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">I. Platform Positioning and Core Value</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            This platform demo is built based on AI coding technology, serving as a precise supply-demand matching tool focusing on the AI data training field. Its core value lies in establishing an efficient connection bridge between AI data training/evaluation demanders and top annotation experts in various fields. It accurately addresses the core pain points of algorithm teams and AI product teams in the data processing process, such as "scarcity of high-quality experts and inefficient supply-demand connection", while providing high-educated experts in various fields with flexible and controllable task undertaking channels and compliant and transparent reward acquisition paths.
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            The platform focuses on highly specialized fields including finance, law, healthcare, physics, and mathematics. The recruitment targets are mainly undergraduate, master's, and doctoral graduates from world-renowned universities, ensuring that each annotation expert possesses solid academic foundation and professional literacy. They can accurately tackle high-difficulty and high-precision data training and evaluation tasks, providing highly reliable and accurate data support for the iteration and optimization of AI models.
          </p>

          <h2 id="section-2" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">II. Core Functional Framework</h2>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            With the core design concept of "two-way empowerment for supply and demand", the demo version constructs two core modules: demand submission and connection for demanders, and expert recruitment and task undertaking for suppliers. AI tools are embedded in key links to improve quality and efficiency, forming a complete business closed loop of "demand sorting - expert screening - task connection - reward settlement" (Note: The demo phase only realizes the demonstration of core processes, and the reward settlement module is reserved for subsequent iteration and implementation).
          </p>

          <h2 id="section-3" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">III. Operation Processes</h2>
          <h3 className="text-xl font-bold mb-2 text-macaron-text">(I) Operation Process for Demanders</h3>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Demanders mainly include algorithm teams and AI product teams with data training and evaluation needs. The platform provides standardized demand submission portals and form templates to guide demanders in clearly conveying their needs, ensuring the accuracy and efficiency of supply-demand connection.
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. Demand Sorting and Submission:</strong> Demanders need to clarify core requirements in advance, including key information such as data type, training/evaluation objectives, task cycle, and quality acceptance standards. Meanwhile, they should sort out a clear talent profile, specifying rigid requirements such as the expert's field, educational background, and core skills, and complete information submission through the platform's standardized demand submission portal.
            </li>
            <li>
              <strong>2. Supply-Demand Matching and Connection:</strong> After receiving the demand, the platform quickly screens suitable candidates from the expert database through AI algorithms based on demand keywords and talent profiles, generating a precise matching list for demanders to review. Demanders can select preferred candidates by referring to experts' resumes and qualification certification reports, and confirm task details and reach cooperation intentions through the platform's built-in communication channel.
            </li>
            <li>
              <strong>3. Task Monitoring and Acceptance:</strong> After the task starts, demanders can real-time view the task progress and synchronize experts' work dynamics through the platform, realizing full-process visual management and control. After the task is completed, demanders submit acceptance opinions through the platform to confirm whether the data quality meets the standards, completing the closed-loop management.
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-2 text-macaron-text">(II) Operation Process for Suppliers</h3>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Suppliers are top professionals in various fields. The platform establishes a "multi-level, high-threshold" access mechanism to ensure the compliance of experts' qualifications and the qualification of professional capabilities from the source. It also provides a flexible and independent task undertaking mode, balancing experts' schedule and income needs.
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. Registration and Document Submission:</strong> Experts complete account registration through the platform's registration portal, upload personal resumes as required (core information such as educational background, professional field, research direction, and relevant project experience must be specified), and simultaneously submit supporting materials such as academic certificates and professional qualification certifications to complete basic information entry and document filing.
            </li>
            <li>
              <strong>2. AI Interview and Written Test Assessment:</strong> The platform conducts automated preliminary review on the documents submitted by experts. After passing the preliminary review, experts need to participate in AI online interviews and professional written tests organized by the platform. AI interviews focus on professional cognition, practical operation capabilities, and problem-solving abilities, while written tests focus on core knowledge in the field, data annotation skills, and accuracy control. The dual assessment system ensures that experts' capabilities are highly compatible with task requirements.
            </li>
            <li>
              <strong>3. Qualification Certification and Settlement:</strong> After passing the assessment, the platform completes official qualification certification for experts and includes them in the platform's core expert database. Experts simultaneously unlock task undertaking permissions and can independently browse various data training and evaluation tasks released on the platform.
            </li>
            <li>
              <strong>4. Task Undertaking and Reward Acquisition:</strong> Experts can independently apply for suitable tasks based on their professional fields and schedule, and start work after confirming cooperation details with demanders. After the task is completed and accepted, corresponding rewards can be obtained through the reserved reward settlement channel on the platform (the demo phase only demonstrates the process link, and specific settlement rules and payment methods will be iterated and optimized in subsequent versions).
            </li>
          </ul>

          <h2 id="section-4" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">IV. Core Highlights of the Demo</h2>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. AI-Driven Precise Matching:</strong> Relying on AI algorithms to realize rapid portrait comparison and candidate screening between supply and demand sides, breaking the information barrier of traditional recruitment models, greatly shortening the connection cycle, multiplying the efficiency of supply-demand matching, and reducing the time cost for both parties.
            </li>
            <li>
              <strong>2. High-Threshold Qualification Control:</strong> Constructing a three-layer access barrier of "document review + AI interview + professional written test", focusing on high-educated talents from world-renowned universities, strictly controlling expert quality from the source, ensuring that the team has the ability to cope with high-professional tasks, and laying a solid foundation for high-quality data output.
            </li>
            <li>
              <strong>3. Full-Process Standardized Management and Control:</strong> Providing end-to-end standardized operation processes for both supply and demand sides. From demand submission, expert recruitment to task acceptance and reward settlement, the whole link adopts online closed-loop management, greatly reducing cross-party communication costs and improving process controllability and traceability.
            </li>
            <li>
              <strong>4. In-Depth Coverage of Multiple Fields:</strong> Fully covering highly specialized vertical fields such as finance, law, healthcare, physics, and mathematics, which can accurately match the differentiated data training and evaluation needs of different AI teams, and adapt to various application scenarios such as scientific research and commercial landing.
            </li>
          </ul>

          <h2 id="section-5" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">V. Future Iteration Directions</h2>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            This demo focuses on the demonstration of core functions and business processes. In the future, it will continue to iterate and optimize based on actual usage feedback. The key directions include: first, improving the reward settlement system to support multiple payment methods and detailed reconciliation functions; second, iterating AI interview and written test algorithms to improve assessment accuracy and efficiency; third, adding data security encryption modules to comprehensively protect the information and data security of both supply and demand sides; fourth, expanding more vertical fields, enriching the expert resource pool and task types, and building a more complete supply-demand matching ecosystem for AI data services.
          </p>
        </>
      ) : (
        <>
          <h2 id="section-1" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【Real Talk: What IS this App? (AI Native for Dummies)】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Fam, don't let the words "AI Native" scare you! Simply put, it's not "old wine in a new bottle" or a "fake smart" label slapped on an old app, nor is it a trendy "plugin patch"—it's a badass that treats AI like "water and electricity" from the day it was born!
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            The simplest example: Traditional guide apps are "guide tool first, then AI added reluctantly," like installing a smart keyboard on a dumb phone—awkward and useless. But our AI Native Museum Guide App is "AI first, then guide tool," equivalent to handing you a fully-equipped smartphone. It radiates "smartness" from head to toe. You don't need to figure it out; it knows how you want to visit better than you do! In short, others are "+AI", we are "AI+". The difference is like "manual scrubbing" vs "full-auto SPA". If you know, you know~
          </p>

          <h2 id="section-2" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【Soul Crushing Truth: Museum Pain Points, Are You a Victim?】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Whether you're a 16-year-old student, a 30-year-old worker, or a 50-year-old museum pro, the pain points of visiting museums could fill a book called "The Embarrassing Record of Human Museum Visits". Come and see which one fits you:
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              ❌ <strong>Newbie Pain:</strong> Confused face at artifacts. The audio guide is more hypnotic than chanting. Can't understand terms and can't ask back. After the visit, only remember "this thing is old" and "looks good in photos". Can't answer any questions. Basically "just passing through";
            </li>
            <li>
              ❌ <strong>Worker Pain:</strong> Squeezed out half a day to visit. Dragged down by long-winded explanations. Wanted highlights but got nonsense. Wanted deep dive but found no info. Forgot everything the moment you turned around. Felt like time wasted, should have stayed home scrolling phone;
            </li>
            <li>
              ❌ <strong>Senior Pain:</strong> Too many buttons on the guide, don't know how to adjust. Text too small to read. Wanted to understand but no one explained. Lonely visiting alone, hard to find someone to discuss artifacts with;
            </li>
            <li>
              ❌ <strong>Traveler Pain:</strong> Finally went abroad for an exhibition. Guide only in English or local language. Felt like an outsider the whole time. Watching others enjoy while you wander blindly. Basically "pacing companion";
            </li>
            <li>
              ❌ <strong>Trendsetter Pain:</strong> Photos full of people. Ugly composition, can't post. Wanted a unique check-in photo, gallery full of "tourist shots". Embarrassing enough to dig a three-bedroom apartment with your toes!
            </li>
          </ul>

          <h2 id="section-3" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【Life Saver: Core Features to Max Out Your Experience!】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Don't panic! The AI Native Museum Guide App is here to "prescribe the right medicine". Every feature hits the pain point, humorous and useful. Everyone who uses it praises it:
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              ✅ <strong>Smart Explanation:</strong> Reject "chanting-style" pre-recorded audio! Glance at an artifact, AI comes online instantly. Gossip version for newbies, deep version for pros, plain version for seniors, even dialects! Ask if you don't understand. It's more patient than your private guide. No more struggling with obscure terms;
            </li>
            <li>
              ✅ <strong>Efficient Route:</strong> Savior for workers/students! Input "only 1 hour" or "only want masterpieces", AI generates optimal route instantly. Avoid crowds, don't waste a minute. Basically "precise visiting, efficient knowledge gain";
            </li>
            <li>
              ✅ <strong>God-tier Photos:</strong> Must-have for trendsetters! AI predicts composition, avoids crowds automatically. One-click to shoot museum vibe blockbusters. Can even AI-transform artifacts into Cyberpunk or Cartoon styles. Posting this is god-tier. No more envying others' check-in photos;
            </li>
            <li>
              ✅ <strong>Global Pass:</strong> Travelers don't panic! AI real-time interpretation. No matter which country, understand all explanations in your mother tongue. Break language barriers, visit global museums effortlessly;
            </li>
            <li>
              ✅ <strong>Sweet Companion:</strong> Senior & Introvert Friendly! Full voice control. No complex buttons. "Explain this", "Find rest area", AI responds instantly. Not lonely visiting alone, virtual companion chats throughout. Relieves boredom and confusion;
            </li>
            <li>
              ✅ <strong>Exclusive Souvenir:</strong> Reject useless check-ins! Automatically generate exclusive digital collectibles and knowledge graphs after visiting. Record your footprints. More meaningful than just photos. Can be shown off as a "Museum Badge"~
            </li>
          </ul>

          <h2 id="section-4" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【Bottom Line: Just Use It!】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            To put it bluntly, this is a museum artifact "born of AI, grown by AI". No fancy gimmicks, no perfunctory plugins. Every feature is just to solve your museum visiting troubles!
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            Whether you are a newbie or a senior fan, a student, a worker, or a senior pro, domestic or abroad, with it, visiting museums is no longer difficult, awkward, or a waste of time!
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed font-bold text-macaron-pink">
            Don't hesitate! Click demo now, star it, unlock new visiting postures. Say goodbye to "just passing through" and awkward confusion. Let AI take you to visit global museums easily, turning boring visits into something interesting, informative, and cool✨
          </p>
        </>
      )
    },
    zh: {
      back: "返回首页",
      title: id === '1' ? "标注专家招募平台" : "寻迹之旅：AI文博导览",
      tags: id === '1' ? ["专家库", "AI 面试"] : ["AI Native", "拍照识别", "智能导游"],
      image: id === '1' 
        ? "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements&image_size=landscape_16_9"
        : "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20cute%20explorer%20character%20in%20a%20museum%20using%20an%20ai%20guide%20app%20with%20holographic%20artifacts%20ancient%20vases%20and%20paintings%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9",
      buttons: {
        demo: "在线演示",
        code: "查看代码"
      },
      disclaimer: {
        title: "演示提示：",
        text: "本页面用于演示核心业务流程与平台能力，部分交互细节、实时数据连接及结算功能目前仍在开发中，将在后续迭代中完善。"
      },
      sections: id === '1' ? [
        { id: 'section-1', title: '一、平台定位与核心价值' },
        { id: 'section-2', title: '二、核心功能框架' },
        { id: 'section-3', title: '三、供需双方操作流程' },
        { id: 'section-4', title: '四、Demo核心亮点' },
        { id: 'section-5', title: '五、Demo后续迭代方向' },
      ] : [],
      body: id === '1' ? (
        <>
          <h2 id="section-1" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">一、平台定位与核心价值</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            本平台Demo依托AI编码技术构建，是一款聚焦AI数据训练领域的精准供需匹配工具，核心价值在于搭建AI数据训练/评测需求方与各领域顶尖标注专家的高效对接桥梁，精准解决算法团队、AI产品团队在数据处理环节中“优质专家稀缺、供需对接低效”的核心痛点，同时为各领域高学历专家提供灵活可控的任务承接渠道与合规透明的报酬获取路径。
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            平台聚焦金融、法律、医疗、物理、数理等高度专业化领域，招募对象以世界名校本科、硕士及博士生为核心群体，确保每一位标注专家均具备扎实的学科功底与专业素养，能够精准应对高难度、高精度的数据训练与评测任务，为AI模型的迭代优化提供高可靠性、高精准度的数据支撑。
          </p>

          <h2 id="section-2" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">二、核心功能框架</h2>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            Demo版本以“供需双向赋能”为核心设计理念，构建了需求方提需对接与供应方招募承接两大核心模块，各关键环节嵌入AI工具提质增效，形成“需求梳理-专家筛选-任务对接-报酬结算”的完整业务闭环（注：Demo阶段仅实现核心流程演示，报酬结算模块为功能预留，待后续迭代落地）。
          </p>

          <h2 id="section-3" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">三、供需双方操作流程</h2>
          <h3 className="text-xl font-bold mb-2 text-macaron-text">（一）需求方操作流程</h3>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            需求方主要为有数据训练、评测需求的算法团队及AI产品团队，平台提供标准化提需入口与表单模板，引导需求方清晰传递需求，保障供需对接的精准度与效率。
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. 需求梳理与提交：</strong>需求方需提前明确核心诉求，包括数据类型、训练/评测目标、任务周期、质量验收标准等关键信息；同时梳理清晰的人才画像，明确专家所属领域、学历背景、核心技能等硬性要求，通过平台标准化提需入口完成信息提交。
            </li>
            <li>
              <strong>2. 供需匹配与对接：</strong>平台接收需求后，通过AI面试能力基于需求关键词与人才画像，从专家库中快速筛选适配候选人，生成精准匹配列表供需求方查阅。需求方可结合专家简历、资质认证报告筛选心仪对象，通过平台内置沟通渠道完成任务细节确认与合作意向达成。
            </li>
            <li>
              <strong>3. 任务监控与验收：</strong>任务启动后，需求方可通过平台实时查看任务进度，同步专家工作动态，实现全流程可视化管控；任务完成后，需求方通过平台提交验收意见，确认数据质量是否达标，完成闭环管理。
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-2 text-macaron-text">（二）供应方操作流程</h3>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            供应方为各领域顶尖专业人才，平台建立“多层级、高门槛”准入机制，从源头保障专家资质合规性与专业能力达标，同时提供灵活自主的任务承接模式，兼顾专家时间安排与收益需求。
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. 报名与资料提交：</strong>专家通过平台报名入口完成账号注册，按要求上传个人简历（需明确学历背景、专业领域、研究方向、相关项目经验等核心信息），同步提交学历证书、专业资格认证等佐证材料，完成基础信息录入与资料备案。
            </li>
            <li>
              <strong>2. AI面试与笔试考核：</strong>平台对专家提交的资料进行自动化初步审核，审核通过后，专家需参与平台组织的AI线上面试与专业笔试。AI面试聚焦专业认知、实操能力与问题解决能力，笔试侧重领域内核心知识、数据标注技巧与精准度把控，双重考核体系确保专家能力与任务需求高度适配。
            </li>
            <li>
              <strong>3. 资质认证与入驻：</strong>考核通过后，平台为专家完成官方资质认证，纳入平台核心专家库，专家同步解锁任务承接权限，可自主浏览平台发布的各类数据训练、评测任务。
            </li>
            <li>
              <strong>4. 任务承接与报酬获取：</strong>专家可结合自身专业领域、时间规划，自主报名承接适配任务，与需求方确认合作细节后启动工作。任务完成并通过验收后，可通过平台预留的报酬结算通道获取对应报酬（Demo阶段仅展示流程链路，具体结算规则、支付方式将在后续版本迭代优化）。
            </li>
          </ul>

          <h2 id="section-4" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">四、Demo核心亮点</h2>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              <strong>1. AI驱动精准匹配：</strong>依托AI算法实现供需双方的快速画像比对与候选人筛选，打破传统招募模式的信息壁垒，大幅缩短对接周期，将供需匹配效率提升数倍，降低双方时间成本。
            </li>
            <li>
              <strong>2. 高门槛资质管控：</strong>构建“资料审核+AI面试+专业笔试”三层准入屏障，聚焦世界名校高学历人才群体，从源头严控专家质量，确保团队具备应对高专业度任务的能力，为高质量数据输出筑牢根基。
            </li>
            <li>
              <strong>3. 全流程标准化管控：</strong>为供需双方提供端到端标准化操作流程，从需求提交、专家招募到任务验收、报酬结算，全环节线上化闭环管理，大幅降低跨方沟通成本，提升流程可控性与可追溯性。
            </li>
            <li>
              <strong>4. 多领域深度覆盖：</strong>全面覆盖金融、法律、医疗、物理、数理等高度专业化垂直领域，可精准匹配不同AI团队的差异化数据训练、评测需求，适配科研、商业落地等多类应用场景。
            </li>
          </ul>

          <h2 id="section-5" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">五、Demo后续迭代方向</h2>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            本Demo聚焦核心功能与业务流程演示，后续将结合实际使用反馈持续迭代优化，重点方向包括：一是完善报酬结算系统，支持多元支付方式与明细对账功能；二是迭代AI面试与笔试算法，提升考核精准度与效率；三是增设数据安全加密模块，全方位保障供需双方信息及数据安全；四是拓展更多垂直领域，丰富专家资源池与任务类型，构建更完善的AI数据服务供需匹配生态。
          </p>
        </>
      ) : (
        <>
          <h2 id="section-1" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【先唠实嗑：这APP到底是个啥？（AI Native 小白友好版）】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            家人们，别被“AI Native”这四个字唬住！说白了，它不是那种“旧瓶装新酒”、在老APP上贴个AI标签的“伪智能”，更不是赶时髦的“外挂补丁”——而是从出生那天起，就把AI当“水电煤”的狠角色！
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            举个最通俗的例子：传统导览APP是“先有逛展工具，再勉强加个AI”，就像给老年机装个智能输入法，别扭又不好用；而我们这个AI Native 文博导览APP，是“先有AI，再做逛展工具”，相当于直接给你一部满配智能手机，从头到脚都透着“聪明劲儿”，不用你瞎琢磨，它比你还懂你想怎么逛展！简单说，别人是“+AI”，我们是“AI+”，差别大到像“手动搓澡”和“全自动SPA”，懂的都懂～
          </p>

          <h2 id="section-2" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【扎心暴击：逛展的那些破事儿，你是不是也中枪了？】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            不管你是16岁的学生党、30岁的打工人，还是50岁的逛展达人，逛博物馆的痛点，简直能凑成一本《人类逛展尴尬实录》，快来对号入座：
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              ❌ <strong>小白痛点：</strong>面对文物一脸懵，讲解器念得比念经还催眠，术语听不懂还没法追问，逛完只记得“这东西挺老”“拍照挺好看”，问啥都答不上来，主打一个“走马观花凑数”；
            </li>
            <li>
              ❌ <strong>打工人痛点：</strong>挤破头抽半天时间逛展，被冗长讲解拖慢节奏，想快速看重点却被迫听废话，想深入了解又找不到资料，逛完转头就忘，感觉时间全白费，还不如在家刷手机；
            </li>
            <li>
              ❌ <strong>中老年痛点：</strong>讲解器按钮多到眼花，怎么调都不会用；说明文字太小看不清，想听个明白却没人讲；一个人逛展孤单到抠墙，想找个伴讨论文物都难；
            </li>
            <li>
              ❌ <strong>出国党痛点：</strong>好不容易出国看个展，讲解器只有英文或本地语，全程像个局外人，看着别人听得津津有味，自己只能瞎逛，主打一个“陪跑式看展”；
            </li>
            <li>
              ❌ <strong>潮人痛点：</strong>逛展拍照全是人从众，构图丑到没法发圈，想整个有特色的打卡图，翻遍相册全是“游客照”，尴尬到抠出三室一厅！
            </li>
          </ul>

          <h2 id="section-3" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【救命神器：这APP的核心功能，直接把逛展体验拉满！】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            别慌！AI Native 文博导览APP，就是来给你“对症下药”的，每一个功能都踩在痛点上，幽默又好用，谁用谁夸：
          </p>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              ✅ <strong>智能讲解：</strong>拒绝“念经式”预制音频！扫一眼文物，AI立马上线，小白版讲八卦、达人版讲深度、中老年版讲通俗，方言也能安排，听不懂就追问，它比你的专属讲解员还耐心，再也不用硬扛晦涩术语；
            </li>
            <li>
              ✅ <strong>高效路线：</strong>打工人/学生党福音！输入“只有1小时”“只想看镇馆之宝”，AI立马生成最优路线，避开人流高峰，不浪费你每分钟，主打一个“精准逛展，高效涨知识”；
            </li>
            <li>
              ✅ <strong>拍照封神：</strong>潮人必冲！AI实时预判构图、自动避开人群，一键拍出博物馆氛围感大片，看完还能让AI把文物改成赛博朋克、卡通画风，发圈直接封神，再也不用羡慕别人的打卡图；
            </li>
            <li>
              ✅ <strong>全球通吃：</strong>出国党再也不用慌！AI实时同传，不管你在哪个国家，用母语就能听懂所有讲解，打破语言壁垒，逛遍全球博物馆都不费劲；
            </li>
            <li>
              ✅ <strong>贴心陪伴：</strong>中老年友好+社恐友好！全程语音操控，不用点复杂按钮，“讲解这件文物”“找休息区”，AI一呼即应；一个人逛展不孤单，虚拟陪逛搭子全程陪聊，解闷又解惑；
            </li>
            <li>
              ✅ <strong>专属纪念：</strong>拒绝无效打卡！逛完自动生成专属数字藏品、知识图谱，记录你的逛展足迹，比单纯拍照有意义多了，还能当成“逛展勋章”炫耀～
            </li>
          </ul>

          <h2 id="section-4" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">【总结唠句：不管你是谁，逛展有它就够了！】</h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            说白了，这就是一个“生于AI、长于AI”的逛展神器，不搞花里胡哨的噱头，不做敷衍了事的外挂，每一个功能都只为解决你逛展的糟心事！
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            不管你是文博小白还是资深爱好者，不管你是学生党、打工人还是中老年逛展达人，不管你在国内还是国外，有了它，逛展再也不用犯难、不用尴尬、不用浪费时间！
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed font-bold text-macaron-pink">
             别犹豫了！现在点击demo，点亮star，解锁逛展新姿势，告别走马观花、告别尴尬懵懂，让AI带你轻松逛遍全球博物馆，把枯燥逛展变成一件有趣、有料、有面子的事儿✨
           </p>
        </>
      )
    }
  };

  // Determine content based on id
  // If id matches a known project, use the predefined content.
  // If not (e.g., 'thought-1'), we can add logic for thoughts or default to a generic view.
  let activeContent = content[language];
  
  // Custom logic for Thought details (id="thought-1")
  if (id === 'thought-1') {
    activeContent = {
      ...activeContent,
      title: language === 'zh' ? 'AI 爆改产品经理工作流程' : 'The Future of AI Product Management',
      tags: language === 'zh' ? ['AI', '产品管理'] : ['AI', 'Product Management'],
      image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20futuristic%20product%20management%20workflow%20with%20ai%20assistants%20holographic%20interfaces%20and%20team%20collaboration%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20tech%20elements&image_size=landscape_16_9",
      body: (
        <>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh' 
              ? '作为一枚天天和算法、AI产品团队“死磕”的数据标注平台产品经理，以前总觉得自己是“夹心饼干+工具人”——既要懂数据需求（评测/训练都得顾），又要抠标注工艺和流程，还得帮运营同学画人员招募画像，忙到下班连周报都得挤时间凑字数🤯。直到AI彻底融入工作，我才发现：原来产品经理的流程，真能被AI重构出“开挂体验”！'
              : 'As a product manager at an AI data annotation platform who’s always locking horns with algorithm and AI product teams, I used to feel like a "sandwich cookie + tool person" – I had to understand data requirements (both evaluation and training), refine annotation processes and workflows, and even help ops colleagues define talent recruitment profiles. I was so swamped that I barely squeezed in time to write weekly reports after work🤯. It wasn’t until AI fully integrated into my work that I realized: AI can truly reshape a product manager’s workflow into a "cheat code experience"!'}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? (
                <>
                  先聊聊最直观的改变——<strong>周报从“痛苦文学”变“高效总结”</strong> 📝。以前写周报，得翻遍聊天记录、文档、项目进度表，绞尽脑汁把“对接算法团队确认数据评测需求”“优化3类标注工艺模板”“输出2版专家招募画像”这些事串得有条理，还要显得有思考、有推进。现在直接甩给AI我的日常工作碎片：“今天和算法同学对齐了训练数据的标注精度要求，调整了专家出题的边界范围，给运营发了医学领域标注专家的招募画像”，再补一句“按产品经理周报风格，简洁有重点，突出推进和成果”，1分钟就能生成初稿，我只需要微调细节、补充数据，再也不用熬到深夜凑字数了。
                </>
              )
              : (
                <>
                  Let’s start with the most obvious change – <strong>weekly reports go from "painful prose" to "efficient summaries"</strong> 📝. Previously, writing a weekly report meant digging through chat logs, documents, and project trackers, racking my brain to coherently present tasks like "aligning data evaluation requirements with the algorithm team", "optimizing 3 types of annotation process templates", and "delivering 2 versions of expert recruitment profiles" – all while making it look thoughtful and progressive. Now, I just dump my daily work snippets to AI: "Today, I aligned the annotation accuracy requirements for training data with the algorithm team, adjusted the boundary scope for experts to design questions, and sent the recruitment profile for medical field annotation experts to ops." Add a note: "In product manager weekly report style – concise, focused, highlighting progress and outcomes" – and a first draft is ready in 1 minute. I just fine-tune details and add data, no more staying up late to pad words.
                </>
              )}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '而最核心的标注工艺设计，AI直接帮我把“重复劳动”砍半⚙️。我们做标注工艺，不光要设计流程，还得出详细模板——比如要求专家出题探索模型边界，得明确出题维度、难度梯度；要求写考点rubrics，更是要精准到评判标准、扣分逻辑，以前每类数据（文本、图像、语音）都得从头搭模板，和算法团队反复核对调整，一套模板下来半天就没了。'
              : 'For the core task of annotation process design, AI cuts "repetitive work" in half⚙️. Designing annotation processes isn’t just about mapping workflows; we also need detailed templates – for example, when asking experts to design questions to explore model boundaries, we must clarify question dimensions and difficulty gradients; for writing assessment rubrics, we need to be precise down to evaluation criteria and deduction logic. Once, I had to build templates from scratch for each data type (text, image, audio), cross-checking and revising repeatedly with the algorithm team – a single template took half a day.'}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '现在我只需要给AI下达核心指令：“帮我做一份医学文本标注的工艺模板，要求专家出题覆盖模型对病症描述、用药建议的识别边界，rubrics要细化到表述准确性、逻辑完整性的评分标准，适配外部专家标注场景”，AI会快速生成框架，我再结合算法团队的具体需求（比如模型对罕见病标注的特殊要求）和过往经验微调，原本半天的活，1小时就能搞定，还能避免遗漏关键考点✨。'
              : 'Now, I just give AI clear core instructions: "Help me create a medical text annotation process template. Experts should design questions covering the model’s boundaries in disease description and medication advice. Rubrics need to detail scoring standards for expression accuracy and logical completeness, adapted for external expert annotation scenarios." AI quickly generates a framework, and I tweak it based on the algorithm team’s specific needs (such as the model’s special requirements for rare disease annotation) and my past experience. What used to take half a day now gets done in an hour, with no key assessment points missed✨.'}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '就连对接运营的人员招募画像，AI也成了我的“脑暴搭子”🧑💼。以前确定招募画像，得先梳理数据需求（比如是做高精度医疗数据标注，还是通用文本标注），再倒推专家的专业背景、从业年限、技能要求，还要考虑供应商和外部机构的招募可行性，经常要反复修改好几版。现在我把数据需求告诉AI：“需要招募一批做肿瘤医学影像标注的专家，用于模型训练数据标注，要求能精准识别病灶位置、区分病理类型，对接外部机构招募”，AI会快速生成初版画像，我再补充细节（比如需具备3年以上临床影像相关经验、熟悉标注工具操作），大大缩短了画像确定的周期，也让运营同学的招募工作更精准高效。'
              : 'Even for defining recruitment profiles with ops, AI acts as my "brainstorming buddy"🧑💼. Before, finalizing a recruitment profile meant first sorting out data requirements (e.g., high-precision medical data annotation vs. general text annotation), then working backwards to define experts’ professional backgrounds, years of experience, and skill requirements – while considering recruitment feasibility via suppliers and external organizations. It often took multiple revisions. Now, I tell AI the data needs: "Recruit experts for tumor medical image annotation, for model training data. They must accurately identify lesion locations and distinguish pathological types; recruitment via external organizations." AI generates a first draft, and I add details (such as 3+ years of clinical imaging experience and proficiency in annotation tools), drastically shortening the profile finalization cycle and making ops recruitment more targeted and efficient.'}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '其实AI重构的不只是工作流程，更是产品经理的核心价值——把我们从重复、繁琐的事务中解放出来，有更多时间去深入理解算法需求、优化标注逻辑、协调跨团队资源，真正聚焦于“解决问题”和“创造价值”🤔。以前总担心AI会替代岗位，现在发现，学会和AI协作，才能成为更高效、更核心的产品人。'
              : 'In fact, AI reshapes not just work processes, but the core value of a product manager – freeing us from repetitive, tedious tasks so we have more time to deeply understand algorithm requirements, optimize annotation logic, coordinate cross-team resources, and truly focus on "solving problems" and "creating value"🤔. I used to worry AI would replace my role, but now I realize: learning to collaborate with AI is the key to becoming a more efficient, irreplaceable product professional.'}
          </p>
          <p className="text-macaron-textLight text-sm italic mt-8 border-t border-macaron-text/10 pt-4">
            {language === 'zh'
              ? '#AI重构工作流程 #产品经理日常 #AI数据标注 #职场效率神器 #产品经理与AI协作'
              : '#AIOverhaulsWorkflow #ProductManagerDaily #AIDataAnnotation #WorkplaceProductivityTools #PMandAICollaboration'}
          </p>
        </>
      ),
      sections: [], // Thoughts might not need the same sections navigation
      buttons: { demo: "", code: "" }, // Thoughts might not have demo/code buttons
      disclaimer: undefined // No disclaimer for thoughts
    };
  }

  // Custom logic for Thought details (id="thought-2")
  if (id === 'thought-2') {
    activeContent = {
      ...activeContent,
      title: language === 'zh' 
        ? 'AI产品经理狂喜✨24小时从脑暴到MVP，我靠AI工具组了个“虚拟团队”' 
        : 'AI Product Manager’s Delight ✨ Turning Idea into MVP in 24 Hours with My AI "Virtual Team"',
      tags: language === 'zh' 
        ? ['AI产品经理', 'MVP落地指南', 'AI工具实战', '个人网站搭建', 'Prompt工程'] 
        : ['AIProductManager', 'MVPLaunchGuide', 'AIToolPractices', 'PersonalWebsiteBuilding', 'PromptEngineering'],
      image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20an%20ai%20product%20manager%20working%20with%20cute%20robot%20assistants%20as%20a%20virtual%20team%20analyzing%20data%20and%20prototypes%20on%20holographic%20screens%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9",
      body: (
        <>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh' 
              ? '家人们谁懂啊！作为每天被周报、原型、AI资讯榨干的AI产品经理，某天凌晨摸鱼时突然顿悟：我天天玩AI，为啥不用AI给自己搭个“生产力外挂”？💡 于是干脆开卷，挑战24小时把“AI自动整理周报+定时提醒总结”的想法，落地成个人网站上的可演示demo——过程像开了倍速挂，爽到飞起，也踩了些小坑，整理成笔记给同频PM们抄作业！'
              : 'Who feels me, fellow PMs? As an AI product manager drained daily by weekly reports, prototypes, and AI news roundups, I had a late-night epiphany while slacking off: I play with AI every day—why not build an "productivity plug-in" for myself with AI? 💡 So I decided to go all in, challenging myself to turn the idea of "AI auto-organizing weekly reports + scheduled summary reminders" into a demo on my personal website in 24 hours. The process was like hitting fast-forward, thrilling yet full of small pitfalls. I’ve compiled this note for like-minded PMs to copy!'}
          </p>

          <h2 id="section-1" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">
            {language === 'zh' ? '🌅 0-4小时：痛点催生灵感，把模糊想法锤实' : '🌅 Hours 0-4: Pain Points Spark Ideas, Refining Vagueness into Clarity'}
          </h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '一切始于上周三的崩溃瞬间：下班前被领导催周报，翻遍聊天记录和工作文档拼凑内容，格式还得反复调；想发每周AI新闻合集，又忘了存本周的行业动态。那一刻脑子里只有一个念头：必须让AI帮我搞定这些“重复劳动”！🤯'
              : 'It all started with a breakdown last Wednesday: pressed by my boss for a weekly report before off work, I scrambled through chat records and documents to piece it together, tweaking the format repeatedly. I wanted to post a weekly AI news collection but forgot to save the industry updates. At that moment, one thought popped into my head: AI must take over these "repetitive tasks"! 🤯'}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '没有长篇大论的需求文档，先把痛点列成3个核心目标：能定时提醒总结、按我的固定格式生成周报、同步抓取每周AI热点。接着拉上豆包当“陪聊脑暴搭子”，抛出想法后疯狂追问：“这个提醒逻辑会不会打扰工作？”“周报模板怎么让AI精准识别？” 豆包总能补全我忽略的细节，比如“可以联动日历设置弹性提醒时间”。'
              : 'No lengthy requirement documents—first, I listed 3 core goals based on the pain points: scheduled summary reminders, weekly reports generated in my fixed format, and real-time AI hot topic scraping. Then I roped in Doubao as my "brainstorming buddy," firing off questions after sharing the idea: "Will this reminder logic disrupt work?" "How to make AI accurately recognize my weekly report template?" Doubao always filled in the details I missed, like "Link with calendar for flexible reminder times."'}
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            {language === 'zh'
              ? (
                <>
                  重点夸下字节内部的<strong>初见</strong> Coding Agent！作为懂代码的“技术搭子”，我直接甩给它：“帮我梳理这个需求的技术可行性，有没有低成本落地方案？” 它秒回核心思路：用轻量化接口实现提醒功能，周报生成靠Prompt精准度，热点抓取调用公开资讯API——瞬间把模糊想法变成了可落地的方向，省去我跟技术掰扯的时间。
                </>
              )
              : (
                <>
                  A big shoutout to ByteDance’s internal <strong>Chujian</strong> Coding Agent! As a code-savvy "tech buddy," I directly tossed it: "Help me analyze the technical feasibility of this requirement—any low-cost implementation plans?" It instantly replied with core ideas: lightweight APIs for reminders, Prompt accuracy for weekly report generation, and public news APIs for hot topic scraping. It turned vague ideas into actionable directions in seconds, saving me the hassle of negotiating with developers.
                </>
              )}
          </p>

          <h2 id="section-2" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">
            {language === 'zh' ? '🌞 4-10小时：Prompt优化是关键，把“想法”翻译成“AI能懂的语言”' : '🌞 Hours 4-10: Prompt Optimization is Key—Translating "Ideas" into "AI-Understandable Language"'}
          </h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? (
                <>
                  以前总觉得“AI不好用”，后来发现90%是Prompt没写对。这一步我直奔<strong>Prompt Pilot</strong>，把最初的粗糙指令“帮我写周报”迭代成结构化Prompt：“你是我的专属周报助手，需根据我提供的工作片段，按以下格式生成周报（模板附后），要求语言简洁、数据突出，不编造内容，若信息不全先提示补充”。📝
                </>
              )
              : (
                <>
                  I used to think "AI is useless," but later realized 90% of the issue was poorly written Prompts. For this step, I headed straight to <strong>Prompt Pilot</strong>, iterating the rough initial instruction "Help me write a weekly report" into a structured Prompt: "You’re my dedicated weekly report assistant. Based on the work snippets I provide, generate a report in the following format (template attached). Keep it concise, data-focused, no fabrications—prompt for missing info if incomplete." 📝
                </>
              )}
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            {language === 'zh'
              ? '在平台上反复调试了十几轮，重点优化两个点：一是明确“禁止编造”，避免AI瞎编工作内容；二是附上我的真实周报模板，让AI对齐格式习惯。调试后生成的内容准确率直接从60%拉满到90%，省去大量修改时间——这步千万别省，好Prompt堪比“AI指挥官”，能让后续开发少走弯路。'
              : 'I tested and adjusted it over a dozen times on the platform, focusing on two optimizations: first, explicitly banning fabrications to prevent AI from making up work content; second, attaching my real weekly report template to align AI with my formatting habits. After tweaks, content accuracy jumped from 60% to 90%, cutting down massive revision time. Don’t skip this step—a good Prompt is like an "AI commander," smoothing the subsequent development process.'}
          </p>

          <h2 id="section-3" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">
            {language === 'zh' ? '🌆 10-20小时：AI代笔PRD+写代码，我当“甩手掌柜”盯进度' : '🌆 Hours 10-20: AI Writes PRD + Code, I Play the "Hands-Off Manager" Tracking Progress'}
          </h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? (
                <>
                  优化完Prompt，直接把需求、结构化指令和技术思路丢给<strong>Trae</strong>。谁懂啊！它不仅1小时内生成了逻辑清晰的PRD，还标注了核心功能优先级，甚至主动问我“是否需要简化交互原型，优先保证核心功能落地”。🤖
                </>
              )
              : (
                <>
                  With the Prompt optimized, I dumped the requirements, structured instructions, and technical ideas to <strong>Trae</strong>. Who knew? It generated a logically sound PRD in an hour, marked core feature priorities, and even proactively asked: "Do you want to simplify the interaction prototype to prioritize core functions?" 🤖
                </>
              )}
          </p>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '接下来就是见证奇迹的时刻：Trae同步开启代码编写，从前端交互（提醒弹窗、周报生成页）到后端逻辑（数据存储、API调用）全搞定，中途还会同步进度：“热点抓取接口已调试完成，可支持自定义关键词筛选”。我只需要偶尔确认下交互效果，比如“提醒弹窗能不能做成悬浮式，不遮挡工作页面”，全程不用碰一行代码，主打一个“产品主导，AI执行”。'
              : 'Then came the magic: Trae started coding simultaneously, handling everything from front-end interactions (reminder pop-ups, weekly report generation pages) to back-end logic (data storage, API calls). It updated progress midway: "Hot topic scraping API tested—supports custom keyword filtering." I only needed to occasionally confirm interaction effects, like "Can the reminder pop-up be floating to avoid blocking work pages?" No code written by me—purely "product-led, AI-executed."'}
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            {language === 'zh'
              ? '这里插个优化建议：可以让Trae把代码同步到GitHub后，开启自动部署功能，省去手动上传部署的步骤，我当时忘了开，多花了半小时折腾，血的教训！'
              : 'A quick optimization tip here: Let Trae enable auto-deployment after syncing code to GitHub, eliminating manual uploads. I forgot this and wasted half an hour—lesson learned the hard way!'}
          </p>

          <h2 id="section-4" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">
            {language === 'zh' ? '🌙 20-24小时：用户测试+快速迭代，MVP不是终点是起点' : '🌙 Hours 20-24: User Testing + Rapid Iteration—MVP is a Starting Line, Not a Finish Line'}
          </h2>
          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '凌晨2点，第一个版本的demo终于上线！我立马把链接甩给3类用户：同组PM（懂需求）、技术同事（看稳定性）、非互联网朋友（测易用性）。反馈来得又快又准：PM说“周报模板可以加自定义字段”，技术指出“热点抓取偶尔卡顿，需加加载提示”，朋友吐槽“提醒时间太固定，能不能设置避开会议时段”。📊'
              : 'At 2 AM, the first demo went live! I immediately sent the link to 3 user groups: fellow PMs (demand understanding), dev colleagues (stability check), and non-Internet friends (usability test). Feedback rolled in fast and precise: PMs suggested "adding custom fields to the weekly report template," devs pointed out "occasional lag in hot topic scraping—need loading animations," and friends complained "fixed reminder times—can we avoid meeting slots?" 📊'}
          </p>
          <p className="text-macaron-textLight mb-8 leading-relaxed">
            {language === 'zh'
              ? '根据反馈，我用最后2小时让Trae快速迭代：添加自定义字段功能、补充加载动画、优化提醒规则（联动日历避开忙时）。凌晨4点，最终版MVP稳稳挂在我的个人网站上，既能展示AI coding能力，又能实打实解决自己的工作痛点——这种“从0到1”的成就感，比发10篇周报还爽！'
              : 'Based on feedback, I had Trae iterate quickly in the final 2 hours: adding custom fields, supplementing loading animations, and optimizing reminder rules (linking with calendar to avoid busy times). By 4 AM, the final MVP was securely hosted on my personal website—it not only showcases my AI coding skills but also solves real work pain points. That "from 0 to 1" sense of achievement beats writing 10 weekly reports!'}
          </p>

          <h2 id="section-5" className="text-2xl font-bold mb-4 text-macaron-text scroll-mt-32">
            {language === 'zh' ? '💡 流程优化小技巧（亲测有效）' : '💡 Proven Process Optimization Tips'}
          </h2>
          <ul className="list-none space-y-4 text-macaron-textLight mb-8">
            <li>
              {language === 'zh'
                ? '1. 想法阶段：同时拉“产品搭子”（豆包）和“技术搭子”（初见）脑暴，避免想出来的需求技术不可行，节省来回拉扯时间。'
                : '1. Idea Phase: Brainstorm with both a "product buddy" (Doubao) and a "tech buddy" (Chujian) to avoid technically unfeasible requirements and save back-and-forth time.'}
            </li>
            <li>
              {language === 'zh'
                ? '2. Prompt阶段：把常用模板整理成“Prompt标准库”（像管理代码一样管理Prompt），后续复用直接调，效率翻倍。'
                : '2. Prompt Phase: Organize frequently used templates into a "Prompt Library" (manage Prompts like code) for quick reuse—doubling efficiency.'}
            </li>
            <li>
              {language === 'zh'
                ? '3. 开发阶段：让Trae优先做“核心功能+极简交互”，MVP不用追求完美，先上线验证需求，再根据反馈迭代。'
                : '3. Development Phase: Ask Trae to prioritize "core functions + minimal interactions." MVPs don’t need perfection—launch first to validate demand, then iterate based on feedback.'}
            </li>
            <li>
              {language === 'zh'
                ? '4. 测试阶段：找不同角色用户测试，尤其是非专业用户，能发现你忽略的易用性问题。'
                : '4. Testing Phase: Involve users of different roles, especially non-professionals—they’ll spot usability issues you miss.'}
            </li>
          </ul>

          <p className="text-macaron-textLight mb-4 leading-relaxed">
            {language === 'zh'
              ? '现在我的个人网站堆了几个这类AI demo，既是工作成果沉淀，也是与同行交流时的“硬通货”。作为AI产品经理，我们不用精通代码，但要学会“指挥AI干活”，把工具用透，就能实现“一人即团队”的高效落地。🚀'
              : 'Now my personal website has several such AI demos—they’re not just work achievement records, but also "hard currency" for communicating with peers. As AI product managers, we don’t need to master coding, but we must learn to "direct AI to work." Mastering these tools lets us achieve efficient "one-person team" execution. 🚀'}
          </p>
          <p className="text-macaron-textLight text-sm italic mt-8 border-t border-macaron-text/10 pt-4">
            {language === 'zh'
              ? '#AI产品经理 #MVP落地指南 #AI工具实战 #个人网站搭建 #Prompt工程'
              : '#AIProductManager #MVPLaunchGuide #AIToolPractices #PersonalWebsiteBuilding #PromptEngineering'}
          </p>
        </>
      ),
      sections: language === 'zh' ? [
        { id: 'section-1', title: '0-4小时：灵感诞生' },
        { id: 'section-2', title: '4-10小时：Prompt优化' },
        { id: 'section-3', title: '10-20小时：AI代笔开发' },
        { id: 'section-4', title: '20-24小时：测试迭代' },
        { id: 'section-5', title: '流程优化技巧' },
      ] : [
        { id: 'section-1', title: 'Hours 0-4: Idea Generation' },
        { id: 'section-2', title: 'Hours 4-10: Prompt Opt' },
        { id: 'section-3', title: 'Hours 10-20: AI Dev' },
        { id: 'section-4', title: 'Hours 20-24: Testing' },
        { id: 'section-5', title: 'Optimization Tips' },
      ], 
      buttons: { demo: "", code: "" }, 
      disclaimer: undefined 
    };
  }

  const currentContent = activeContent;
  const sections = currentContent.sections || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsNavOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // In a real app, fetch project details using id
  // For now, static placeholder
  
  return (
    <div className="min-h-screen">
      {/* Fixed Trae-style Big Text Footer (Fixed at bottom, visible when content scrolls away) */}
      <div className="fixed bottom-0 left-0 w-full h-[240px] bg-gradient-to-r from-macaron-pink via-macaron-purple to-macaron-blue flex items-center justify-center overflow-hidden z-0">
        <FloatingBubbles idPrefix="footer-bubbles" count={3} minRadius={50} maxRadius={80} speed={0.8} />
        <GlitchText text="Kejin AI Lab" />
      </div>

      {/* Main Content Wrapper (Scrolls over the fixed footer) */}
      <div className="relative z-10 mb-[240px] bg-macaron-cream min-h-screen">
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-macaron-purple/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-slow" />
          <div className="absolute top-[20%] right-[15%] w-96 h-96 bg-macaron-yellow/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-medium" />
          <div className="absolute -bottom-[10%] left-[30%] w-96 h-96 bg-macaron-pink/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-fast" />
        </div>

        {/* Floating Bubbles Background */}
        <FloatingBubbles 
          idPrefix="detail-main-bubbles" 
          count={8} 
          minRadius={100} 
          maxRadius={180} 
          speed={0.6} 
          enableMouseInteraction={false}
          variant="rainbow"
        />

        {/* Wave Animation */}
        <Header />
        <main className="container mx-auto px-4 pt-24 lg:pt-32 pb-12 lg:pb-20 relative flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <Link to="/" className="inline-flex items-center gap-2 text-macaron-textLight hover:text-macaron-pinkHover mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {currentContent.back}
            </Link>
            
            <div className={`${sections.length > 0 ? 'max-w-4xl' : 'max-w-5xl'} mx-auto`}>
              <div className="aspect-video rounded-3xl overflow-hidden mb-12 bg-white border border-white/60 shadow-lg relative group">
                 <img 
                  src={currentContent.image}
                  alt="Project Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-macaron-text">{currentContent.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {currentContent.tags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    index % 2 === 0 
                    ? 'bg-macaron-pink/20 text-macaron-text border-macaron-pink' 
                    : 'bg-macaron-blue/20 text-macaron-text border-macaron-blue'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>

              {currentContent.buttons.demo && (
                <div className="flex flex-wrap gap-4 mb-8">
                  <a 
                    href={id === '2' ? "https://kejin-li.github.io/museum-guide/" : "https://kejin-li.github.io/talent-platform/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-macaron-text text-white rounded-full font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {currentContent.buttons.demo}
                  </a>
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white text-macaron-text border border-macaron-text/10 rounded-full font-medium hover:bg-macaron-blue/10 hover:text-macaron-blue hover:border-macaron-blue transition-all shadow-sm">
                    <Github className="w-4 h-4" />
                    {currentContent.buttons.code}
                  </a>
                </div>
              )}

              {/* Disclaimer Banner - Only show for projects, not thoughts */}
              {currentContent.disclaimer && (
                <div className="mb-12 p-4 bg-macaron-blue/10 border border-macaron-blue/30 rounded-2xl flex gap-3 items-start">
                  <span className="text-xl">🚧</span>
                  <p className="text-sm text-macaron-textLight leading-relaxed">
                    <span className="font-bold text-macaron-text">{currentContent.disclaimer.title}</span> {currentContent.disclaimer.text}
                  </p>
                </div>
              )}
              
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-sm mb-12">
                {currentContent.body}
              </div>
  
              {/* Project-specific Comments Section */}
              <CommentSection pageId={`project_${id}`} />
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
          {sections.length > 0 && (
            <div className="hidden lg:block w-64 sticky top-32 shrink-0 relative z-10">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-macaron-blue/10 text-macaron-blue font-medium translate-x-1'
                          : 'text-macaron-textLight hover:text-macaron-text hover:bg-white/50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 lg:bottom-8 right-6 lg:right-8 z-50 p-4 bg-macaron-text text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 flex items-center justify-center"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>

          {/* Mobile Navigation Toggle */}
          {sections.length > 0 && (
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="p-4 bg-macaron-text text-white rounded-full shadow-lg hover:bg-macaron-text/90 transition-colors"
              >
                {isNavOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
              </button>
            </div>
          )}

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="lg:hidden fixed bottom-24 right-6 w-64 bg-white rounded-2xl shadow-xl border border-macaron-text/10 p-4 z-50 origin-bottom-right"
              >
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-macaron-blue/10 text-macaron-blue font-medium'
                          : 'text-macaron-textLight hover:text-macaron-text hover:bg-macaron-text/5'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
