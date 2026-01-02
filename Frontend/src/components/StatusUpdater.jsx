import api from "../api/axios";
import { getUserFromToken } from "../auth/auth";

function StatusUpdater({ ticket, onUpdated }) {
  const user = getUserFromToken();

  const updateStatus = async (status) => {
    try {
      await api.put(`/tickets/${ticket._id}/status`, { status });
      onUpdated && onUpdated();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  // AGENT ACTIONS
  if (user.role === "agent" && ticket.status === "assigned") {
    return (
      <button
        onClick={() => updateStatus("in-progress")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Start Working
      </button>
    );
  }

  if (user.role === "agent" && ticket.status === "in-progress") {
    return (
      <button
        onClick={() => updateStatus("resolved")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Mark Resolved
      </button>
    );
  }

  // USER ACTIONS (IMPORTANT PART)
  if (user.role === "user" && ticket.status === "resolved") {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => updateStatus("closed")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Close Ticket
        </button>

        <button
          onClick={() => updateStatus("open")}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Reopen Ticket
        </button>
      </div>
    );
  }

  return null;
}

export default StatusUpdater;
