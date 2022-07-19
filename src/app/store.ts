import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import questionReducer from '../slices/questionSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    question: questionReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
