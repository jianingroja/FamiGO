import { UserLogin, UserRegister } from '../types/user';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (info: UserLogin) => {
  const { email, password } = info;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const googleLogin = async (credential: string) => {
  const requestBody = { token: credential };
  try {
    console.log('Request body:', requestBody);
    const response = await fetch(`${BASE_URL}/login/google`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    });

    if (!response.ok) {
      throw new Error('Google login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Google login error', error);
    throw error;
  }
};

export const registerPOST = async (info: UserRegister) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      console.error('Register failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
