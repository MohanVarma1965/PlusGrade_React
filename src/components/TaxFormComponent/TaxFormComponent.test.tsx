import { render, fireEvent } from "@testing-library/react";
import TaxFormComponent from "./TaxFormComponent";

// Testing the TaxFormComponent
describe("Case 1. TaxFormComponent", () => {
  // 1. Base Rendering Test
  it("1.1 Renders without crashing", () => {
    const mockProps = {
      income: 10000,
      year: 2022,
      setIncome: jest.fn(),
      setYear: jest.fn(),
      handleCalculate: jest.fn(),
      loading: false,
    };
    render(<TaxFormComponent {...mockProps} />);
  });

  // 2. Income Input Change Test
  it("1.2 Updates income value when changed", () => {
    const mockProps = {
      income: 10000,
      year: 2022,
      setIncome: jest.fn(),
      setYear: jest.fn(),
      handleCalculate: jest.fn(),
      loading: false,
    };

    const { getByLabelText } = render(<TaxFormComponent {...mockProps} />);
    const input = getByLabelText("Annual Income:");
    fireEvent.change(input, { target: { value: "20000" } });
    expect(mockProps.setIncome).toHaveBeenCalledWith(20000);
  });

  // 3. Year Dropdown Change Test
  it("1.3 Updates tax year value when changed", () => {
    const mockProps = {
      income: 10000,
      year: 2022,
      setIncome: jest.fn(),
      setYear: jest.fn(),
      handleCalculate: jest.fn(),
      loading: false,
    };

    const { getByLabelText } = render(<TaxFormComponent {...mockProps} />);
    const select = getByLabelText("Tax Year:");
    fireEvent.change(select, { target: { value: "2021" } });
    expect(mockProps.setYear).toHaveBeenCalledWith(2021);
  });

  // 4. Calculate Button Click Test
  it("1.4 Calls handleCalculate when Calculate Tax button is clicked", () => {
    const mockProps = {
      income: 10000,
      year: 2022,
      setIncome: jest.fn(),
      setYear: jest.fn(),
      handleCalculate: jest.fn(),
      loading: false,
    };

    const { getByText } = render(<TaxFormComponent {...mockProps} />);
    const button = getByText("Calculate Tax");
    fireEvent.click(button);
    expect(mockProps.handleCalculate).toHaveBeenCalledTimes(1);
  });

  // 5. Button Disabled Test
  it("1.5 Disables the Calculate Tax button when loading is true", () => {
    const mockProps = {
      income: 10000,
      year: 2022,
      setIncome: jest.fn(),
      setYear: jest.fn(),
      handleCalculate: jest.fn(),
      loading: true,
    };

    const { getByText } = render(<TaxFormComponent {...mockProps} />);
    const button = getByText("Calculate Tax");

    expect(button).toBeDisabled();
  });
});
