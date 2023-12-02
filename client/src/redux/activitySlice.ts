import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FeedActivity } from '../types/feed';
import { DraftPublish } from '../types/activity';
import { useAppSelector } from './hooks';

type initialStateType = {
  newlyPublishedActivity: null | FeedActivity;
  draftPublish: null | DraftPublish;
};

const initialState: initialStateType = {
  newlyPublishedActivity: null,
  draftPublish: null,
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

    setDraftPublish: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        draftPublish: action.payload,
      };
    },

    clearDraft: (state) => {
      return {
        ...state,
        draftPublish: null,
      };
    },
  },
});

export const { setNewlyPublishedActivity, setDraftPublish, clearDraft } =
  activitySlice.actions;

export const getNewlyPublishedActivity = () =>
  useAppSelector((state) => state.activity.newlyPublishedActivity);
export const getDraftPublish = () =>
  useAppSelector((state) => state.activity.draftPublish);

export const activityReducer = activitySlice.reducer;
