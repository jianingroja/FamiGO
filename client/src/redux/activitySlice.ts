import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from './hooks';

type initialStateType = {
  newlyPublishedActivity: null | {}; // FeedActivity
};

const initialState: initialStateType = {
  newlyPublishedActivity: null,
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setNewlyPublishedActivity: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        newlyPublishedActivity: action.payload,
      };
    },
  },
});

export const { setNewlyPublishedActivity } = activitySlice.actions;

export const getNewlyPublishedActivity = () =>
  useAppSelector((state) => state.activity.newlyPublishedActivity);

export const activityReducer = activitySlice.reducer;
