import { useEffect, useState } from "react";
import api from "../api/axios";

function AgentSidebar({ selectedAgent, onSelectAgent, onClearSelection }) {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get("/users/agents-with-count").then((res) => {
      setAgents(res.data);
    });
  }, []);

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
          />
        </svg>
        Agents
      </h3>

      <div className="space-y-3">
        {agents.map((agent) => {
          const isActive = selectedAgent === agent._id;

          return (
            <button
              key={agent._id}
              onClick={() => onSelectAgent(agent._id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 shadow-sm
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                }
              `}
            >
              <p className={`font-semibold ${isActive ? "text-white" : "text-gray-900"}`}>
                {agent.name || agent.email}
              </p>

              <p className={`text-sm mt-1 ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                Tickets assigned:{" "}
                <span className="font-medium">{agent.ticketCount}</span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AgentSidebar;
