import api from "../api/axios";
import { getUserFromToken } from "../auth/auth";

function StatusUpdater({ ticket, onUpdated }) {
  const user = getUserFromToken();

  const updateStatus = async (status) => {
    try {
      await api.put(`/tickets/${ticket._id}/status`, { status });

      if (onUpdated) {
        onUpdated();
      }
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const getStatusButton = () => {
    if (user.role === "agent" && ticket.status === "assigned") {
      return (
        <button
          onClick={() => updateStatus("in-progress")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Start Working
        </button>
      );
    }

    if (user.role === "agent" && ticket.status === "in-progress") {
      return (
        <button
          onClick={() => updateStatus("resolved")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Mark Resolved
        </button>
      );
    }

    if (user.role === "user" && ticket.status === "resolved") {
      return (
        <button
          onClick={() => updateStatus("closed")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Close Ticket
        </button>
      );
    }

    return null;
  };

  return <div className="mt-3">{getStatusButton()}</div>;
}

export default StatusUpdater;