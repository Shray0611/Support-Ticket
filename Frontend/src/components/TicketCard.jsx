import AssignAgent from "./AssignAgent";
import StatusUpdater from "./StatusUpdater";
import Comments from "./Comments";
import { getUserFromToken } from "../auth/auth";

function TicketCard({ ticket, onUpdated, onAssigned }) {
  const user = getUserFromToken();

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-yellow-100 text-yellow-800 border-yellow-200",
      assigned: "bg-blue-100 text-blue-800 border-blue-200",
      "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      closed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-bold">{ticket.title}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
            {ticket.status.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{ticket.description}</p>

        {user.role === "admin" && ticket.status === "open" && (
          <AssignAgent
            ticketId={ticket._id}
            onAssigned={onAssigned || (() => {})} // 🔑 SAFE
          />
        )}

        {(user.role === "agent" || user.role === "user") && (
          <StatusUpdater ticket={ticket} onUpdated={onUpdated || (() => {})} />
        )}

        <Comments ticketId={ticket._id} />
      </div>
    </div>
  );
}

export default TicketCard;
