import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import useAuth from '../../hooks/useAuth';
import { googleLogin } from '../../services/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin({ email, password })
      .then(() => navigate('/feed'))
      .catch((error) => {
        console.log('login err component', error);
        // todo: show message to user in ui
      });
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      // todo: use auth

      const user = await googleLogin(response.credential);
      navigate('/feed');
      console.log('Logged in with Google', user);
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth"
            placeholder="Password"
            required
          />
          <button type="submit" className="login-btn">
            LOG IN
          </button>
        </form>
        <GoogleLogin onSuccess={handleGoogleLogin} />
        <div className="signup-section">
          <span>Don't have an account?</span>
          <Link to="/register" className="signup-btn">
            SIGN UP
          </Link>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
