import React, { useState } from 'react';
import CuisineSelector from './CuisineSelector';
import './MealPlanner.css';

function MealPlanner() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCuisineChange = (cuisines) => {
    setSelectedCuisines(cuisines);
  };

  const handleGenerate = async () => {
    console.log("🍳 Button clicked");
    if (selectedCuisines.length === 0) {
      console.log("No cuisines selected");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/generate-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuisines: selectedCuisines }),
      });
      const data = await response.json();
      setMealPlan(data);
    } catch (err) {
      alert('Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meal-planner">
      <h2 className="section-title">🍽️ Weekly Meal Planner</h2>
      <CuisineSelector onSelect={handleCuisineChange} />

      <div className="generate-section">
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </div>

      {mealPlan && (
        <div className="meal-grid">
          {Object.entries(mealPlan).map(([day, meals]) => (
            <div key={day} className="meal-card">
              <h3>{day}</h3>
              <p><strong>Breakfast:</strong> {meals.Breakfast}</p>
              <p><strong>Lunch:</strong> {meals.Lunch}</p>
              <p><strong>Dinner:</strong> {meals.Dinner}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
