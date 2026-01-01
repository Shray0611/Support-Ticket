import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import AgentSidebar from "../components/AgentSidebar";

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = selectedAgent
    ? tickets.filter(
        (ticket) => ticket.assignedTo?._id === selectedAgent
      )
    : tickets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar title="Admin Dashboard" />

      <div className="flex">
        {/* Sidebar */}
        <AgentSidebar
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
          onClearSelection={() => setSelectedAgent(null)}
        />

        {/* Main content */}
        <div className="flex-1 p-8">
          {/* Show all tickets button */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedAgent(null)}
              className={`px-4 py-2 rounded-lg font-medium transition
                ${
                  selectedAgent === null
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                }
              `}
            >
              Show all tickets
            </button>
          </div>

          {/* Tickets grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                onAssigned={fetchTickets}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
