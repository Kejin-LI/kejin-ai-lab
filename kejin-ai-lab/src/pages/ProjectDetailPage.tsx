import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CommentSection } from '../components/home/CommentSection';
import { FloatingBubbles } from '../components/home/FloatingBubbles';
import { ArrowLeft, Github, ExternalLink, List, X, ArrowUp } from 'lucide-react';
import { GlitchText } from '../components/common/GlitchText';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const sections = [
    { id: 'section-1', title: 'I. Platform Positioning' },
    { id: 'section-2', title: 'II. Core Functional Framework' },
    { id: 'section-3', title: 'III. Operation Processes' },
    { id: 'section-4', title: 'IV. Core Highlights' },
    { id: 'section-5', title: 'V. Future Iteration' },
  ];

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
  }, []);

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
        <main className="container mx-auto px-4 pt-32 pb-20 relative flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <Link to="/" className="inline-flex items-center gap-2 text-macaron-textLight hover:text-macaron-pinkHover mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-3xl overflow-hidden mb-12 bg-white border border-white/60 shadow-lg relative group">
                 <img 
                  src={`https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements&image_size=landscape_16_9`}
                  alt="Project Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-macaron-text">Annotation Expert Recruitment Platform</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 text-xs font-medium rounded-full border bg-macaron-pink/20 text-macaron-text border-macaron-pink">Experts</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full border bg-macaron-blue/20 text-macaron-text border-macaron-blue">AI Interview</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="https://kejin-li.github.io/talent-platform/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-macaron-text text-white rounded-full font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white text-macaron-text border border-macaron-text/10 rounded-full font-medium hover:bg-macaron-blue/10 hover:text-macaron-blue hover:border-macaron-blue transition-all shadow-sm">
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </div>

              {/* Disclaimer Banner */}
              <div className="mb-12 p-4 bg-macaron-blue/10 border border-macaron-blue/30 rounded-2xl flex gap-3 items-start">
                <span className="text-xl">🚧</span>
                <p className="text-sm text-macaron-textLight leading-relaxed">
                  <span className="font-bold text-macaron-text">Demo Notice:</span> This page is for demonstrating core business processes and platform capabilities. Some interactive details, real-time data connections, and settlement features are currently under development and will be refined in future iterations.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-sm mb-12">
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
              </div>
  
              {/* Project-specific Comments Section */}
              <CommentSection pageId={`project_${id}`} />
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
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

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 p-4 bg-macaron-text text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 hidden lg:flex items-center justify-center"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="p-4 bg-macaron-text text-white rounded-full shadow-lg hover:bg-macaron-text/90 transition-colors"
            >
              {isNavOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </div>

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
