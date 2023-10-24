// Import required tools and utilities from redux toolkit
import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
// Import TaxBracket model which defines the structure of tax brackets
import { TaxBracket } from "../../models/tax";
// Import constants for error messages
import { SERVER_ERROR_TOO_LONG_TEXT, SERVER_UNKNOWN_ERROR_TEXT } from "../../../constants/taxConstants";
// Import the function to fetch tax brackets from the API
import { fetchTaxBracketsApi } from "./taxCalculator_api";
// Import initial state for tax calculator
import { initialState } from "./tacCalculator_state";

/**
 * Async thunk action to fetch tax brackets for a given year.
 * Handles possible errors from the API call.
 */

export const fetchTaxBrackets = createAsyncThunk<TaxBracket[], number, { rejectValue: string }>(
  "taxCalculator/fetchTaxBrackets",
  async (year: number, { rejectWithValue }) => {
    try {
      const taxBrackets = await fetchTaxBracketsApi(year);
      return taxBrackets;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === SERVER_ERROR_TOO_LONG_TEXT) {
          return rejectWithValue(SERVER_ERROR_TOO_LONG_TEXT);
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue(SERVER_UNKNOWN_ERROR_TEXT);
    }
  }
);

// Define the Redux slice for tax calculator
const taxCalculatorSlice = createSlice({
  name: "taxCalculator",
  initialState,
  reducers: {
    // Reducer to reset tax brackets to an empty array
    resetTaxBrackets: (state) => {
      state.taxBrackets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //Handle the state when tax bracket fetching is in progress
      .addCase(fetchTaxBrackets.pending, (state) => {
        state.loading = true;
      })
      // Handle the state when tax bracket fetching is successful
      .addCase(fetchTaxBrackets.fulfilled, (state, action: PayloadAction<TaxBracket[]>) => {
        state.loading = false;
        state.taxBrackets = action.payload;
        state.error = null;
      })
      // Handle the state when tax bracket fetching encounters an error
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

// Export the reducer for this slice
export default taxCalculatorSlice.reducer;
// Export actions generated by createSlice
export const { resetTaxBrackets } = taxCalculatorSlice.actions;
