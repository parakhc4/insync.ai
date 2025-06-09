import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaCamera, FaCalendarAlt, FaArrowLeft, FaBars } from "react-icons/fa";

import MealPlanner from "../components/MealPlanner/MealPlanner";
import NutritionScanner from "../components/MealPlanner/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner/ActivityPlanner";

import "./ParentDashboard.css";
import "./DashboardLayout.css";

function ParentDashboard() {
  const navigate = useNavigate();
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
      <div className={`sidebar ${open ? "open" : "collapsed"}`}>
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/")}>
            <FaArrowLeft /> {!open ? "" : "Back"}
          </button>
          <button className="toggle-btn" onClick={() => setOpen(!open)}>
            <FaBars />
          </button>
        </div>

        <div className="nav-section">
          <button className={`nav-btn ${view === "meal" ? "active" : ""}`} onClick={() => setView("meal")}>
            <FaUtensils /> {!open ? "" : "Meal Planner"}
          </button>
          <button className={`nav-btn ${view === "nutrition" ? "active" : ""}`} onClick={() => setView("nutrition")}>
            <FaCamera /> {!open ? "" : "Nutrition Scanner"}
          </button>
          <button className={`nav-btn ${view === "activity" ? "active" : ""}`} onClick={() => setView("activity")}>
            <FaCalendarAlt /> {!open ? "" : "Activity Planner"}
          </button>
        </div>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default ParentDashboard;
