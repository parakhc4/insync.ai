import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";
import SidebarBackOnly from "../components/common/SidebarBackOnly";
import "./CookDashboard.css";

function CookDashboard() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

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
      <SidebarBackOnly />
      <div className="cook-dashboard">
        <h2>Cook's Notes</h2>
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
