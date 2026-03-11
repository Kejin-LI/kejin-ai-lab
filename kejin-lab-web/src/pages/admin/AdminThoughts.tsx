
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Thought {
  id: string;
  content: string;
  author: string;
  role: string;
}

const AdminThoughts: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingThought, setEditingThought] = useState<Partial<Thought> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('thoughts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching thoughts:', error);
    } else {
      setThoughts(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingThought) return;

    try {
      if (editingThought.id) {
        // Update
        const { error } = await supabase
          .from('thoughts')
          .update(editingThought)
          .eq('id', editingThought.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('thoughts')
          .insert([editingThought]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingThought(null);
      fetchThoughts();
    } catch (error) {
      console.error('Error saving thought:', error);
      alert('保存思考失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条思考吗？')) return;

    const { error } = await supabase
      .from('thoughts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting thought:', error);
      alert('删除思考失败');
    } else {
      fetchThoughts();
    }
  };

  const openModal = (thought: Thought | null = null) => {
    setEditingThought(thought || { content: '', author: 'Kejin Li', role: 'Founder' });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">思考管理</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          <span>新增思考</span>
        </button>
      </div>

      {loading ? (
        <div>加载中...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thoughts.map((thought) => (
            <div key={thought.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <p className="text-gray-800 mb-4 font-medium italic">"{thought.content}"</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-bold mr-2">{thought.author}</span>
                  <span>{thought.role}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openModal(thought)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(thought.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingThought && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingThought.id ? '编辑思考' : '新建思考'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={editingThought.content}
                  onChange={(e) => setEditingThought({ ...editingThought, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  rows={4}
                  placeholder="输入你的思考..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
                  <input
                    type="text"
                    value={editingThought.author}
                    onChange={(e) => setEditingThought({ ...editingThought, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                  <input
                    type="text"
                    value={editingThought.role}
                    onChange={(e) => setEditingThought({ ...editingThought, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
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
                  <span>保存思考</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminThoughts;
