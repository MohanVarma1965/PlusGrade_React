import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./TaxChartComponenet.css";

interface Props {
  taxAmounts: number[];
}

const TaxChartComponent: React.FC<Props> = ({ taxAmounts }) => {
  const taxBrackets = useSelector(
    (state: RootState) => state.taxCalculator.taxBrackets
  );

  const val = {
    labels: taxBrackets.map(
      (bracket) => `${bracket.min} - ${bracket.max || "Above"}`
    ),
    datasets: [
      {
        data: taxAmounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="tax-chart-container">
      <h3 className="tax-chart-title">Tax Breakdown</h3>
      <Bar data={val} />
    </div>
  );
};

export default TaxChartComponent;
