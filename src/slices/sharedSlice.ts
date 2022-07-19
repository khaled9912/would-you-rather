import { createAsyncThunk } from '@reduxjs/toolkit';
import { receiveUsers } from './userSlice';
import { receiveQuestions } from './questionSlice';
import API from '../utils/api';

export const handleInitialData = createAsyncThunk(
  'shared/getInitialData',
  async (_, thunkAPI) => {
    const { users, questions } = await API.getInitialData();
    thunkAPI.dispatch(receiveUsers(users));
    thunkAPI.dispatch(receiveQuestions(questions));
  }
);
