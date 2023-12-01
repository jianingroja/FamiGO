import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../types/user';
import { useAppSelector } from './hooks';

type userState = {
  user: null | IUser;
};

const initialState: userState = {
  user: null,
};

// slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

// action
export const { setUser } = userSlice.actions;

// selector
export const getUser = () => useAppSelector((state) => state.user.user);
export const getMyUsername = () =>
  useAppSelector((state) => state.user.user?.username);

// reducer
export const userReducer = userSlice.reducer;
