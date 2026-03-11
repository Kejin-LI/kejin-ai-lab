
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import InteractiveCanvas from './components/InteractiveCanvas';
import AiChatBubble from './components/AiChatBubble';
import ScrollToAnchor from './components/ScrollToAnchor';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminThoughts from './pages/admin/AdminThoughts';
import ThoughtsPage from './pages/ThoughtsPage';
import ThoughtDetailPage from './pages/ThoughtDetailPage';
import CommunityPage from './pages/CommunityPage';
import { useDynamicTitle } from './hooks/useDynamicTitle';

function App() {
  useDynamicTitle();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-labs-bg text-labs-text font-sans selection:bg-labs-pink selection:text-black">
      <ScrollToAnchor />
      {!isAdminRoute && <InteractiveCanvas />}
      {!isAdminRoute && <Header />}
      
      {/* Main Content - Increased z-index to 40 to ensure fixed elements inside (like Try it Now button) are above Footer (z-10) */}
      <main className={`relative z-40 bg-transparent ${isAdminRoute ? 'h-screen' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route path="/thoughts/:id" element={<ThoughtDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<div className="text-xl">Welcome to Admin Dashboard. Select a menu to manage content.</div>} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="thoughts" element={<AdminThoughts />} />
          </Route>
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AiChatBubble />}
    </div>
  );
}

export default App;
