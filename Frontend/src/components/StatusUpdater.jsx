import api from "../api/axios";
import { getUserFromToken } from "../auth/auth";

function StatusUpdater({ ticket, onUpdated }) {
  const user = getUserFromToken();

  const updateStatus = async (status) => {
    try {
      await api.put(`/tickets/${ticket._id}/status`, { status });

      // 🔑 SAFETY CHECK
      if (onUpdated) {
        onUpdated();
      }
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      {user.role === "agent" && ticket.status === "assigned" && (
        <button onClick={() => updateStatus("in-progress")}>
          Start
        </button>
      )}

      {user.role === "agent" && ticket.status === "in-progress" && (
        <button onClick={() => updateStatus("resolved")}>
          Resolve
        </button>
      )}

      {user.role === "user" && ticket.status === "resolved" && (
        <button onClick={() => updateStatus("closed")}>
          Close
        </button>
      )}
    </div>
  );
}

export default StatusUpdater;
