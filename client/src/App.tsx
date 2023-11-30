import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import FeedPage from './pages/FeedPage/FeedPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PublishIdeaPage from './pages/PublishActivityPage';
import GeneratorPage from './pages/GeneratorPage/GeneratorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import NavOutlet from './components/NavOutlet';

import './App.css';
import Activity from './pages/Activity/Activity';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route element={<NavOutlet />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/activity/:id" element={<Activity />} />
          <Route path="/generator" element={<GeneratorPage />} />
        </Route>
        <Route path="/publish-activity" element={<PublishIdeaPage />} />
        <Route path="/*" element={<p>page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
