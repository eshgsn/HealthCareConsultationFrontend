// Navbar.js
import React from 'react';
import './NavbarStyles.css';

function Navbar({ onLogout, onSelect }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">Skincare Platform</div>
      <ul className="navbar-links">
        <li onClick={() => onSelect('findDoctor')}>Find a Doctor</li>
        <li onClick={() => onSelect('scheduleAppointment')}>Schedule Appointment</li>
        <li onClick={() => onSelect('consultationStatus')}>Consultation Status</li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
