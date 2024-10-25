

// App.js
import React, { useState } from 'react';
import './components/FormStyles.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state between login and registration
  const [role, setRole] = useState('patient'); // Role state for registration

  const toggleSwitch = () => {
    setIsLogin(!isLogin); // Toggle between login and registration
  };

  return (
    <div className="App">
      <div className="toggle-container" onClick={toggleSwitch}>
        {/* Toggle Button */}
        <div className={`toggle-btn ${isLogin ? 'left' : 'right'}`}>
          {isLogin ? 'Login' : 'Register'}
        </div>

        {/* Labels */}
        <div className="toggle-label left">Login</div>
        <div className="toggle-label right">Register</div>
      </div>

      {/* Conditional rendering for Login and Register Forms */}
      {isLogin ? (
        <LoginForm />
      ) : (
        <div>
          <select
            className="role-selector"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {/* Show the Registration Form based on the role selected */}
          {role === 'patient' ? (
            <RegistrationForm role="patient" />
          ) : (
            <RegistrationForm role="doctor" />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
