import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const hasAllInputs = email && password;

  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasAllInputs) {
      toast.error('Please fill in all inputs!');
      return;
    }

    const loginPromise = handleLogin({ email, password });

    await toast.promise(
      loginPromise,
      {
        loading: 'logging...',
        success: 'welcome back',
        error: (error) => `${error.toString().split(': ')[1]}`,
      },
      {
        success: {
          icon: '☀️',
        },
        error: {
          icon: '🤖',
        },
      }
    );

    navigate('/feed');
  };

  const onGoogleSuccess = async (response: any) => {
    try {
      await handleGoogleLogin(response.credential);
      navigate('/feed');
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="welcome-back">
          <h2>Welcome back!</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-log-in">
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
        <GoogleLogin onSuccess={onGoogleSuccess} />
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
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
