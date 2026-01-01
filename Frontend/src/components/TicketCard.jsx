import AssignAgent from "./AssignAgent";
import StatusUpdater from "./StatusUpdater";
import Comments from "./Comments";
import { getUserFromToken } from "../auth/auth";

function TicketCard({ ticket, onUpdated, onAssigned }) {
  const user = getUserFromToken();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg">{ticket.title}</h3>
      <p className="text-sm text-gray-600">{ticket.description}</p>

      <p className="mt-2 text-sm">
        Status: <b>{ticket.status}</b>
      </p>

      {user.role === "admin" && ticket.status === "open" && (
        <AssignAgent ticketId={ticket._id} onAssigned={onAssigned} />
      )}

      {(user.role === "agent" || user.role === "user") && (
        <StatusUpdater ticket={ticket} onUpdated={onUpdated} />
      )}

      <Comments ticketId={ticket._id} />
    </div>
  );
}

export default TicketCard;
