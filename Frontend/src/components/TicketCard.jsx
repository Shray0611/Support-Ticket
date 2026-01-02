import AssignAgent from "./AssignAgent";
import StatusUpdater from "./StatusUpdater";
import Comments from "./Comments";
import { getUserFromToken } from "../auth/auth";

function TicketCard({ ticket, onUpdated, onAssigned }) {
  const user = getUserFromToken();

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-blue-100 text-blue-800 border-blue-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      high: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-yellow-100 text-yellow-800 border-yellow-200",
      assigned: "bg-blue-100 text-blue-800 border-blue-200",
      "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      closed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status] || colors.open;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
      <div className="p-6 space-y-4">

        {/* Title & Status */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">
            {ticket.title}
          </h3>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
              ticket.status
            )}`}
          >
            {ticket.status.toUpperCase()}
          </span>
        </div>

        {/* Created by (Admin & Agent only) */}
        {(user.role === "admin" || user.role === "agent") && ticket.createdBy && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Reported by:</span>{" "}
            {ticket.createdBy.name} ({ticket.createdBy.email})
          </p>
        )}

        {/* Assigned Agent */}
        {ticket.assignedTo && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Assigned to:</span>{" "}
            {ticket.assignedTo.name} ({ticket.assignedTo.email})
          </p>
        )}

        {/* Description */}
        <p className="text-gray-600">
          {ticket.description}
        </p>

        {/* Category & Priority */}
        <div className="flex flex-wrap gap-2">
          {ticket.category && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-gray-100 text-gray-800 border-gray-200">
              Category: {ticket.category}
            </span>
          )}

          {ticket.priority && (
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                ticket.priority
              )}`}
            >
              Priority: {ticket.priority.toUpperCase()}
            </span>
          )}
        </div>

        {/* Admin Assign */}
        {user.role === "admin" && ticket.status === "open" && (
          <AssignAgent
            ticketId={ticket._id}
            onAssigned={onAssigned || (() => {})}
          />
        )}

        {/* Status Update */}
        {(user.role === "agent" || user.role === "user") && (
          <StatusUpdater
            ticket={ticket}
            onUpdated={onUpdated || (() => {})}
          />
        )}

        {/* Comments */}
        <Comments ticketId={ticket._id} />
      </div>
    </div>
  );
}

export default TicketCard;
