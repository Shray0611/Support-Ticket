import { useEffect, useState } from "react";
import api from "../api/axios";

function AssignAgent({ ticketId, onAssigned }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    api.get("/users/agents").then(res => {
      setAgents(res.data);
    });
  }, []);

  const handleAssign = async () => {
    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }

    try {
      await api.put(`/tickets/${ticketId}/assign`, {
        agentId: selectedAgent,
      });

      alert("Ticket assigned successfully");
      onAssigned();
    } catch (err) {
      console.error(err.response?.data);
      alert("Assignment failed");
    }
  };

  return (
    <div className="mt-3 flex gap-2">
      <select
        className="border p-2 rounded"
        defaultValue=""
        onChange={(e) => setSelectedAgent(e.target.value)}
      >
        <option value="" disabled>
          Select agent
        </option>
        {agents.map((agent) => (
          <option key={agent._id} value={agent._id}>
            {agent.email}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="px-3 py-2 bg-indigo-600 text-white rounded"
      >
        Assign
      </button>
    </div>
  );
}

export default AssignAgent;
