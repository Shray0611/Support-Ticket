import { useEffect, useState } from "react";
import api from "../api/axios";

function AssignAgent({ ticketId, onAssigned }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

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
    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <label className="block text-sm font-medium text-blue-900 mb-2">
        Assign to Agent
      </label>
      <div className="flex gap-2">
        <select
          className="flex-1 border border-blue-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          <option value="">Select agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.email}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Assign
        </button>
      </div>
    </div>
  );
}

export default AssignAgent;