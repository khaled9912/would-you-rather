import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../utils/api';
import { addQuestionToUser } from './userSlice';
import { handleInitialData } from './sharedSlice';
export interface QuestionState {
  questions: Object;
}

const initialState: QuestionState = {
  questions: {}
};

export const handleSaveQuestion = createAsyncThunk(
  'question/saveQuestion',
  async (payload: any, thunkAPI) => {
    const newQuestion = await API.saveQuestion(payload);
    const { id, author } = newQuestion;
    thunkAPI.dispatch(addQuestionToUser({ id, author }));
    return newQuestion;
  }
);

export const handleSaveQuestionAnswer = createAsyncThunk(
  'question/saveQuestionAnswer',
  async (payload: any, thunkAPI) => {
    await API.saveQuestionAnswer(payload);
    thunkAPI.dispatch(handleInitialData());
  }
);

export const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    receiveQuestions: (state, action: PayloadAction<Object>) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSaveQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        const question = action.payload;
        state.questions = { ...state.questions, [question.id]: question }
      })
  },
});

export const { receiveQuestions } = QuestionSlice.actions;
export default QuestionSlice.reducer;