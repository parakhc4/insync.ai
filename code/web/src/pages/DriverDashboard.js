import React, { useState, useEffect } from "react";
import SidebarBackOnly from "../components/common/SidebarBackOnly";
import "./DashboardLayout.css";

function DriverDashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('activities');
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved activities');
      }
    }
  }, []);

  return (
    <div className="parent-dashboard">
      <SidebarBackOnly />
      <div className="content">
        <h2>Driver Dashboard</h2>
        <p>View child pickup/drop schedule here.</p>
        {activities.length > 0 ? (
          <ul>
            {activities.map((a, idx) => (
              <li key={idx}>{`${a.activity} - ${a.date} ${a.time}`}</li>
            ))}
          </ul>
        ) : (
          <p>No activities scheduled.</p>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
