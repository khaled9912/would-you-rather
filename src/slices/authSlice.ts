import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthed: Boolean,
  userId: string
}

const initialState: AuthState = {
  isAuthed: false,
  userId: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthed: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuthed = true;
    },
    logout: (state) => {
      state.userId = initialState.userId;
      state.isAuthed = initialState.isAuthed;
    }
  }
});

export const { setUserAuthed, logout } = authSlice.actions;
export default authSlice.reducer;