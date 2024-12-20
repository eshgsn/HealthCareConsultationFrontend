

// import React, { useState } from 'react';
// import axios from 'axios';
// import './ConsultFormStyles.css';

// function ConsultForm({ token, patientId, doctorId, onClose }) {
//   const [appointmentTime, setAppointmentTime] = useState('');
//   const [description, setDescription] = useState('');
//   // const [image, setImage] = useState(null);
//   const [images, setImages] = useState([]);


//   const handleFileChange = (e) => {
//     setImages(Array.from(e.target.files)); // Convert FileList to an array
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('patient_id', patientId); 
//     formData.append('doctor_id', doctorId);   
//     formData.append('appointment_time', appointmentTime);
//     formData.append('description', description);
//     // formData.append('image_path', image);
//     // formData.append('images', image);
//     images.forEach((image, index) => {
//       formData.append('images', image); // Append each image
//   });

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/consultations/createRequest',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // console.log('Consultation request created:', response.data);
//       alert('Consultation request created successfully!');
//       onClose();
//     } catch (error) {
//       console.error('Error creating consultation request:', error.response ? error.response.data : error.message);
//       alert('Failed to create consultation request. Please try again.');
//     }
//   };

//   return (
//     <div className="consult-form-modal">
//       <form className="consult-form" onSubmit={handleSubmit}>
//         <label>Appointment Time</label>
//         <input
//           type="datetime-local"
//           value={appointmentTime}
//           onChange={(e) => setAppointmentTime(e.target.value)}
//           required
//         />

//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>

//         <label>Upload Image</label>
//         {/* <input
//           type="file"
//           accept="image/*"
//           name="image_path"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         /> */}

//           <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleFileChange}
//                 />

//         <div className="button-group">
//           <button type="submit" className="submit-btn">Submit</button>
//           <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ConsultForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConsultFormStyles.css';

function ConsultForm({ token, patientId, doctorId, onClose }) {
  const [appointmentTime, setAppointmentTime] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]); // State to store fetched time slots

  // Fetch time slots when the component mounts
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/time-slots/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimeSlots(response.data.slots);
      } catch (error) {
        console.error('Error fetching time slots:', error.response ? error.response.data : error.message);
        alert('Failed to fetch time slots. Please try again.');
      }
    };

    fetchTimeSlots();
  }, [doctorId, token]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', patientId);
    formData.append('doctor_id', doctorId);
    formData.append('appointment_time', appointmentTime);
    formData.append('description', description);
    // images.forEach((image) => formData.append('images', image));

    images.forEach((image) => {
      formData.append('images', image);
    });
  
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
        {/* <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        >
          <option value="" disabled>Select a time slot</option>
          {timeSlots.map((slot) => (
            <option
              key={slot.id}
              value={`${slot.date} ${slot.startTime} - ${slot.endTime}`}
            >
              {`${slot.date} ${slot.startTime} - ${slot.endTime}`}
            </option>
          ))}
        </select> */}

        <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option
              key={slot.id}
              value={`${slot.date} ${slot.startTime}`} // Combine date and start time into DATETIME format
            >
              {`${slot.date} (${slot.startTime} - ${slot.endTime})`}
            </option>
          ))}
        </select>


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
          multiple
          onChange={handleFileChange}
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
