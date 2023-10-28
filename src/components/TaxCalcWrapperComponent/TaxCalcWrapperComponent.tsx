import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CalculateTaxAmountsUtil } from "../../utils/CalculateTaxAmountsUtil/CalculateTaxAmountsUtil";
import { SERVER_ERROR_PREPEND_TEXT, PLEASE_TRY_AGAIN_TEXT } from "../../constants/taxConstants";
import { resetTaxBrackets, fetchTaxBrackets } from "../../redux/slices/taxCalculator/taxCalculatorSlice";
import Spinner from "../../utils/Spinner/Spinner";
import TaxFormComponent from "../TaxFormComponent/TaxFormComponent";
import Notification from "../../utils/Notifications/Notification";
import TaxDisplayComponent from "../TaxDisplayComponent/TaxDisplayComponent";
import TaxChartComponent from "../TaxChartComponent/TaxChartComponent";
import "./TaxCalculatorWrapper.css";

// Main Tax Calculation Wrapper Component
const TaxCalcWrapperComponent: React.FC = () => {
  // Set default values for TaxFormComponent
  const [income, setIncome] = useState<number>(125000);
  const [year, setYear] = useState<number>(2022);

  // Set Local state
  const [taxAmounts, setTaxAmounts] = useState<number[]>([]);

  // Grab below details from store
  const loading = useSelector((state: RootState) => state.taxCalculator.loading);
  const taxBrackets = useSelector((state: RootState) => state.taxCalculator.taxBrackets);
  const error = useSelector((state: RootState) => state.taxCalculator.error);

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Handle calculation function for fetching tax brackets
  const handleCalculate = () => {
    dispatch(fetchTaxBrackets(year));
  };

  // Handle year changes and reset relevant state and Redux store data
  const handleSetYearChange = (newYear: number) => {
    setYear(newYear);
    // Reset tax amounts when year changes
    setTaxAmounts([]);
    dispatch(resetTaxBrackets());
  };

  // useEffect to recalculate tax amounts when income or tax brackets change
  useEffect(() => {
    const newTaxAmounts = CalculateTaxAmountsUtil(income, taxBrackets);
    setTaxAmounts(newTaxAmounts);
  }, [income, taxBrackets]);

  return (
    <React.Fragment>
      {/* This will attach the spinner if loading is set to true*/}
      {loading && <Spinner />}
      {error && <Notification arrMessages={[SERVER_ERROR_PREPEND_TEXT, error, PLEASE_TRY_AGAIN_TEXT]} />}
      {/* Tax Form component for user inputs*/}
      <TaxFormComponent
        income={income}
        year={year}
        setIncome={setIncome}
        setYear={handleSetYearChange}
        handleCalculate={handleCalculate}
        loading={loading}
      />
      {/*Display tax details and chart only if there are tax amounts and no errors */}
      {taxAmounts.length > 0 && !error && (
        <div className="components-container">
          {/* This will display the tax details and tax bracket table based on the tax amounts*/}
          <div className="tile">
            <TaxDisplayComponent taxAmounts={taxAmounts} income={income} />
          </div>
          {/* This will display the tax tax chart*/}
          <div className="tile">
            <TaxChartComponent taxAmounts={taxAmounts} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TaxCalcWrapperComponent;
