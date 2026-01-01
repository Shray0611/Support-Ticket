import { useEffect, useState } from "react";
import api from "../api/axios";

function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`/comments/${ticketId}`)
      .then(res => setComments(res.data));
  }, [ticketId]);

  const addComment = async () => {
    if (!text.trim()) return;
    
    await api.post(`/comments/${ticketId}`, { message: text });
    setText("");
    const res = await api.get(`/comments/${ticketId}`);
    setComments(res.data);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Comments
      </h4>

      <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <div key={c._id} className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-sm">
              <span className="font-semibold text-blue-600">{c.author.name}:</span>
              <span className="text-gray-700 ml-2">{c.message}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addComment()}
        />

        <button
          onClick={addComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Comments;