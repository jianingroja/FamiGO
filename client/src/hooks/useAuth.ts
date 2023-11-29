import { useAppDispatch } from '../redux/hooks';
import { login } from '../services/auth';
import { getUser, setUser, setIsAuthenticated } from '../redux/authSlice';

import { UserLogin } from '../types/user';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = getUser();

  const handleLogin = async (info: UserLogin) => {
    try {
      // todo: define an interface for user, used here and in redux
      const user = await login(info);

      // save user info in redux
      if (user) {
        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      console.log('login error - useAuth -->', error);
    }
  };

  const handleGoogleLogin = () => {};

  const handleRegister = () => {};

  return { user, handleLogin, handleGoogleLogin, handleRegister };
};

export default useAuth;
