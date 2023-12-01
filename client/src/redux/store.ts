import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './userSlice';
import { activityReducer } from './activitySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer,
  },
});

export default store;
