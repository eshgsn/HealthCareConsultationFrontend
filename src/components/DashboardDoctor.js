// // DashboardDoctor.js

// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import axios from 'axios';
// import './DashboardDoctorStyles.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function DashboardDoctor() {
//   const [selectedSection, setSelectedSection] = useState('welcome'); // Default to 'welcome' section
//   const [consultationRequests, setConsultationRequests] = useState([]); // Store consultation requests
//   const doctorId = localStorage.getItem('doctor_id'); // Get the doctor ID from localStorage (or session)
//   const token = localStorage.getItem('token'); // Get token from localStorage
//   // State for managing the form fields
//   const [formData, setFormData] = useState({
//     date: '',
//     startTime: '',
//     endTime: '',
//     isAvailable: false, // Default value for availability
//   });

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value, // Dynamically update the field based on input name
//     }));
//   };


//   const handleSelect = (section) => {
//     setSelectedSection(section);
//   };

//   const handleLogout = () => {
//     // Implement logout logic here (e.g., clear localStorage, navigate to login page)
//     localStorage.removeItem('token');
//     localStorage.removeItem('doctor_id');
//     window.location.href = '/'; // Redirect to login page (you can change this as per your routing setup)
//   };

//   const handleStatusChange = (id, status) => {
//     // Update the status of the consultation request
//     const updatedRequests = consultationRequests.map((request) =>
//       request.id === id ? { ...request, status: status } : request
//     );
//     setConsultationRequests(updatedRequests); // Update state with the new status

//     axios
//       .put(`http://localhost:5000/consultations/${id}/update`, { status: status }, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then((response) => {
//         toast.success(`Request ${status} successfully!`); // Show success toast
//       })
//       .catch((error) => {
//         console.error("Error updating status:", error);
//         toast.error('Failed to update request status.'); // Show error toast
//       });

//   };

//   // Fetch consultation requests when section is 'consultationRequests'
//   useEffect(() => {
//     if (selectedSection === 'consultationRequests' && doctorId && token) {
//       // Ensure doctorId and token are available before making the API request
//       axios
//         .get(`http://localhost:5000/consultations/doctors/${doctorId}/getRequests`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in Authorization header
//           },
//         })
//         .then((response) => {
//           setConsultationRequests(response.data); // Set the data from the response
//         })
//         .catch((error) => {
//           console.error("Error fetching consultation requests:", error);
//           setConsultationRequests([]); // Reset data if there's an error
//         });
//     }
//   }, [selectedSection, doctorId, token]); // Dependency array ensures API call when section is changed

//   return (
//     <div>
//       <Navbar onLogout={handleLogout} onSelect={handleSelect} userRole="doctor" />

//       {/* Toast Notification Container */}
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

//       <main>
//         {selectedSection === 'welcome' && (
//           <div>
//             <h2>Welcome Doctor</h2>
//             <p>Here you can manage consultation requests and more.</p>
//           </div>
//         )}

//         {selectedSection === 'consultationRequests' && (
//           <div>
//             <h2>Consultation Requests</h2>
//             {/* Display Consultation Requests as Cards */}
//             <div className="consultation-requests">
//               {consultationRequests.length > 0 ? (
//                 consultationRequests.map((request) => (
//                   <div key={request.id} className="consultation-card">
//                     <img
//                       src={`http://localhost:5000/${request.image_path}`}
//                       alt="Consultation"
//                       className="consultation-image"
//                     />
//                     <h3>Patient Name: {request.Patient.name}</h3> {/* Added Patient Name Below Image */}
//                     <div className="consultation-details">
//                       <h3>Appointment Time: {new Date(request.appointment_time).toLocaleString()}</h3>
//                       <p>Description: {request.description}</p>
//                       <p>Status: {request.status}</p>

//                       {/* Buttons based on status */}
//                       {request.status === 'Pending' && (
//                         <div>
//                           <button onClick={() => handleStatusChange(request.id, 'Accepted')}>Accept</button>
//                           <button onClick={() => handleStatusChange(request.id, 'Rejected')}>Reject</button>
//                         </div>
//                       )}

//                       {request.status === 'Accepted' && (
//                         <div>
//                           <button onClick={() => handleStatusChange(request.id, 'Completed')}>Complete</button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No consultation requests available.</p>
//               )}
//             </div>
//           </div>
//         )}
        
