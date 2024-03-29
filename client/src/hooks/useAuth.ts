import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/hooks';
import { login, googleLogin, registerPOST, logout } from '../services/auth';
import { getUserPlainInfo } from '../services/users';
import { getUser, setUser } from '../redux/userSlice';

import { UserLogin, IUser, UserRegister } from '../types/user';

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['app-username']);
  const dispatch = useAppDispatch();
  const user = getUser();

  const handleLogin = async (info: UserLogin) => {
    try {
      const user = (await login(info)) as IUser;

      if (user) {
        dispatch(setUser(user));
        setCookie('app-username', user.username);
        return;
      }

      return;
    } catch (error) {
      throw error;
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const { user } = await googleLogin(credential);
      if (user) {
        dispatch(setUser(user));
        setCookie('app-username', user.username);
        return;
      }
      return;
    } catch (error) {
      console.error('Google login error - useAuth -->', error);
      throw error;
    }
  };

  const handleRegister = async (info: UserRegister) => {
    try {
      const user = (await registerPOST(info)) as IUser;

      if (user) {
        dispatch(setUser(user));
        setCookie('app-username', user.username);
        return;
      }

      return;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setUser(null));
      removeCookie('app-username');
      navigate('/login');
    } catch (error) {}
  };

  const handleAuthCheck = (pathname: string) => {
    const name = cookies['app-username'];

    const publicPaths = [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
    ];

    if (!name && !publicPaths.includes(pathname)) {
      navigate('/login');
      return false;
    }

    if (name && pathname === '/') {
      navigate('/feed');
      return true;
    }

    return true;
  };

  const handleUserInfo = async () => {
    try {
      const name = cookies['app-username'];
      if (!name) {
        console.error('app-username is undefined');
        return;
      }

      const res = await getUserPlainInfo(name);
      dispatch(setUser(res));
    } catch (error) {
      console.log('handle user info use auth hook err -->', error);
    }
  };

  const handleUserInfoUpdate = async (user: IUser) => {
    try {
      const { username } = user;
      setCookie('app-username', username);

      const res = await getUserPlainInfo(username);
      dispatch(setUser(res));
    } catch (error) {
      console.log('handle user info update use auth hook err -->', error);
      throw error;
    }
  };

  return {
    user,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleLogout,
    handleAuthCheck,
    handleUserInfo,
    handleUserInfoUpdate,
  };
};

export default useAuth;
