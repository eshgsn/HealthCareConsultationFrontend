// // // src/components/TimeslotForm.js
// // import React from 'react';

// // function TimeslotForm({ formData, setFormData }) {
// //   // Handle input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   return (
// //     <div className="timeslot-form">
// //       <h1>Manage Timeslots</h1>
// //       <h3>Create Timeslot</h3>
// //       <form className="horizontal-form">
// //         <input
// //           type="date"
// //           name="date"
// //           value={formData.date}
// //           onChange={handleInputChange}
// //           required
// //           placeholder="Date"
// //         />
// //         <input
// //           type="time"
// //           name="startTime"
// //           value={formData.startTime}
// //           onChange={handleInputChange}
// //           required
// //           placeholder="Start Time"
// //         />
// //         <input
// //           type="time"
// //           name="endTime"
// //           value={formData.endTime}
// //           onChange={handleInputChange}
// //           required
// //           placeholder="End Time"
// //         />
// //         <button
// //           type="button"
// //           className="confirm-button"
// //           onClick={() => {
// //             setFormData((prevState) => ({
// //               ...prevState,
// //               isAvailable: true,
// //             }));
// //             console.log('Timeslot Created:', { ...formData, isAvailable: true });
// //             // Reset form after confirmation
// //             setFormData({
// //               date: '',
// //               startTime: '',
// //               endTime: '',
// //               isAvailable: false,
// //             });
// //           }}
// //         >
// //           Confirm
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default TimeslotForm;


// // src/components/TimeslotForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function TimeslotForm({ formData, setFormData, doctorId }) {
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {

//     const doctorId = localStorage.getItem('doctor_id');

//     if (!doctorId) {
//       setError('Doctor ID not found in local storage.');
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/time-slots/${doctorId}`,
//         {
//           slots: [
//             {
//               date: formData.date,
//               startTime: formData.startTime,
//               endTime: formData.endTime,
//               isAvailable: true, 
//             },
//           ],
//         }
//       );
//       console.log('API Response:', response.data);

     
//       setSuccess('Timeslot created successfully!');
//       setError(null);

      
//       setFormData({
//         date: '',
//         startTime: '',
//         endTime: '',
//         isAvailable: false,
//       });
//     } catch (error) {
//       console.error('Error creating timeslot:', error);
//       setSuccess(null);
//       setError('Failed to create timeslot. Please try again.');
//     }
//   };

//   return (
//     <div className="timeslot-form">
//       <h1>Manage Timeslots</h1>
//       <h3>Create Timeslot</h3>
//       {error && <div className="error-message">{error}</div>}
//       {success && <div className="success-message">{success}</div>}
//       <form className="horizontal-form">
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleInputChange}
//           required
//           placeholder="Date"
//         />
//         <input
//           type="time"
//           name="startTime"
//           value={formData.startTime}
//           onChange={handleInputChange}
//           required
//           placeholder="Start Time"
//         />
//         <input
//           type="time"
//           name="endTime"
//           value={formData.endTime}
//           onChange={handleInputChange}
//           required
//           placeholder="End Time"
//         />
//         <button
//           type="button"
//           className="confirm-button"
//           onClick={handleSubmit} 
//         >
//           Confirm
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TimeslotForm;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './TimeslotStyles.css'; 

function TimeslotForm({ formData, setFormData }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [timeslots, setTimeslots] = useState([]);

  const doctorId = localStorage.getItem('doctor_id');

  const fetchTimeslots = useCallback(async () => {
    if (!doctorId) {
      console.warn('No doctorId found. Skipping fetch.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/time-slots/${doctorId}`);
      console.log('API Response:', response.data);
      setTimeslots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching timeslots:', error);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchTimeslots();
  }, [fetchTimeslots]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!doctorId) {
      setError('Doctor ID not found in local storage.');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/time-slots/${doctorId}`, {
        slots: [
          {
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            isAvailable: true,
          },
        ],
      });
      setSuccess('Timeslot created successfully!');
      setError(null);
      setFormData({ date: '', startTime: '', endTime: '', isAvailable: false });
      fetchTimeslots();
    } catch (error) {
      console.error('Error creating timeslot:', error);
      setError('Failed to create timeslot. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/time-slots/${id}`);
      setSuccess('Timeslot deleted successfully!');
      fetchTimeslots();
    } catch (error) {
      console.error('Error deleting timeslot:', error);
      setError('Failed to delete timeslot.');
    }
  };

  return (
    <div className="timeslot-form-container">
      <div className="timeslot-form">
        <h1>Manage Timeslots</h1>
        <h3>Create Timeslot</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form className="horizontal-form">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            placeholder="Date"
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
            placeholder="Start Time"
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
            placeholder="End Time"
          />
          <button type="button" className="confirm-button" onClick={handleSubmit}>
            Confirm
          </button>
        </form>
      </div>

      <div className="timeslot-grid">
        {timeslots.length > 0 ? (
          timeslots.map((slots) => (
            <div className="timeslot-card" key={slots.id}>
              <p><strong>Date:</strong> {slots.date}</p>
              <p><strong>Start Time:</strong> {slots.startTime}</p>
              <p><strong>End Time:</strong> {slots.endTime}</p>
              <button className="update-button">Update</button>
              <button className="delete-button" onClick={() => handleDelete(slots.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No timeslots available.</p>
        )}
      </div>
    </div>
  );
}

export default TimeslotForm;
