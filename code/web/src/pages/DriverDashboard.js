import React from "react";

function DriverDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Driver Dashboard</h2>
      <p>View child pickup/drop schedule here.</p>
      {/* Will connect to ActivityPlanner component in read-only mode */}
    </div>
  );
}
export default DriverDashboard;