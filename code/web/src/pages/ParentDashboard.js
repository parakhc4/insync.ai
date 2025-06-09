import React, { useState } from "react";
import MealPlanner from "../components/MealPlanner/MealPlanner";
import NutritionScanner from "../components/MealPlanner/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner/ActivityPlanner";
import "./DashboardLayout.css";
import "./ParentDashboard.css";

function ParentDashboard() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("meal");

  const renderContent = () => {
    switch (view) {
      case "nutrition":
        return <NutritionScanner />;
      case "activity":
        return <ActivityPlanner />;
      default:
        return <MealPlanner />;
    }
  };

  return (
    <div className="parent-dashboard">
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button className="toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <button className="nav-btn" onClick={() => setView("meal")}>Meal Planner</button>
        <button className="nav-btn" onClick={() => setView("nutrition")}>Nutrition Scanner</button>
        <button className="nav-btn" onClick={() => setView("activity")}>Activity Planner</button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default ParentDashboard;
