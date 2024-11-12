// DashboardDoctor.js


// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar'; // Ensure Navbar component is properly exported and imported
// import axios from 'axios';

// function DashboardDoctor() {
//   const [selectedSection, setSelectedSection] = useState('welcome'); // Default to 'welcome' section
//   const [consultationRequests, setConsultationRequests] = useState([]); // Store consultation requests
//   const doctorId = localStorage.getItem('doctor_id'); // Get the doctor ID from localStorage (or session)
//   const token = localStorage.getItem('token'); // Get token from localStorage

//   const handleSelect = (section) => {
//     setSelectedSection(section);
//   };

//   const handleLogout = () => {
//     // Implement logout logic here (e.g., clear localStorage, navigate to login page)
//     localStorage.removeItem('token');
//     localStorage.removeItem('doctor_id');
//     window.location.href = '/'; // Redirect to login page (you can change this as per your routing setup)
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
//             {/* Display Consultation Requests in a Table */}
//             <table>
//               <thead>
//                 <tr>
//                   <th>Patient Name</th>
//                   <th>Consultation Time</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {consultationRequests.length > 0 ? (
//                   consultationRequests.map((request) => (
//                     <tr key={request.id}>
//                       <td>{request.patientName}</td>
//                       <td>{new Date(request.consultationTime).toLocaleString()}</td>
//                       <td>{request.status}</td>
//                       <td>
//                         <button>View Details</button> {/* Implement any action for the consultation request */}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4">No consultation requests available.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default DashboardDoctor; // Correct export for default export


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Ensure Navbar component is properly exported and imported
import axios from 'axios';
import './DashboardDoctorStyles.css'; // Import the CSS file

function DashboardDoctor() {
  const [selectedSection, setSelectedSection] = useState('welcome'); // Default to 'welcome' section
  const [consultationRequests, setConsultationRequests] = useState([]); // Store consultation requests
  const doctorId = localStorage.getItem('doctor_id'); // Get the doctor ID from localStorage (or session)
  const token = localStorage.getItem('token'); // Get token from localStorage

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear localStorage, navigate to login page)
    localStorage.removeItem('token');
    localStorage.removeItem('doctor_id');
    window.location.href = '/'; // Redirect to login page (you can change this as per your routing setup)
  };

  const handleStatusChange = (id) => {
    // Update the status of the consultation request
    const updatedRequests = consultationRequests.map((request) =>
      request.id === id ? { ...request, status: 'Completed' } : request
    );
    setConsultationRequests(updatedRequests); // Update state with the new status
    // Optionally, you can make an API call here to update the status on the server
    // axios.put(`http://localhost:5000/consultations/${id}`, { status: 'Completed' }, { headers: { Authorization: `Bearer ${token}` } });
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
                    <div className="consultation-details">
                      <h3>Appointment Time: {new Date(request.appointment_time).toLocaleString()}</h3>
                      <p>Description: {request.description}</p>
                      <p>Status: {request.status}</p>
                      <button onClick={() => handleStatusChange(request.id)}>Change Status</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No consultation requests available.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardDoctor;
