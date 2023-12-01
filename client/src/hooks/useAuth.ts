import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/hooks';
import { login } from '../services/auth';
import { getUserPlainInfo } from '../services/users';
import { getUser, setUser, setIsAuthenticated } from '../redux/authSlice';

import { UserLogin, IUser } from '../types/user';

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['app-username']);
  const dispatch = useAppDispatch();
  const user = getUser();

  const handleLogin = async (info: UserLogin) => {
    try {
      const user = (await login(info)) as IUser;

      // save user info in redux
      if (user) {
        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));
        setCookie('app-username', user.username);
        return;
      }

      return;
    } catch (error) {
      console.log('login error - useAuth -->', error);
      throw new Error('login fail');
    }
  };

  const handleGoogleLogin = () => {};

  const handleRegister = () => {};

  const handleAuthCheck = () => {
    const name = cookies['app-username'];
    if (!name) {
      navigate('/login');
    } else {
      navigate('/feed');
    }

    return;
  };

  const handleUserInfo = async () => {
    try {
      const name = cookies['app-username'];
      const res = await getUserPlainInfo(name);

      dispatch(setUser(res));
      dispatch(setIsAuthenticated(true));
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
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      console.log('handle user info update use auth hook err -->', error);
    }
  };

  return {
    user,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleAuthCheck,
    handleUserInfo,
    handleUserInfoUpdate,
  };
};

export default useAuth;
