import ReactDOM from "react-dom";
import "./Notification.css";

interface NotificationProps {
  arrMessages: string[];
}

const Notification: React.FC<NotificationProps> = ({ arrMessages }) => {
  return ReactDOM.createPortal(
    <div className="notification">
      {arrMessages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>,
    document.getElementById("notification-root")!
  );
};

export default Notification;
