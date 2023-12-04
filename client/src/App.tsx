import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import useAuth from './hooks/useAuth';

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
import Activity from './pages/Activity/ActivityPage';

const App = () => {
  const { pathname } = useLocation();
  const { handleAuthCheck, handleUserInfo } = useAuth();

  // every time app reloads, get user's info, save it in redux
  useEffect(() => {
    handleAuthCheck(pathname);
    handleUserInfo();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/edit-profile/:username" element={<EditProfilePage />} />
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
