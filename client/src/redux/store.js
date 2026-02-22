import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer   from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:   uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types (axios errors have non-serializable data)
        ignoredActions: ['auth/login/rejected', 'auth/getMe/rejected'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;