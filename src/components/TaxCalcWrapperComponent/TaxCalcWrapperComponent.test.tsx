import React from "react";
import { render, screen } from "@testing-library/react";
import TaxCalcWrapperComponent from "./TaxCalcWrapperComponent";
import { useTaxCalculation } from "../../customHooks/useTaxCalculation";

// Mock the custom hook and child components
jest.mock("../../customHooks/useTaxCalculation");
const mockedUseTaxCalculation = useTaxCalculation as jest.MockedFunction<typeof useTaxCalculation>;

jest.mock("../TaxDisplayComponent/TaxDisplayComponent");
jest.mock("../TaxChartComponent/TaxChartComponent");

jest.mock("../../utils/Notifications/Notification", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-notification">Mocked Notification</div>,
  };
});

const mockDefaultValues = {
  income: 125000,
  year: 2022,
  setIncome: jest.fn(),
  loading: false,
  error: null,
  taxAmounts: [],
  handleCalculate: jest.fn(),
  handleSetYearChange: jest.fn(),
};

describe("Case 1. TaxCalcWrapperComponent", () => {
  beforeEach(() => {
    mockedUseTaxCalculation.mockImplementation(() => mockDefaultValues);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("1.1 Renders Component", () => {
    render(<TaxCalcWrapperComponent />);
    expect(screen.getByTestId("tax-form-component")).toBeInTheDocument();
  });

  it("1.2 Displays Spinner when loading", () => {
    mockedUseTaxCalculation.mockReturnValueOnce({
      ...mockDefaultValues,
      loading: true,
    });
    render(<TaxCalcWrapperComponent />);
    expect(screen.queryByTestId("spinner-element")).toBeInTheDocument();
  });

  it("1.3 Displays Notification when an error occurs", () => {
    mockedUseTaxCalculation.mockReturnValueOnce({
      ...mockDefaultValues,
      error: "Error",
    });
    render(<TaxCalcWrapperComponent />);
    expect(screen.queryByTestId("mocked-notification")).toBeInTheDocument();
  });

  it("1.4 Renders TaxFormComponent with the right income and year", () => {
    render(<TaxCalcWrapperComponent />);

    const incomeInput = screen.getByLabelText("Annual Income:");
    expect(incomeInput).toHaveValue(125000);

    const yearDropdown = screen.getByLabelText("Tax Year:");
    expect(yearDropdown).toHaveValue("2022");
  });

  it("1.5 Does not render TaxDisplayComponent and TaxChartComponent when there is an error", () => {
    mockedUseTaxCalculation.mockReturnValueOnce({
      ...mockDefaultValues,
      error: "Some error",
      taxAmounts: [10000, 20000],
    });
    render(<TaxCalcWrapperComponent />);
    expect(screen.queryByTestId("tax-display-component")).toBeNull();
    expect(screen.queryByTestId("tax-chart-component")).toBeNull();
  });

  it("1.6 Does not render TaxDisplayComponent and TaxChartComponent when tax amounts length is zero", () => {
    render(<TaxCalcWrapperComponent />);
    expect(screen.queryByTestId("tax-display-component")).toBeNull();
    expect(screen.queryByTestId("tax-chart-component")).toBeNull();
  });
});
