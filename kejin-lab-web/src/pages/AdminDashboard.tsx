
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutGrid, MessageSquare } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/admin');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (!session) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" title="返回首页" className="block">
            <h1 className="text-xl font-bold text-gray-800 hover:opacity-70 transition-opacity">
              Kejin Lab 管理后台
            </h1>
            <span className="text-xs text-gray-400 font-normal">点击返回首页</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard/projects"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/dashboard/projects') 
                ? 'bg-black text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid size={20} />
            <span>项目管理</span>
          </Link>
          
          <Link
            to="/admin/dashboard/thoughts"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/dashboard/thoughts') 
                ? 'bg-black text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={20} />
            <span>思考管理</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
