// LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';

function LoginForm() {
  const [role, setRole] = useState('patient'); // Default role set to 'patient'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // to handle errors
  const [success, setSuccess] = useState(null); // to handle success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // reset error state
    setSuccess(null); // reset success state

    const apiUrl = role === 'doctor'
      ? 'http://localhost:5000/doctors/login'
      : 'http://localhost:5000/patients/login';

    try {
      const response = await axios.post(apiUrl, { email, password });
      if (response.status === 200) {
        setSuccess('Login successful!');
        // Handle successful login, maybe redirect or store the token
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
