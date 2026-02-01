import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { ClickSparkles } from './components/common/ClickSparkles';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ClickSparkles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
