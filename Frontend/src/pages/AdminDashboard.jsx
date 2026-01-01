import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    api.get("/tickets").then((res) => setTickets(res.data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <Navbar title="All Tickets (Admin)" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onAssigned={fetchTickets} // 🔑 pass refresh
          />
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
