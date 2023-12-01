import { IUser } from '../types/user';
const url = 'http://localhost:3000';

// with data
export const getUserInfo = async (username: string) => {
  try {
    const response = await fetch(`${url}/profile/${username}`, {
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
    // get the info of cookie user
    const res = await fetch(`${url}/user/${username}`, {
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
  updates: { newUsername?: string; avatar?: string; description?: string }
) => {
  try {
    const response = await fetch(`${url}/profile/${username}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      console.error('Failed to update user info');
    }

    const data = (await response.json()) as IUser;
    return data;
  } catch (error) {
    console.error('Error in updateUserInfo', error);
    throw error;
  }
};
