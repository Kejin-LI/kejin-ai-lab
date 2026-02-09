import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Project {
  id: string;
  title: string;
  description: string;
  preview_image_url: string;
  tech_stack: string[];
  demo_url?: string;
  github_url?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onHover: (bgUrl: string) => void;
  onLeave: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onHover, onLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -15, scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
      whileTap={{ y: -5, scale: 0.98 }} // Add tap animation for mobile
      onMouseEnter={() => onHover(project.preview_image_url)}
      onMouseLeave={onLeave}
      className="group relative rounded-3xl overflow-hidden bg-white/80 border border-white/60 shadow-sm hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
    >
      <Link to={`/project/${project.id}`} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.preview_image_url} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105" // Add group-active for mobile touch
          />
          <div className="absolute inset-0 bg-macaron-text/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-macaron-text transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100 transition-all duration-300 delay-100">
              <ArrowUpRight className="w-6 h-6 text-macaron-pinkHover" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 
            className="text-xl font-bold mb-2 text-macaron-text group-hover:text-macaron-pinkHover group-active:text-macaron-pinkHover transition-colors truncate"
            title={project.title}
          >
            {project.title}
          </h3>
          <p 
            className="text-macaron-textLight text-sm mb-4 line-clamp-2"
            title={project.description}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, i) => (
              <span 
                key={i} 
                className={`px-3 py-1 text-xs font-medium rounded-full border 
                  ${i % 3 === 0 ? 'bg-macaron-pink/20 text-macaron-text border-macaron-pink' : 
                    i % 3 === 1 ? 'bg-macaron-blue/20 text-macaron-text border-macaron-blue' : 
                    'bg-macaron-yellow/20 text-macaron-text border-macaron-yellow'}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
