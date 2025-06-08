import React from "react";
import "./DashboardLayout.css";

function CookDashboard() {
    return (
        <div className="dashboard">
            <h2>Cook Dashboard</h2>
            <p>Welcome to the Cook Dashboard! Here you can manage your cooking activities, view recipes, and plan meals.</p>
            {/* Additional components like RecipeList, MealPlanner, etc. can be added here */}
        </div>
    );
}

export default CookDashboard;