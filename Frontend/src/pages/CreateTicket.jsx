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
  const isSubmittingRef = useRef(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
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
      alert("Ticket creation failed");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    /* FULL PAGE CENTERING — independent of parent layout */
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-5 text-white">
          <h2 className="text-xl font-bold">Create Support Ticket</h2>
          <p className="text-blue-100 text-sm mt-1">
            Submit an issue and our team will help you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              required
              placeholder="Short summary of the issue"
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the issue in detail"
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                placeholder="e.g. Login, Payment"
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attachment (optional)
            </label>

            <label className="flex items-center justify-center w-full px-4 py-5 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 transition bg-blue-50">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div className="text-center">
                <p className="text-sm text-gray-700 font-medium">
                  {file ? file.name : "Click to upload a file"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, PDF supported
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/3 py-2.5 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
