import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import "./DriverDashboard.css";

function DriverDashboard() {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved activities");
      }
    }
  }, []);

  const toggleAccepted = (idx) => {
    const updated = [...activities];
    updated[idx].accepted = !updated[idx].accepted;
    updated[idx].notified = false;
    setActivities(updated);
    localStorage.setItem("activities", JSON.stringify(updated));
  };

  return (
    <div className="driver-dashboard-wrapper">
      <div className={`sidebar ${open ? "open" : "collapsed"}`}>
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/")}>
            <FaArrowLeft />
          </button>
          <button className="toggle-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
        <div className="nav-section">
          <button className="nav-btn" disabled>
            <FaListUl />
            {open && "Activity View"}
          </button>
        </div>
      </div>

      <div className="driver-dashboard">
        <h2 className="section-title">🚗 Driver Dashboard</h2>
        <p className="description">Tap to accept assigned activities</p>

        {activities.length > 0 ? (
          <div className="activity-grid">
            {activities.map((a, idx) => (
              <div className={`activity-card ${a.accepted ? "accepted" : ""}`} key={idx}>
                <div className="activity-header">
                  <input
                    type="checkbox"
                    checked={!!a.accepted}
                    onChange={() => toggleAccepted(idx)}
                  />
                  <h4>{a.activity}</h4>
                </div>
                <div className="activity-info">
                  <span>{a.date} at {a.time}</span>
                  <span className={`status ${a.accepted ? "yes" : "no"}`}>
                    {a.accepted ? "Accepted" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No activities scheduled.</p>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
