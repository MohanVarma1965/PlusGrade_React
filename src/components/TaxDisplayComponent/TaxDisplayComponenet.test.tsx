import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taxCalculatorReducer from "../../redux/slices/taxCalculator/taxCalculatorSlice";
import TaxDisplayComponent from "./TaxDisplayComponent";

describe("<TaxDisplayComponent />", () => {
  // Case 1: Displaying the tax breakdown correctly
  describe("Case 1. Display tax breakdown based on provided taxAmounts and taxBrackets", () => {
    it("1.1 should correctly display the tax brackets and amounts", async () => {
      // Mock the store with taxBrackets and other necessary data
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

      // Render the TaxDisplayComponent
      const { getByText, findAllByText } = render(
        <Provider store={mockStore}>
          <TaxDisplayComponent taxAmounts={[750, 1500]} income={100000} />
        </Provider>
      );

      // 1.1 Ensure title is displayed
      expect(getByText(/Tax Breakdown by Brackets/i)).toBeInTheDocument();

      // 1.2 Ensure the first bracket is displayed correctly
      expect(getByText(/\$0 - \$5000/i)).toBeInTheDocument();

      const matchingElements = await findAllByText(/0.15/i);
      expect(matchingElements.length).toBe(2);

      expect(getByText(/\$750.00/i)).toBeInTheDocument();

      // 1.3 Ensure the second bracket is displayed correctly
      expect(getByText(/\$5000 - \$10000/i)).toBeInTheDocument();
      expect(getByText(/\$1500.00/i)).toBeInTheDocument();

      // 1.4 Ensure the total tax is displayed correctly
      expect(getByText(/Total Tax/i)).toBeInTheDocument();
      expect(getByText(/\$2250.00/i)).toBeInTheDocument();
    });
  });

  // Case 2: Handling scenarios when taxAmounts or taxBrackets might be empty
  describe("Case 2. Handle empty taxAmounts or taxBrackets", () => {
    it("2.1 should handle empty taxBrackets gracefully", () => {
      // Mock the store with empty taxBrackets
      const mockStore = configureStore({
        reducer: {
          taxCalculator: taxCalculatorReducer,
        },
        preloadedState: {
          taxCalculator: {
            loading: false,
            error: null,
            taxBrackets: [],
          },
        },
      });

      // Render the TaxDisplayComponent
      const { getByText, queryByText } = render(
        <Provider store={mockStore}>
          <TaxDisplayComponent taxAmounts={[]} income={100000} />
        </Provider>
      );

      // 2.1 Ensure title is displayed even if brackets are empty
      expect(getByText(/Tax Breakdown by Brackets/i)).toBeInTheDocument();

      // 2.2 Ensure "Total Tax" is 0 when no brackets are provided
      expect(getByText(/Total Tax/i)).toBeInTheDocument();
      expect(getByText(/\$0.00/i)).toBeInTheDocument();

      // 2.3 Negative test to ensure no random bracket data is displayed
      expect(queryByText(/\$0 - \$5000/i)).not.toBeInTheDocument();
      expect(queryByText("0.15")).not.toBeInTheDocument();
    });
  });
  // Case 3: Handling when tax bracket doesn't have the Max value
  describe("Case 3. Handling when tax bracket doesn't have the Max value", () => {
    it("3.1 Should display Above", () => {
      // Mock the store with empty taxBrackets
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
              { min: 5000, rate: 0.15 },
            ],
          },
        },
      });

      // Render the TaxDisplayComponent
      const { getByText, queryByText } = render(
        <Provider store={mockStore}>
          <TaxDisplayComponent taxAmounts={[]} income={100000} />
        </Provider>
      );

      // 3.1 Should display Above
      expect(queryByText(/Above/i)).toBeInTheDocument();
    });
  });

  // Case 4: Handling scenarios when income is 0
  describe("Case 4. Displaying effective margin correctly based on income value", () => {
    it("4.1 should display an effective margin of 0% if the income is 0", () => {
      // Mock the store with taxBrackets
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

      // Render the TaxDisplayComponent with 0 income
      const { getByText } = render(
        <Provider store={mockStore}>
          <TaxDisplayComponent taxAmounts={[750, 1500]} income={0} />
        </Provider>
      );

      // Ensure effective margin is 0%
      expect(getByText(/Effective Margin/i)).toBeInTheDocument();
      expect(getByText(/0.00%/i)).toBeInTheDocument();
    });

    it("4.2 should display the correct effective margin if the income is non-zero", () => {
      // Mock the store with taxBrackets
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

      // Render the TaxDisplayComponent with non-zero income
      const { getByText } = render(
        <Provider store={mockStore}>
          <TaxDisplayComponent taxAmounts={[750, 1500]} income={100000} />
        </Provider>
      );

      // Ensure effective margin is correctly calculated
      expect(getByText(/Effective Margin/i)).toBeInTheDocument();
      expect(getByText(/2.25%/i)).toBeInTheDocument();
    });
  });
});
