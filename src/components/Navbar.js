
// Navbar.js
// import React from 'react';
// import './NavbarStyles.css';

// function Navbar({ onLogout, onSelect, userRole }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-title">Skincare Platform</div>
//       <ul className="navbar-links">
//         {userRole === 'doctor' ? (
//           <li onClick={() => onSelect('consultationRequests')}>Consultation Requests</li>
//         ) : (
//           <>
//             <li onClick={() => onSelect('findDoctor')}>Find a Doctor</li>
//             <li onClick={() => onSelect('scheduleAppointment')}>Schedule Appointment</li>
//             <li onClick={() => onSelect('consultationStatus')}>Consultation Status</li>
//           </>
//         )}
//       </ul>
//       <button className="logout-btn" onClick={onLogout}>Logout</button>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import './NavbarStyles.css';

function Navbar({ onLogout, onSelect, userRole }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-title">Skincare Platform</div>
        <ul className="navbar-links">
          {userRole === 'doctor' ? (
            <li onClick={() => onSelect('consultationRequests')}>Consultation Requests</li>
          ) : (
            <>
              <li onClick={() => onSelect('findDoctor')}>Find a Doctor</li>
              <li onClick={() => onSelect('scheduleAppointment')}>Schedule Appointment</li>
              <li onClick={() => onSelect('consultationStatus')}>Consultation Status</li>
            </>
          )}
        </ul>
      </div>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
