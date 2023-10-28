import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./TaxChartComponenet.css";

//Interface for Props
interface Props {
  taxAmounts: number[];
}

// TaxChartComponent functional component
const TaxChartComponent: React.FC<Props> = ({ taxAmounts }) => {
  // Use the useSelector hook to retrieve state from the Redux store
  const { taxBrackets, loading, error } = useSelector((state: RootState) => state.taxCalculator);
  // Local state to manage the type of chart displayed (Bar or Line)
  const [chartType, setChartType] = useState<"Bar" | "Line">("Bar");
  // Handler function to update the chart type
  const handleChartTypeChange = (selectedChartType: string) => {
    setChartType(selectedChartType as "Bar" | "Line");
  };

  // Prepare the data for the chart based on tax brackets and amounts
  const chartData = {
    labels: taxBrackets.map((bracket) => `${bracket.min} - ${bracket.max || "Above"}`),
    datasets: [
      {
        data: taxAmounts,
        label: "Tax break down by brackets",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
      },
    ],
  };

  // Render the appropriate chart based on the selected type (Bar or Line)
  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar data={chartData} />;
      case "Line":
        return <Line data={chartData} />;
      default:
        return <Bar data={chartData} />;
    }
  };

  return (
    <div className="tax-chart-container" data-testid="tax-chart-component">
      <div className="chart-selection-container">
        <label htmlFor="chartType" className="chart-type-label">
          Select Chart Type
        </label>
        <select id="chartType" className="chart-type-select" onChange={(e) => handleChartTypeChange(e.target.value)}>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>

      {/* Display loading or error messages based on Redux state*/}
      {loading && <div className="tax-chart-loading">Loading...</div>}
      {error && <div className="tax-chart-error">Error: {error}</div>}
      {/* Render the chart if there's no error or loading state*/}
      {!loading && !error && renderChart()}
    </div>
  );
};

export default TaxChartComponent;
