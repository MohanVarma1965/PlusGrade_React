// Importing required functions and utilities from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
// Import the reducer for taxCalculator from the slice
import taxCalculatorReducer from "./slices/taxCalculator/taxCalculatorSlice";

// Configure the Redux store and combine all reducers
// Currently, only the taxCalculator reducer is added
export const store = configureStore({
  reducer: {
    taxCalculator: taxCalculatorReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch;
