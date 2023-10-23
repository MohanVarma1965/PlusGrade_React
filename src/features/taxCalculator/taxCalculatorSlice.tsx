import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { TaxBracket } from "../../models/tax";

interface TaxCalculatorState {
  loading: boolean;
  taxBrackets: TaxBracket[];
  error: string | null;
}

const initialState: TaxCalculatorState = {
  taxBrackets: [],
  loading: false,
  error: null,
};

export const fetchTaxBrackets = createAsyncThunk<
  TaxBracket[],
  number,
  { rejectValue: string }
>(
  "taxCalculator/fetchTaxBrackets",
  async (year: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tax-calculator/tax-year/${year}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.tax_brackets;
    } catch (error) {
      console.log("inside the error");
      console.log(error);
      if (error instanceof Error && error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
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
      .addCase(
        fetchTaxBrackets.fulfilled,
        (state, action: PayloadAction<TaxBracket[]>) => {
          state.loading = false;
          state.taxBrackets = action.payload;
          state.error = null;
        }
      ) // Handling rejected promises
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
