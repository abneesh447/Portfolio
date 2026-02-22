import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

// Safe localStorage read — won't throw in SSR or private mode
const getStoredToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch {
    return null;
  }
};

const initialState = {
  user:    null,
  token:   getStoredToken(),
  loading: false,
  error:   null,
};

// ── Async thunks ────────────────────────────────────────────

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data);
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.getMe();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Session expired.'
      );
    }
  }
);

// ── Slice ───────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user  = null;
      state.token = null;
      state.error = null;
      try { localStorage.removeItem('token'); } catch { /* noop */ }
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        state.error   = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // getMe
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.error   = null;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user    = null;
        state.token   = null;
        try { localStorage.removeItem('token'); } catch { /* noop */ }
      });
  },
});

export const { logout, clearError, setToken } = authSlice.actions;
export default authSlice.reducer;