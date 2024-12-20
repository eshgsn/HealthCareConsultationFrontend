import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './DashboardDoctorStyles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimeslotForm from './Timeslot';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import ConsultForm from './ConsultForm';

const DashboardDoctor = () => {
  const [selectedSection, setSelectedSection] = useState('welcome');
  const [consultationRequests, setConsultationRequests] = useState([]);
  const doctorId = localStorage.getItem('doctor_id');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    isAvailable: false,
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor_id');
    window.location.href = '/';
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/consultations/${id}/update`, { status: status }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedRequests = consultationRequests.map((request) =>
        request.id === id ? { ...request, status: status } : request
      );
      setConsultationRequests(updatedRequests);

      toast.success(`Request ${status} successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update request status.');
    }
  };

  useEffect(() => {
    const fetchConsultationRequests = async () => {
      if (selectedSection === 'consultationRequests' && doctorId && token) {
        // try {
        //   const { data } = await axios.get(
        //     `http://localhost:5000/consultations/doctors/${doctorId}/getRequests`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );
  
        //   const consultations = data.consultations.map((consultation) => ({
        //     ...consultation,
        //     imagesPaths: consultation.imagesPaths ? consultation.imagesPaths.split(',') : [],
        //   }));
        //   setConsultationRequests(consultations);
        // } catch (error) {
        //   console.error('Error fetching consultation requests:', error);
        //   setConsultationRequests([]);
        // }
        try {
          const { data } = await axios.get(
            `http://localhost:5000/consultations/doctors/${doctorId}/getRequests`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        
          // Process the consultation requests
          const updatedConsultations = data.map((consultation) => ({
            ...consultation,
            // Parse the `image_path` string into an array
            imagesPaths: JSON.parse(consultation.image_path),
          }));
        
          setConsultationRequests(updatedConsultations);
        } catch (error) {
          console.error('Error fetching consultation requests:', error);
          setConsultationRequests([]);
        }
        
      }
    };
  
    fetchConsultationRequests();
  }, [selectedSection, doctorId, token]);
  

  return (
    <div className="container-1">
      <Navbar onLogout={handleLogout} onSelect={handleSelect} userRole="doctor" />

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
            <div className="consultation-requests">
              {consultationRequests.length > 0 ? (
                consultationRequests.map((request) => {
                  let images = [];
                  try {
                    images = JSON.parse(request.image_path);
                  } catch (error) {
                    console.error('Error parsing image_path:', error);
                  }
                  return (
                    <div key={request.id} className="consultation-card">
                      {images.length > 0 && (
                        <Carousel className="consultation-carousel">
                          {images.map((img, index) => (
                            <Carousel.Item key={index}>
                              <img
                                src={`http://localhost:5000/${img}`}
                                alt={`Slide ${index + 1}`}
                                className="consultation-image"
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      )}

                      <h5>Patient Name: {request.Patient.name}</h5>
                      <div className="consultation-details">
                        <h5>Appointment Time: {new Date(request.appointment_time).toLocaleString()}</h5>
                        <p>Description: {request.description}</p>
                        <p>Status: {request.status}</p>

                        {request.status === 'Pending' && (
                          <div>
                            <button onClick={() => handleStatusChange(request.id, 'Accepted')}>Accept</button>
                            <button onClick={() => handleStatusChange(request.id, 'Rejected')}>Reject</button>
                          </div>
                        )}

                        {request.status === 'Accepted' && (
                          <div>
                            <button onClick={() => handleStatusChange(request.id, 'Completed')}>Complete</button>
                            <button onClick={() => {
                              navigate(`/chatBox/${doctorId}/${request.id}`);
                            }}>Chat</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
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
};

export default DashboardDoctor;

