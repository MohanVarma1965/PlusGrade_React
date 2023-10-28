import { render } from "@testing-library/react";
import Notification from "./Notification";

const portalRoot = document.createElement("div");
portalRoot.setAttribute("id", "notification-root");

beforeEach(() => {
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});

// Testing the Notification componenet
describe("Case 1. Notification Component", () => {
  // 1. Base Rendering Test
  it("1.1 Renders without crashing", () => {
    render(<Notification arrMessages={[]} />);
  });

  // 2. Messages Display Test
  it("2.1 Displays provided messages", () => {
    //Render element
    const { queryByText } = render(<Notification arrMessages={["Message1", "Message2"]} />);

    expect(queryByText("Message1")).toBeInTheDocument();
    expect(queryByText("Message2")).toBeInTheDocument();
  });

  // 3. Portal Rendering Test
  it("3.1 Renders messages into the portal root", () => {
    //Render element
    render(<Notification arrMessages={["Portal Message"]} />);

    expect(portalRoot!.textContent).toContain("Portal Message");
  });

  // 4. No Messages Test
  it("4.1 Renders nothing when there are no messages", () => {
    const { container } = render(<Notification arrMessages={[]} />);
    expect(container.textContent).toBe("");
  });

  // 5. Multiple Messages Rendering
  it("5.1 Ensures each message is rendered separately", () => {
    const { container } = render(<Notification arrMessages={["MessageA", "MessageB"]} />);

    const messages = portalRoot.querySelectorAll(".notification > div");
    expect(messages).toHaveLength(2);
  });

  // 6. Messages Order Test
  it("6.1 ensures messages are rendered in the order provided", () => {
    const { container } = render(<Notification arrMessages={["First", "Second", "Third"]} />);

    const messages = portalRoot.querySelectorAll(".notification > div");
    expect(messages[0].textContent).toBe("First");
    expect(messages[1].textContent).toBe("Second");
    expect(messages[2].textContent).toBe("Third");
  });
});
