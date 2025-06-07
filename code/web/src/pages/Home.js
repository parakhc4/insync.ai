// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to FamilyApp</h1>
      <p>Select your role:</p>
      <button onClick={() => navigate('/parent')}>Parent</button>
      <button onClick={() => navigate('/cook')} style={{ marginLeft: '10px' }}>Cook</button>
      <button onClick={() => navigate('/driver')} style={{ marginLeft: '10px' }}>Driver</button>
    </div>
  );
}

export default Home;