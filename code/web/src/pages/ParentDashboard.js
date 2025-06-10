import React, { useState, useEffect } from "react";
import MealPlanner from "../components/MealPlanner/MealPlanner";
import NutritionScanner from "../components/MealPlanner/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner/ActivityPlanner";
import { FaUtensils, FaCamera, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import "./ParentDashboard.css";

function ParentDashboard() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("meal");
  const [latestNote, setLatestNote] = useState(null);
  const [showNoteBanner, setShowNoteBanner] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const acceptedActivity = localStorage.getItem("driverAcceptedActivity");
  if (acceptedActivity) {
    const event = JSON.parse(acceptedActivity);
    const note = `Driver accepted: ${event.activity} on ${event.date} at ${event.time}`;
    setLatestNote({ text: note });
    setShowNoteBanner(true);
    setTimeout(() => {
      setShowNoteBanner(false);
      localStorage.removeItem("driverAcceptedActivity");
    }, 5000);
  }
}, []);

  useEffect(() => {
    const saved = localStorage.getItem("cookNotes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const last = parsed[parsed.length - 1];
        if (last && last.text !== localStorage.getItem("lastSeenNote")) {
          setLatestNote(last);
          setShowNoteBanner(true);
          localStorage.setItem("lastSeenNote", last.text);
          setTimeout(() => setShowNoteBanner(false), 5000);
        }
      } catch {
        console.error("Couldn't parse cook notes");
      }
    }
  }, []);

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
    <>
      {showNoteBanner && latestNote && (
        <div className="cook-note-banner">
          📝 <strong>{latestNote.text}</strong>
        </div>
      )}

      <div className="parent-dashboard">
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
            <button className="nav-btn" onClick={() => setView("meal")}>
              <FaUtensils /> {open && "Meal Planner"}
            </button>
            <button className="nav-btn" onClick={() => setView("nutrition")}>
              <FaCamera /> {open && "Nutrition Scanner"}
            </button>
            <button className="nav-btn" onClick={() => setView("activity")}>
              <FaCalendarAlt /> {open && "Activity Planner"}
            </button>
          </div>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </>
  );
}

export default ParentDashboard;
