import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import "./TaxDisplayComponenet.css";

interface Props {
  taxAmounts: number[];
}

const TaxDisplayComponent: React.FC<Props> = ({ taxAmounts }) => {
  const taxBrackets = useSelector((state: RootState) => state.taxCalculator.taxBrackets);
  // Ensure taxAmounts contains only valid numbers
  const validTaxAmounts = taxAmounts.filter((amount) => typeof amount === "number");
  // Ensuring the accumulator only gets valid data
  const total = validTaxAmounts.reduce((acc, current) => acc + current, 0);

  return (
    <div className="tax-display-container">
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
        <div className="total-label">Total Tax</div>
        <div className="tax-rate"></div> {/* empty place holder */}
        <div className="total-value">${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TaxDisplayComponent;
