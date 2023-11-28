import { Routes, Route } from 'react-router-dom';

import FeedPage from './pages/FeedPage/FeedPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PublishIdeaPage from './pages/PublishActivityPage';
import GeneratorPage from './pages/GeneratorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavOutlet from './components/NavOutlet';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<NavOutlet />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/generator" element={<GeneratorPage />} />
        </Route>
        <Route path="/publish-activity" element={<PublishIdeaPage />} />
        <Route path="/*" element={<p>page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
