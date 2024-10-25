// // RegistrationForm.js


// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormStyles.css';

// function RegistrationForm({ role }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     specialization: '', 
//     availability_Start: '', 
//     availability_End: '', 
//   });

//   const [error, setError] = useState(null); 
//   const [success, setSuccess] = useState(null); 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); 
//     setSuccess(null); 

//     // Include role in the form data before sending to the backend
//     const submissionData = {
//       ...formData,
//       role, // include the role prop in the data to send
//     };

//     const apiUrl = role === 'doctor'
//       ? 'http://localhost:5000/doctors/register'
//       : 'http://localhost:5000/patients/register';

//     try {
//       const response = await axios.post(apiUrl, submissionData);
//       if (response.status === 200) {
//         setSuccess('Registration successful!');
//         // Reset the form fields after successful submission
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           specialization: '',
//           availability_Start: '',
//           availability_End: '',
//         });
//       }
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register as {role === 'doctor' ? 'Doctor' : 'Patient'}</h2>

//       {error && <div className="error">{error}</div>}
//       {success && <div className="success">{success}</div>}

//       <label>Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />

//       <label>Password:</label>
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />

//       {/* Doctor-specific fields */}
//       {role === 'doctor' && (
//         <>
//           <label>Specialization:</label>
//           <input
//             type="text"
//             name="specialization"
//             value={formData.specialization}
//             onChange={handleChange}
//             required
//           />

//           <label>Availability Start Time:</label>
//           <input
//             type="time"
//             name="availability_Start"
//             value={formData.availability_Start}
//             onChange={handleChange}
//             required
//           />

//           <label>Availability End Time:</label>
//           <input
//             type="time"
//             name="availability_End"
//             value={formData.availability_End}
//             onChange={handleChange}
//             required
//           />
//         </>
//       )}

//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default RegistrationForm;


import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';

function RegistrationForm({ role }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    availability_Start: '',
    availability_End: '',
  });

  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null); 

    const submissionData = {
      ...formData,
      role, 
    };

    const apiUrl = role === 'doctor'
      ? 'http://localhost:5000/doctors/register'
      : 'http://localhost:5000/patients/register';

    try {
      const response = await axios.post(apiUrl, submissionData);
      if (response.status === 200) {
        setSuccess('Registration successful!');
        // Reset the form fields after successful submission
        setFormData({
          name: '',
          email: '',
          password: '',
          specialization: '',
          availability_Start: '',
          availability_End: '',
        });
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as {role === 'doctor' ? 'Doctor' : 'Patient'}</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {role === 'doctor' && (
        <>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <label>Availability Start Time:</label>
          <input
            type="time"
            name="availability_Start"
            value={formData.availability_Start}
            onChange={handleChange}
            required
          />

          <label>Availability End Time:</label>
          <input
            type="time"
            name="availability_End"
            value={formData.availability_End}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
