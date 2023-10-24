import { render } from "@testing-library/react";
import HeaderBanner from "./HeaderBanner";

describe(" Case 1: HeaderBanner />", () => {
  it("1.1 Renders the Banner component", () => {
    const { getByText, container } = render(<HeaderBanner />);

    // Check if "Tax Calculator" banner is present
    expect(getByText("Tax Calculator")).toBeInTheDocument();

    // Check if the contianers are present(by their class names)
    expect(container.querySelector(".square-one")).toBeInTheDocument();
    expect(container.querySelector(".square-two")).toBeInTheDocument();
  });
});
