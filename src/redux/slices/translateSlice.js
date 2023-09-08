import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateQuery } from "../actions/translateActions";

const initialState = {
  languages: [],
  isLoading: true,
  isError: false,
  isTextLoading: false,
  isTextError: false,
  answerText: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
      state.isError = false;
    },
    [getLanguages.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action);
    },
    [translateQuery.pending]: (state) => {
      state.isTextLoading = true;
    },
    [translateQuery.fulfilled]: (state, action) => {
      state.answerText = action.payload;
      console.log(action);
      state.isTextLoading = false;
    },
    [translateQuery.rejected]: (state) => {
      state.isTextError = true;
    },
  },
  reducers: {
    clearAnswerText: (state) => {
      state.answerText = "";
    },
  },
});

export default translateSlice.reducer;

export const clearAnswerQuerry = translateSlice.actions.clearAnswerText;
