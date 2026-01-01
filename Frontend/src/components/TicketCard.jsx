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
      {ticket.attachments?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-semibold">Attachments:</p>
          {ticket.attachments.map((file, i) => (
            <a
              key={i}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View File
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketCard;
