import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    profile: profileReducer,
  },
});
