import React from "react";
import "./TaxFormComponent.css";

interface TaxFormProps {
  income: number;
  year: number;
  setIncome: (income: number) => void;
  setYear: (year: number) => void;
  handleCalculate: () => void;
  loading: boolean;
}

const TaxFormComponent: React.FC<TaxFormProps> = ({ income, year, setIncome, setYear, handleCalculate, loading }) => {
  return (
    <form className="tax-form">
      <div className="input-group">
        <label htmlFor="annualIncome" className="input-label">
          Annual Income:
        </label>
        <input
          id="annualIncome"
          type="number"
          value={income}
          className="input-field"
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="taxYear" className="input-label">
          Tax Year:
        </label>
        <select id="taxYear" className="dropdown" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
        </select>
      </div>

      <button className="calculate-button" onClick={handleCalculate} disabled={loading}>
        Calculate Tax
      </button>
    </form>
  );
};

export default TaxFormComponent;
