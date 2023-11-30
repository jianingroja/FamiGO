import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../types/user';
import { useAppSelector } from './hooks';

// todo: define user interface
type authState = {
  user: null | IUser;
  isAuthenticated: boolean;
};

const initialState: authState = {
  user: null,
  isAuthenticated: false,
};

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
  },
});

// action
export const { setUser, setIsAuthenticated } = authSlice.actions;

// selector
export const getUser = () => useAppSelector((state) => state.auth.user);
export const getUsername = () =>
  useAppSelector((state) => state.auth.user?.username);
export const getIsAuthenticated = () =>
  useAppSelector((state) => state.auth.isAuthenticated);

// reducer
export const authReducer = authSlice.reducer;
