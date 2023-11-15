import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalculateTaxAmountsUtil } from "../utils/CalculateTaxAmountsUtil/CalculateTaxAmountsUtil";
import { resetTaxBrackets, fetchTaxBrackets } from "../redux/slices/taxCalculator/taxCalculatorSlice";
import { AppDispatch, RootState } from "../redux/store";

// Custom hook to encapsulate tax calculation logic and state management.
export const useTaxCalculation = (initialIncome: number, initialYear: number) => {
  const [income, setIncome] = useState<number>(initialIncome);
  const [year, setYear] = useState<number>(initialYear);
  const [taxAmounts, setTaxAmounts] = useState<number[]>([]);

  // Fetch the current loading state, tax brackets data, and potential errors from the Redux store.
  const taxBrackets = useSelector((state: RootState) => state.taxCalculator.taxBrackets);
  const loading = useSelector((state: RootState) => state.taxCalculator.loading);
  const error = useSelector((state: RootState) => state.taxCalculator.error);
  const dispatch = useDispatch<AppDispatch>();

  const handleCalculate = () => {
    dispatch(fetchTaxBrackets(year));
  };

  // Function to handle changes in the year selection.
  // Resets the tax amounts and tax bracket data upon change.
  const handleSetYearChange = (newYear: number) => {
    setYear(newYear);
    setTaxAmounts([]);
    dispatch(resetTaxBrackets());
  };

  const newTaxAmounts = CalculateTaxAmountsUtil(income, taxBrackets);
  // Recompute tax amounts whenever income or tax brackets change.

  useEffect(() => {
    setTaxAmounts(newTaxAmounts);
  }, [income, taxBrackets]);

  // Return all states and handlers to be utilized by components using this custom hook.
  return {
    income,
    setIncome,
    year,
    loading,
    error,
    taxAmounts,
    handleCalculate,
    handleSetYearChange,
  };
};
