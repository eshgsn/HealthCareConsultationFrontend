
import React, { useState } from 'react';
import axios from 'axios';
import './ConsultFormStyles.css';

function ConsultForm({ token, patientId, doctorId, onClose }) {
  const [appointmentTime, setAppointmentTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', patientId); // Include patient ID
    formData.append('doctor_id', doctorId);   // Include doctor ID
    formData.append('appointment_time', appointmentTime);
    formData.append('description', description);
    formData.append('image_path', image);

    try {
      const response = await axios.post(
        'http://localhost:5000/consultations/createRequest',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // console.log('Consultation request created:', response.data);
      alert('Consultation request created successfully!');
      onClose();
    } catch (error) {
      console.error('Error creating consultation request:', error.response ? error.response.data : error.message);
      alert('Failed to create consultation request. Please try again.');
    }
  };

  return (
    <div className="consult-form-modal">
      <form className="consult-form" onSubmit={handleSubmit}>
        <label>Appointment Time</label>
        <input
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          name="image_path"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ConsultForm;

