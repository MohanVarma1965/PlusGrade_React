import { render } from "@testing-library/react";
import Spinner from "./Spinner";

// Testing the Spinner component
describe("Case 1. Spinner Component", () => {
  it("1.1 Renders without crashing", () => {
    render(<Spinner />);
  });

  it("1.2 Renders the spinner element", () => {
    const { getByTestId } = render(<Spinner />);
    const spinnerElement = getByTestId("spinner-element");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("1.3 Renders the loader inside the spinner", () => {
    const { container } = render(<Spinner />);
    const loaderElement = container.querySelector(".loader");
    expect(loaderElement).toBeTruthy();
  });

  it("1.4 Has accessibility label", () => {
    const { getByLabelText } = render(<Spinner />);
    expect(getByLabelText("Loading...")).toBeInTheDocument();
  });

  it("1.5 matches snapshot", () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
