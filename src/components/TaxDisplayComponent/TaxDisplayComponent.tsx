import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import "./TaxDisplayComponenet.css";

interface Props {
  taxAmounts: number[];
  income: number;
}

const TaxDisplayComponent: React.FC<Props> = ({ taxAmounts, income }) => {
  const taxBrackets = useSelector((state: RootState) => state.taxCalculator.taxBrackets);
  // Ensure taxAmounts contains only valid numbers
  const validTaxAmounts = taxAmounts.filter((amount) => typeof amount === "number");
  // Ensuring the accumulator only gets valid data
  const total = validTaxAmounts.reduce((acc, current) => acc + current, 0);

  // Check if income is 0 or NaN
  const effectiveMargin = income !== 0 && !isNaN(income) ? (total / income) * 100 : 0;

  return (
    <div className="tax-display-container" data-testid="tax-display-component">
      <div className="summary-section">
        <div className="summary-item">
          <label>Effective Margin</label>
          <span>{effectiveMargin.toFixed(2)}%</span>
        </div>
        <div className="summary-item">
          <label>Total Taxes</label>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <h3 className="tax-title">Tax Breakdown by Brackets</h3>
      <div className="tax-grid">
        <div className="header">Tax Bracket</div>
        <div className="header">Tax Margin %</div>
        <div className="header">Tax Amount</div>
        {taxBrackets.map((bracket, index) => (
          <React.Fragment key={index}>
            <div className="bracket-range">{`$${bracket.min} - $${bracket.max || "Above"}`}</div>
            <div className="tax-rate">{bracket.rate || "N/A"}</div>
            <div className="tax-amount">${taxAmounts[index] ? taxAmounts[index].toFixed(2) : "0.00"}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TaxDisplayComponent;
