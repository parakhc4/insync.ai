import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaUtensils, FaCarSide } from 'react-icons/fa';
import './Home.css';
import { Typewriter } from 'react-simple-typewriter';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">InSync.AI</h1>
      <p className="home-subtitle">
        <Typewriter
          words={[
            'Helping your family stay InSync',
            'Plan meals, track schedules, and more',
            'One home. One dashboard. All roles.'
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
    </p>

      <div className="button-grid">
        <button className="role-button parent" onClick={() => navigate('/parent')}>
          <FaUserTie size={24} /> Parent
        </button>
        <button className="role-button cook" onClick={() => navigate('/cook')}>
          <FaUtensils size={24} /> Cook Dashboard
        </button>
        <button className="role-button driver" onClick={() => navigate('/driver')}>
          <FaCarSide size={24} /> Driver Dashboard
        </button>
      </div>
    </div>
  );
}

export default Home;
