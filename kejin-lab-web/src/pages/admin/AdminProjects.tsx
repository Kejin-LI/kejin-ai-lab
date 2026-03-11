
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
  technologies: string[];
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      if (editingProject.id) {
        // Update
        const { error } = await supabase
          .from('projects')
          .update(editingProject)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('projects')
          .insert([editingProject]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('保存项目失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个项目吗？')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      alert('删除项目失败');
    } else {
      fetchProjects();
    }
  };

  const openModal = (project: Project | null = null) => {
    setEditingProject(project || { title: '', description: '', content: '', image_url: '', link: '', technologies: [] });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">项目管理</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          <span>新增项目</span>
        </button>
      </div>

      {loading ? (
        <div>加载中...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gray-100 relative">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">暂无图片</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.description}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingProject.id ? '编辑项目' : '新建项目'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">简介 (短)</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容 (Markdown)</label>
                <textarea
                  value={editingProject.content}
                  onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">图片链接</label>
                    <input
                    type="text"
                    value={editingProject.image_url}
                    onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://..."
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">外部链接</label>
                    <input
                    type="text"
                    value={editingProject.link}
                    onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://..."
                    />
                </div>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">技术栈 (逗号分隔)</label>
                 <input
                    type="text"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="React, TypeScript, Supabase"
                 />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Save size={18} />
                  <span>保存项目</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
