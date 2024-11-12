
// LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

function LoginForm({ onLogin }) {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setSuccess(null);

  //   const apiUrl = role === 'doctor'
  //     ? 'http://localhost:5000/doctors/login'
  //     : 'http://localhost:5000/patients/login';

  //   try {
  //     const response = await axios.post(apiUrl, { email, password });
  //     console.log(response);
  //     if (response.status === 200) {
  //       setSuccess('Login successful!');
  //       onLogin();
  //       localStorage.setItem('patient_id', response.data.id);
  //       localStorage.setItem('token', response.data.token);

  //       // Navigate to different dashboards based on the role
  //       if (role === 'patient') {
  //         navigate('/dashboard', { state: { role, token: response.data.token, patient_id: response.data.id } });
  //       } else if (role === 'doctor') {
  //         navigate('/dashboarddoctor', { state: { role, token: response.data.token, doctor_id: response.data.id } });
  //       }
  //     }
  //   } catch (error) {
  //     setError('Login failed. Please check your credentials and try again.');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    const apiUrl = role === 'doctor'
      ? 'http://localhost:5000/doctors/login'
      : 'http://localhost:5000/patients/login';
  
    try {
      const response = await axios.post(apiUrl, { email, password });
      console.log(response);
      if (response.status === 200) {
        setSuccess('Login successful!');
        onLogin();
  
        // Store the appropriate id based on the role
        if (role === 'patient') {
          localStorage.setItem('patient_id', response.data.id);
          localStorage.removeItem('doctor_id'); // Remove any previous doctor_id from localStorage
        } else if (role === 'doctor') {
          localStorage.setItem('doctor_id', response.data.id);
          localStorage.removeItem('patient_id'); // Remove any previous patient_id from localStorage
        }
        
        // Store the token
        localStorage.setItem('token', response.data.token);
  
        // Navigate based on the role
        if (role === 'patient') {
          navigate('/dashboard', { state: { role, token: response.data.token, patient_id: response.data.id } });
        } else if (role === 'doctor') {
          navigate('/dashboarddoctor', { state: { role, token: response.data.token, doctor_id: response.data.id } });
        }
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

