// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to FamilyApp</h1>
      <p>Select your role:</p>
      <div className="role-buttons">
        <button className="primary-btn" onClick={() => navigate('/parent')}>Parent</button>
        <button className="primary-btn" onClick={() => navigate('/cook')}>Cook</button>
        <button className="primary-btn" onClick={() => navigate('/driver')}>Driver</button>
      </div>
    </div>
  );
}

export default Home;