import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    api.get("/tickets/my").then((res) => setTickets(res.data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <Navbar title="My Tickets" />
      <div className="p-6">
      <div className="bg-red-500 text-white p-4 text-2xl">Tailwind Test</div>
        <Link
          to="/tickets/create"
          className="inline-block mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          + Create Ticket
        </Link>
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onUpdated={fetchTickets}
            />
          ))}
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onUpdated={fetchTickets}
          />
        ))}
      </div>
    </>
  );
}

export default UserDashboard;
