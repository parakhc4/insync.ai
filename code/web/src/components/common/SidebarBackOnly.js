// src/components/Common/SidebarBackOnly.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './SidebarBackOnly.css';

function SidebarBackOnly() {
  const navigate = useNavigate();

  return (
    <div className="sidebar sidebar-back">
      <button className="nav-btn back-btn" onClick={() => navigate('/')}>
        <FaArrowLeft style={{ marginRight: 8 }} /> Back
      </button>
    </div>
  );
}

export default SidebarBackOnly;
