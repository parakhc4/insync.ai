import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";
import "./DriverDashboard.css";
import SidebarBackOnly from "../components/common/SidebarBackOnly";

function DriverDashboard() {
  const [activities, setActivities] = useState([]);

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
    updated[idx].notified = false; // Trigger for ParentDashboard
    setActivities(updated);
    localStorage.setItem("activities", JSON.stringify(updated));
  };

  return (
    <div className="driver-dashboard">
      <SidebarBackOnly/>
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
  );
}

export default DriverDashboard;
