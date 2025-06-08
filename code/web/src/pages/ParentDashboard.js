import React from "react";
import MealPlanner from "../components/MealPlanner/MealPlanner";
import NutritionScanner from "../components/MealPlanner/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner/ActivityPlanner";
import "./DashboardLayout.css";

function ParentDashboard() {
    return (
        <div className="dashboard">
            <MealPlanner />
            <NutritionScanner />
            <ActivityPlanner />
        </div>
    );
}

export default ParentDashboard;