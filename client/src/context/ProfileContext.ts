import { createContext } from 'react';

type ProfileContext = {
  isMyProfile: boolean;
  currentProfile: string;
};

export const ProfileContext = createContext<ProfileContext>(
  {} as ProfileContext
);