//         {selectedSection === 'timeslots' && (
//   <div >
 
    
//     <div className="timeslot-form">
//     <h1>Manage Timeslots</h1>
//     <h3>Create Timeslot</h3>
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
//           onClick={() => {
//             setFormData((prevState) => ({
//               ...prevState,
//               isAvailable: true,
//             }));
//             console.log('Timeslot Created:', { ...formData, isAvailable: true });
//             // Reset form after confirmation
//             setFormData({
//               date: '',
//               startTime: '',
//               endTime: '',
//               isAvailable: false,
//             });
//           }}
//         >
//           Confirm
//         </button>
//       </form>
//     </div>

//     {/* Existing Timeslots (To be fetched from an API in the future) */}
//     <div className="timeslot-list">
//       <h3>Existing Timeslots</h3>
//       <ul>
//         {/* Replace with dynamic data */}
//         <li>
//           Date: 2024-11-22 | 09:00 - 10:00 | Available: Yes
//         </li>
//         <li>
//           Date: 2024-11-23 | 10:00 - 11:00 | Available: No
//         </li>
//       </ul>
//     </div>
//   </div>
// )}
//       </main>
//     </div>
//   );
// }

// export default DashboardDoctor;

// DashboardDoctor.js

// src/components/DashboardDoctor.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './DashboardDoctorStyles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimeslotForm from './Timeslot'; 

function DashboardDoctor() {
  const [selectedSection, setSelectedSection] = useState('welcome'); 
  const [consultationRequests, setConsultationRequests] = useState([]); 
  const doctorId = localStorage.getItem('doctor_id'); 
  const token = localStorage.getItem('token'); 
  // State for managing the form fields
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    isAvailable: false, 
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the field based on input name
    }));
  };

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear localStorage, navigate to login page)
    localStorage.removeItem('token');
    localStorage.removeItem('doctor_id');
    window.location.href = '/'; // Redirect to login page (you can change this as per your routing setup)
  };

  const handleStatusChange = (id, status) => {
    // Update the status of the consultation request
    const updatedRequests = consultationRequests.map((request) =>
      request.id === id ? { ...request, status: status } : request
    );
    setConsultationRequests(updatedRequests); // Update state with the new status

    // Update status on the server
    axios
      .put(`http://localhost:5000/consultations/${id}/update`, { status: status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        toast.success(`Request ${status} successfully!`); // Show success toast
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error('Failed to update request status.'); // Show error toast
      });
  };

  // Fetch consultation requests when section is 'consultationRequests'
  useEffect(() => {
    if (selectedSection === 'consultationRequests' && doctorId && token) {
      // Ensure doctorId and token are available before making the API request
      axios
        .get(`http://localhost:5000/consultations/doctors/${doctorId}/getRequests`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        })
        .then((response) => {
          setConsultationRequests(response.data); // Set the data from the response
        })
        .catch((error) => {
          console.error("Error fetching consultation requests:", error);
          setConsultationRequests([]); // Reset data if there's an error
        });
    }
  }, [selectedSection, doctorId, token]); // Dependency array ensures API call when section is changed

  return (
    <div>
      <Navbar onLogout={handleLogout} onSelect={handleSelect} userRole="doctor" />

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <main>
        {selectedSection === 'welcome' && (
          <div>
            <h2>Welcome Doctor</h2>
            <p>Here you can manage consultation requests and more.</p>
          </div>
        )}

        {selectedSection === 'consultationRequests' && (
          <div>
            <h2>Consultation Requests</h2>
            {/* Display Consultation Requests as Cards */}
            <div className="consultation-requests">
              {consultationRequests.length > 0 ? (
                consultationRequests.map((request) => (
                  <div key={request.id} className="consultation-card">
                    <img
                      src={`http://localhost:5000/${request.image_path}`}
                      alt="Consultation"
                      className="consultation-image"
                    />
                    <h3>Patient Name: {request.Patient.name}</h3> {/* Added Patient Name Below Image */}
                    <div className="consultation-details">
                      <h3>Appointment Time: {new Date(request.appointment_time).toLocaleString()}</h3>
                      <p>Description: {request.description}</p>
                      <p>Status: {request.status}</p>

                      {/* Buttons based on status */}
                      {request.status === 'Pending' && (
                        <div>
                          <button onClick={() => handleStatusChange(request.id, 'Accepted')}>Accept</button>
                          <button onClick={() => handleStatusChange(request.id, 'Rejected')}>Reject</button>
                        </div>
                      )}

                      {request.status === 'Accepted' && (
                        <div>
                          <button onClick={() => handleStatusChange(request.id, 'Completed')}>Complete</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No consultation requests available.</p>
              )}
            </div>
          </div>
        )}

        {selectedSection === 'timeslots' && (
          <TimeslotForm formData={formData} setFormData={setFormData} />
        )}
      </main>
    </div>
  );
}

export default DashboardDoctor;
