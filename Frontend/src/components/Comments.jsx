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
    await api.post(`/comments/${ticketId}`, { message: text });
    setText("");
    const res = await api.get(`/comments/${ticketId}`);
    setComments(res.data);
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>

      {comments.map(c => (
        <div key={c._id} className="text-sm mb-1">
          <b>{c.author.name}:</b> {c.message}
        </div>
      ))}

      <input
        className="border p-2 w-full rounded mt-2"
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={addComment}
        className="mt-2 px-3 py-2 bg-green-600 text-white rounded"
      >
        Send
      </button>
    </div>
  );
}

export default Comments;
