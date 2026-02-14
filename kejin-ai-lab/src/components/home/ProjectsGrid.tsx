import React from 'react';
import { ProjectCard, Project } from './ProjectCard';
import { Laptop } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onProjectHover, defaultBg }) => {
  const { t, language } = useLanguage();

  const projects: Project[] = [
    {
      id: '2',
      title: language === 'zh' ? '寻迹之旅：AI文博导览' : 'Tracing Journey: AI Museum Guide',
      description: language === 'zh' ? '一款 AI 原生设计APP，集智能拍照讲解、行程规划、旅游手帐等于一体，让全球逛展变轻松有趣的文博导览神器' : 'An AI-native design app that combines smart photo explanations, itinerary planning, and travel journals to make global museum visits easy and fun.',
       preview_image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20cute%20explorer%20character%20in%20a%20museum%20using%20an%20ai%20guide%20app%20with%20holographic%20artifacts%20ancient%20vases%20and%20paintings%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9',
       tech_stack: language === 'zh' ? ['AI Native', '拍照识别', '智能导游'] : ['AI Native', 'Photo Recognition', 'Smart Guide'],
      github_url: 'https://github.com',
    },
    {
      id: '1',
      title: language === 'zh' ? '标注专家招募平台' : 'Annotation Expert Recruitment Platform',
      description: language === 'zh' ? '高效连接AI数据需求方与顶尖领域标注专家。' : 'Link AI data demanders with top domain annotation experts efficiently.',
      preview_image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements&image_size=landscape_16_9',
      tech_stack: language === 'zh' ? ['专家库', 'AI 面试'] : ['Experts', 'AI Interview'],
      github_url: 'https://github.com',
    }
  ];

  return (
    <div id="projects" className="mb-16">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-macaron-blue rounded-full animate-bounce-slow shadow-md hover:scale-110 hover:rotate-12 transition-transform duration-300">
          <Laptop className="w-6 h-6 text-white fill-white/20" />
        </div>
        <h2 className="text-2xl font-bold text-macaron-text">{t('projects.title')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onHover={onProjectHover}
            onLeave={() => onProjectHover(defaultBg)}
          />
        ))}
      </div>
    </div>
  );
};

interface ProjectsGridProps {
  onProjectHover: (bgUrl: string) => void;
  defaultBg: string;
}

export const PROJECTS_DATA: Project[] = [
    {
      id: '1',
      title: 'Annotation Expert Recruitment Platform',
      description: 'Link AI data demanders with top domain annotation experts efficiently.',
      preview_image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements%20clean%20background%20high%20quality%20minimalist&image_size=landscape_16_9',
      tech_stack: ['Experts', 'AI Interview'],
      github_url: 'https://github.com',
    },
    {
      id: '2',
      title: 'Tracing Journey: AI Museum Guide',
      description: 'An AI-native design app that combines smart photo explanations, itinerary planning, and travel journals to make global museum visits easy and fun.',
       preview_image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20cute%20explorer%20character%20in%20a%20museum%20using%20an%20ai%20guide%20app%20with%20holographic%20artifacts%20ancient%20vases%20and%20paintings%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9',
       tech_stack: ['AI Native', 'Photo Recognition', 'Smart Guide'],
      github_url: 'https://github.com',
    }
];
