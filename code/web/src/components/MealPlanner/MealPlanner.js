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
    if (selectedCuisines.length === 0){console.log("No cuisines selected");return;} ;

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
    <div>
      <CuisineSelector onSelect={handleCuisineChange} />
      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Meal Plan'}
      </button>

      {mealPlan && (
        <div className="meal-plan">
          {JSON.stringify(mealPlan, null, 2)}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
