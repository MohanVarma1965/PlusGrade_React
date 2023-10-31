import React from "react";
import { useTaxCalculation } from "../../customHooks/useTaxCalculation";
import { SERVER_ERROR_PREPEND_TEXT, PLEASE_TRY_AGAIN_TEXT } from "../../constants/taxConstants";
import Spinner from "../../utils/Spinner/Spinner";
import TaxFormComponent from "../TaxFormComponent/TaxFormComponent";
import Notification from "../../utils/Notifications/Notification";
import TaxDisplayComponent from "../TaxDisplayComponent/TaxDisplayComponent";
import TaxChartComponent from "../TaxChartComponent/TaxChartComponent";
import "./TaxCalculatorWrapper.css";

// Main / Wrapper component
const TaxCalcWrapperComponent: React.FC = () => {
  // Custom hook to encapsulate tax calculation logic and state management.
  const { income, setIncome, year, loading, error, taxAmounts, handleCalculate, handleSetYearChange } =
    useTaxCalculation(125000, 2022);

  return (
    <React.Fragment>
      {loading && <Spinner />}
      {/* Display error from server */}
      {error && <Notification arrMessages={[SERVER_ERROR_PREPEND_TEXT, error, PLEASE_TRY_AGAIN_TEXT]} />}
      {/* Display input fields to user and provides option to click calculate tax button */}
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
          <div className="tile">
            <TaxDisplayComponent taxAmounts={taxAmounts} income={income} />
          </div>
          <div className="tile">
            <TaxChartComponent taxAmounts={taxAmounts} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TaxCalcWrapperComponent;
