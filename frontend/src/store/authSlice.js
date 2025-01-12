import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

const AUTH_API = '/api/auth';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const data = {
      username,
      password,
      grant_type: 'password',
      scope: '',
      client_id: '',
      client_secret: ''
    };

    const response = await axios.post(`${AUTH_API}/token`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
