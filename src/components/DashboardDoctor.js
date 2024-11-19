// DashboardDoctor.js



import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Ensure Navbar component is properly exported and imported
import axios from 'axios';
import './DashboardDoctorStyles.css'; // Import the CSS file
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

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

  const handleStatusChange = (id, status) => {
    // Update the status of the consultation request
    const updatedRequests = consultationRequests.map((request) =>
      request.id === id ? { ...request, status: status } : request
    );
    setConsultationRequests(updatedRequests); // Update state with the new status

    // Update status on the server
    // axios
    //   .put(`http://localhost:5000/consultations/${id}/updateStatus`, { status: status }, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   })
    //   .then((response) => {
    //     toast.success(`Request ${status} successfully!`); // Show success toast
    //   })
    //   .catch((error) => {
    //     console.error("Error updating status:", error);
    //     toast.error('Failed to update request status.'); // Show error toast
    //   });

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
      </main>
    </div>
  );
}

export default DashboardDoctor;
