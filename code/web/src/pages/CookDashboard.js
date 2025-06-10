import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import "./CookDashboard.css";

function CookDashboard() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cookNotes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        console.error("Failed to parse cook notes");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cookNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    const newNotes = [...notes, { text: note.trim(), time: new Date().toLocaleString() }];
    setNotes(newNotes);
    setNote("");
  };

  return (
    <div className="dashboard">
      <div className={`sidebar open`}>
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/")}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="nav-section">
          <button className="nav-btn" disabled>
            <FaListUl />
            Cook View
          </button>
        </div>
      </div>

      <div className="dashboard-content-box cook-dashboard">
        <h2>🍳 Cook's Notes</h2>
        <p>Add any kitchen updates or requests for the parent here.</p>

        <form onSubmit={addNote} className="cook-note-form">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Need more tomatoes"
          />
          <button type="submit">Add Note</button>
        </form>

        {notes.length > 0 && (
          <div className="cook-notes-list">
            <h4>Past Notes</h4>
            <ul>
              {notes.map((n, idx) => (
                <li key={idx}>
                  <strong>{n.text}</strong>
                  <span className="timestamp">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookDashboard;
