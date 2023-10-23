import { configureStore } from "@reduxjs/toolkit";
import taxCalculatorReducer from "./features/taxCalculator/taxCalculatorSlice";

export const store = configureStore({
  reducer: {
    taxCalculator: taxCalculatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
