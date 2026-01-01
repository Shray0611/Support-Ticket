import { useState, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const isSubmittingRef = useRef(false); // 🔑 FIX

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) return; // 🔑 prevent double submit
    isSubmittingRef.current = true;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("file", file);
    }

    try {
      await api.post("/tickets", formData);
      navigate("/user");
    } catch (err) {
      console.error(err);
      alert("Ticket creation failed");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-xl w-full p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" onChange={handleChange} required className="w-full input" />
          <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full input" />
          <input name="category" placeholder="Category" onChange={handleChange} className="w-full input" />
          <select name="priority" onChange={handleChange} className="w-full input">
            <option value="">Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
