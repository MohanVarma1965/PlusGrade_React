import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taxCalculatorReducer from "../../redux/slices/taxCalculator/taxCalculatorSlice";
import TaxChartComponent from "./TaxChartComponent";

// Mocking the chart import
jest.mock("react-chartjs-2", () => ({
  Bar: () => null, // This is just a placeholder, you can modify as needed
}));

describe("<TaxChartComponent />", () => {
  //Case 1: When the state has loading set to true
  describe("Case 1. Loading state set to true", () => {
    it("1.1 should display loading state", () => {
      //Mock the store
      const mockStore = configureStore({
        reducer: {
          taxCalculator: taxCalculatorReducer,
        },
        preloadedState: {
          taxCalculator: {
            loading: true,
            error: null,
            taxBrackets: [],
          },
        },
      });
      //Render the Chart component
      const { getByText, queryByText } = render(
        <Provider store={mockStore}>
          <TaxChartComponent taxAmounts={[]} />
        </Provider>
      );

      // 1.1 Display Loading text
      expect(getByText(/Loading.../i)).toBeInTheDocument();

      // 1.2 Negative test to check title is not present
      expect(queryByText(/Tax Breakdown/i)).not.toBeInTheDocument();
    });
  });

  describe("Case 2. Error state", () => {
    it(" 2.1 When error message is set", () => {
      //Mock the store
      const mockStore = configureStore({
        reducer: {
          taxCalculator: taxCalculatorReducer,
        },
        preloadedState: {
          taxCalculator: {
            loading: false,
            error: "Something went wrong!",
            taxBrackets: [],
          },
        },
      });

      //Render the Chart component
      const { getByText, queryByText } = render(
        <Provider store={mockStore}>
          <TaxChartComponent taxAmounts={[]} />
        </Provider>
      );
      //Display the error message
      expect(getByText(/Something went wrong!/i)).toBeInTheDocument();
      //Negative test to check title is not present
      expect(queryByText(/Tax Breakdown/i)).not.toBeInTheDocument();
    });
  });

  describe("Case 3. Successful data state", () => {
    it("3.1 should display tax chart with data", () => {
      //Mock the store
      const mockStore = configureStore({
        reducer: {
          taxCalculator: taxCalculatorReducer,
        },
        preloadedState: {
          taxCalculator: {
            loading: false,
            error: null,
            taxBrackets: [
              { min: 0, max: 5000, rate: 0.15 },
              { min: 5000, max: 10000, rate: 0.15 },
            ],
          },
        },
      });

      //Render the Chart component
      const { getByText, queryByText } = render(
        <Provider store={mockStore}>
          <TaxChartComponent taxAmounts={[750, 1500]} />
        </Provider>
      );
      // Expect the title to be displayed
      expect(getByText(/Tax Breakdown/i)).toBeInTheDocument();

      // Negative test to check Error  is not present
      expect(queryByText(/Error/i)).not.toBeInTheDocument();

      // Negative test to check Loading  is not present
      expect(queryByText(/Loading/i)).not.toBeInTheDocument();
    });
  });
});
