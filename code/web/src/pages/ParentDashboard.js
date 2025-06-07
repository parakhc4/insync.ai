import React from "react";
import MealPlanner from "../components/MealPlanner";
import NutritionScanner from "../components/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner";

function ParentDashboard() {
    return (
        <div> 
            <MealPlanner/>
            <NutritionScanner/>
            <ActivityPlanner/>
        </div>
    );
}

export default ParentDashboard;