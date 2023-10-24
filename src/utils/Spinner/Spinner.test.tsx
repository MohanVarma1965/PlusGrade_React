import { render } from "@testing-library/react";
import Spinner from "./Spinner";

// Testing the Spinner component
describe("Case 1. Spinner Component", () => {
  // 1. Base Rendering Test
  it("1.1 Renders without crashing", () => {
    // Render the Spinner component with 'visible' set to false
    render(<Spinner visible={false} />);
  });

  // 2. Spinner Visibility Test
  it("2.1 Displays spinner when 'visible' prop is true", () => {
    // Render the Spinner component with 'visible' set to true
    const { getByTestId } = render(<Spinner visible={true} />);

    // Expect spinner element to be present in the document
    const spinnerElement = getByTestId("spinner-element");
    expect(spinnerElement).toBeInTheDocument();
  });

  // 3. Spinner Invisibility Test
  it("3.1 Does not display spinner when 'visible' prop is false", () => {
    // Render the Spinner component with 'visible' set to false
    const { queryByTestId } = render(<Spinner visible={false} />);

    // Expect spinner element to not be present in the document
    const spinnerElement = queryByTestId("spinner-element");
    expect(spinnerElement).toBeNull();
  });

  // 4. Spinner Classname Test
  it("4.1 Has the correct classname when visible", () => {
    // Render the Spinner component with 'visible' set to true
    const { getByTestId } = render(<Spinner visible={true} />);

    // Expect spinner element to have the 'center-spinner' class
    const spinnerElement = getByTestId("spinner-element");
    expect(spinnerElement).toHaveClass("center-spinner");
  });
});
