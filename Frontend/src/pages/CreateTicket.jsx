import { useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("file", file); // 🔑 MUST MATCH multer key
    }

    try {
      await api.post("/tickets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/user");
    } catch (err) {
      console.error(err);
      alert("Ticket creation failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <select name="priority" onChange={handleChange}>
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;
