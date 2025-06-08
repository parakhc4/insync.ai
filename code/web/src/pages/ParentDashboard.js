import React from "react";
import MealPlanner from "../components/MealPlanner/MealPlanner";
import NutritionScanner from "../components/MealPlanner/NutritionScanner";
import ActivityPlanner from "../components/ActivityPlanner/ActivityPlanner";

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