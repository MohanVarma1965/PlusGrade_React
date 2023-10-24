import ReactDOM from "react-dom";
import "./Notification.css";

//Interface defining the props for the Notification component.
interface NotificationProps {
  arrMessages: string[];
}

/**
 * A Notification component that displays a list of messages.
 * Uses React Portals to render the notifications outside the parent DOM hierarchy,
 * Can be used for overlays, modals, etc.
 */
const Notification: React.FC<NotificationProps> = ({ arrMessages }) => {
  return ReactDOM.createPortal(
    <div className="notification">
      {arrMessages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>,
    // Target DOM node to which the Notification component will be appended using React Portal
    document.getElementById("notification-root")!
  );
};

export default Notification;
