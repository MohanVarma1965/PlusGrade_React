import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { TaxBracket } from "../../models/tax";

import { fetchTaxBracketsApi } from "./api";
import { TaxCalculatorState, initialState } from "./state";

export const fetchTaxBrackets = createAsyncThunk<TaxBracket[], number, { rejectValue: string }>(
  "taxCalculator/fetchTaxBrackets",
  async (year: number, { rejectWithValue }) => {
    try {
      const taxBrackets = await fetchTaxBracketsApi(year);
      return taxBrackets;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Request is taking too long!") {
          return rejectWithValue("Request is taking too long!");
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

const taxCalculatorSlice = createSlice({
  name: "taxCalculator",
  initialState,
  reducers: {
    resetTaxBrackets: (state) => {
      state.taxBrackets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxBrackets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaxBrackets.fulfilled, (state, action: PayloadAction<TaxBracket[]>) => {
        state.loading = false;
        state.taxBrackets = action.payload;
        state.error = null;
      }) // Handling rejected promises
      .addCase(
        fetchTaxBrackets.rejected,
        (
          state,
          action: {
            payload: string | undefined;
            error: SerializedError;
            meta: { arg: number };
          }
        ) => {
          state.loading = false;
          state.error = action.payload || action.error.message || null;
        }
      );
  },
});

export default taxCalculatorSlice.reducer;
export const { resetTaxBrackets } = taxCalculatorSlice.actions;
