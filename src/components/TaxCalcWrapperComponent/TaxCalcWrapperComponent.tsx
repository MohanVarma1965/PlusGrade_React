import React, { useState, useEffect } from "react";
import TaxFormComponent from "../TaxFormComponent/TaxFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchTaxBrackets } from "../../redux/slices/taxCalculator/taxCalculatorSlice";
import { RootState } from "../../redux/store";
import Notification from "../../utils/Notifications/Notification";
import TaxDisplayComponent from "../TaxDisplayComponent/TaxDisplayComponent";
import { CalculateTaxAmountsUtil } from "../../utils/CalculateTaxAmountsUtil/CalculateTaxAmountsUtil";
import TaxChartComponent from "../TaxChartComponent/TaxChartComponent";
import "./TaxCalculatorWrapper.css";
import Spinner from "../../utils/Spinner/Spinner";
import { SERVER_ERROR_PREPEND_TEXT, PLEASE_TRY_AGAIN_TEXT } from "../../constants/taxConstants";
import { resetTaxBrackets } from "../../redux/slices/taxCalculator/taxCalculatorSlice";

const TaxCalculatorComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [income, setIncome] = useState<number>(125000);
  const [year, setYear] = useState<number>(2022);
  const [taxAmounts, setTaxAmounts] = useState<number[]>([]);

  const handleCalculate = () => {
    dispatch(fetchTaxBrackets(year));
  };

  const loading = useSelector((state: RootState) => state.taxCalculator.loading);

  const taxBrackets = useSelector((state: RootState) => state.taxCalculator.taxBrackets);

  useEffect(() => {
    const newTaxAmounts = CalculateTaxAmountsUtil(income, taxBrackets);
    setTaxAmounts(newTaxAmounts);
  }, [income, taxBrackets]);

  const error = useSelector((state: RootState) => state.taxCalculator.error);

  const handleSetYearChange = (newYear: number) => {
    setYear(newYear);
    setTaxAmounts([]); // Reset tax amounts when year changes
    dispatch(resetTaxBrackets()); // Reset tax brackets in Redux state when year changes
  };
  return (
    <div>
      <Spinner visible={loading} />
      {error && <Notification arrMessages={[SERVER_ERROR_PREPEND_TEXT, error, PLEASE_TRY_AGAIN_TEXT]} />}
      <TaxFormComponent
        income={income}
        year={year}
        setIncome={setIncome}
        setYear={handleSetYearChange}
        handleCalculate={handleCalculate}
        loading={loading}
      />
      {taxAmounts.length > 0 && !error && (
        <div className="components-container">
          <div className="tile">
            <TaxDisplayComponent taxAmounts={taxAmounts} income={income} />
          </div>
          <div className="tile">
            <TaxChartComponent taxAmounts={taxAmounts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxCalculatorComponent;
