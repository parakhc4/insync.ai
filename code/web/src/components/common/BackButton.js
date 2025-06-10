// src/components/Common/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate('/')}>
      <FaArrowLeft style={{ marginRight: 6 }} /> Back
    </button>
  );
}

export default BackButton;
