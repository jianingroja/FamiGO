import { useAppDispatch } from '../redux/hooks';
import { login } from '../services/auth';
import { getUser, setUser, setIsAuthenticated } from '../redux/authSlice';

import { UserLogin, IUser } from '../types/user';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = getUser();

  const handleLogin = async (info: UserLogin) => {
    try {
      const user = (await login(info)) as IUser;

      // save user info in redux
      if (user) {
        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));
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

  return { user, handleLogin, handleGoogleLogin, handleRegister };
};

export default useAuth;
