import { IUser } from '../types/user';
const url = 'http://localhost:3000';

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
