import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./TaxChartComponenet.css";

interface Props {
  taxAmounts: number[];
}

const TaxChartComponent: React.FC<Props> = ({ taxAmounts }) => {
  // Grab the values from state
  const { taxBrackets, loading, error } = useSelector((state: RootState) => state.taxCalculator);

  // This component will not be reached if loading or error is true,
  // however below loops will handle those cases incase this component is executed
  // If Loading is set to true return a label Loading
  if (loading) {
    return <div className="tax-chart-container">Loading...</div>;
  }
  // If error is present, show the error message
  if (error) {
    return <div className="tax-chart-container">Error: {error}</div>;
  }
  // Preparing object suitable to chart library
  const val = {
    labels: taxBrackets.map((bracket) => `${bracket.min} - ${bracket.max || "Above"}`),
    datasets: [
      {
        data: taxAmounts,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
      },
    ],
  };
  //Return the componenet with the Chart
  return (
    <div className="tax-chart-container">
      <h3 className="tax-chart-title">Tax Breakdown</h3>
      <Bar data={val} />
    </div>
  );
};

export default TaxChartComponent;
