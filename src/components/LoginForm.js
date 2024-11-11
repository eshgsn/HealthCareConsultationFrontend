
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const apiUrl = role === 'doctor'
      ? 'http://localhost:5000/doctors/login'
      : 'http://localhost:5000/patients/login';

    try {
      const response = await axios.post(apiUrl, { email, password });
      console.log(response)
      if (response.status === 200) {
        setSuccess('Login successful!');
        onLogin();
        localStorage.setItem('patient_id', response.data.id)
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard', { state: { role, token: response.data.token } });
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
