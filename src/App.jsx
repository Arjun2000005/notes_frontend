import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./config";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  useEffect(() => {
    axios.get(`${API_BASE}/notes`).then((res) => setNotes(res.data));
  }, []);

  // Add note
  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;
    await axios.post(`${API_BASE}/notes`, { title, content });
    const res = await axios.get(`${API_BASE}/notes`);
    setNotes(res.data);
    setTitle("");
    setContent("");
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API_BASE}/notes/${id}`);
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>📒 Notes App</h1>

      {/* Add Note Form */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
      />
      <button onClick={addNote} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Add Note
      </button>

      {/* Notes List */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {notes.map((note) => (
          <li key={note.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
