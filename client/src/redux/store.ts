import { configureStore } from '@reduxjs/toolkit';

import { activityReducer } from './activitySlice';

const store = configureStore({
  reducer: {
    activity: activityReducer,
  },
});

export default store;
