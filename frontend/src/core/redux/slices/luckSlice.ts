import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResultLuck } from "../thunk/luckThunk";

export type ErrorType = {
  status: boolean;
  text: string | undefined;
};

export interface LuckStateType {
  loading: boolean;
  error: ErrorType;
  result: string | null;
}

const initialState: LuckStateType = {
  loading: false,
  error: { status: false, text: undefined },
  result: null,
};

export const LUCK = "luck";
export type LUCK = typeof LUCK;

export const fetchResult = createAsyncThunk(
  "thunk/fetchResultLuck",
  fetchResultLuck
);

export const luckSlice = createSlice({
  name: LUCK,
  initialState,
  reducers: {
    setLuckLoading: (state) => {
      state.loading = true;
      state.error = { status: false, text: undefined };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResult.pending, (state) => {
      luckSlice.caseReducers.setLuckLoading(state);
    });
    builder.addCase(
      fetchResult.fulfilled,
      (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = { status: false, text: undefined };
        state.result = action.payload;
      }
    );
    builder.addCase(fetchResult.rejected, (state, action) => {
      state.loading = false;
      state.result = null;
      state.error = { status: true, text: action.error.message };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLuckLoading } = luckSlice.actions;

// Selector
export const luckSelector = (state: RootState) => state.luckReducer;

// Reducer
export default luckSlice.reducer;
