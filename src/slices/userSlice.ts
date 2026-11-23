import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  username: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.username = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.username = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
