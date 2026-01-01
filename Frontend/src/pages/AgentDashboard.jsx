import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";

function AgentDashboard() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    api.get("/tickets/assigned").then((res) => setTickets(res.data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar title="Assigned Tickets" />

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onUpdated={fetchTickets}
          />
        ))}
      </div>
    </div>
  );
}

export default AgentDashboard;
