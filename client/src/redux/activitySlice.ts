import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FeedActivity } from '../types/feed';
import { DraftPublish, AIDraftPublish } from '../types/activity';
import { useAppSelector } from './hooks';

type initialStateType = {
  newlyPublishedActivity: null | FeedActivity;
  draftPublish: null | DraftPublish;
  AIdraftPublish: null | AIDraftPublish;
  AIId: null | string;
  collection: {
    [key: string]: null | FeedActivity[];
  };
};

const initialState: initialStateType = {
  newlyPublishedActivity: null,
  draftPublish: null,
  AIdraftPublish: null,
  AIId: null,
  collection: {
    mine: null,
    others: null,
    ai: null,
  },
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
    clearNewlyPublishedActivity: (state) => {
      return {
        ...state,
        newlyPublishedActivity: null,
      };
    },

    setDraftPublish: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        draftPublish: action.payload,
      };
    },

    setAIDraftPublish: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        AIdraftPublish: action.payload,
      };
    },

    setAIId: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        AIId: action.payload,
      };
    },

    clearDraft: (state) => {
      return {
        ...state,
        draftPublish: null,
        AIdraftPublish: null,
        AIId: null,
      };
    },

    setCollection: (state, action: PayloadAction<any>) => {
      const collection = state.collection;
      const { type, value } = action.payload;

      return {
        ...state,
        collection: {
          ...collection,
          [type]: value,
        },
      };
    },

    clearCollection: (state) => {
      return {
        ...state,
        collection: {
          mine: null,
          others: null,
          ai: null,
        },
      };
    },
  },
});

export const {
  setNewlyPublishedActivity,
  clearNewlyPublishedActivity,
  setDraftPublish,
  setAIDraftPublish,
  setAIId,
  clearDraft,
  setCollection,
  clearCollection,
} = activitySlice.actions;

export const getNewlyPublishedActivity = () =>
  useAppSelector((state) => state.activity.newlyPublishedActivity);
export const getDraftPublish = () =>
  useAppSelector((state) => state.activity.draftPublish);
export const getAIDraftPublish = () =>
  useAppSelector((state) => state.activity.AIdraftPublish);
export const getAIId = () => useAppSelector((state) => state.activity.AIId);
export const getCollection = (type: string) =>
  useAppSelector((state) => state.activity.collection[type]);

export const activityReducer = activitySlice.reducer;
