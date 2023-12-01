import { IUser, UserInfoUpdate } from '../types/user';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// with data
export const getUserInfo = async (username: string) => {
  try {
    const url = `${BASE_URL}/profile/${username}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) console.error('ERROR');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// plain info
export const getUserPlainInfo = async (username: string) => {
  try {
    const url = `${BASE_URL}/user/${username}`;

    // get the info of cookie user
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    const data = (await res.json()) as IUser;
    return data;
  } catch (error) {
    console.error('get plain user info client err -->', error);
    throw error;
  }
};

export const updateUserInfo = async (
  username: string,
  updates: UserInfoUpdate
) => {
  try {
    const url = `${BASE_URL}/profile/${username}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers,
      body: JSON.stringify(updates),
    });

    const data = (await response.json()) as IUser;
    return data;
  } catch (error) {
    console.error('Error in updateUserInfo', error);
    throw error;
  }
};
