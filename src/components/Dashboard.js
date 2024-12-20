// // Dashboard.js


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import ConsultForm from './ConsultForm';
// import './DashboardStyles.css';


// function Dashboard() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { role, token, patient_id } = state || {};
//   const [list, setList] = useState([]);
//   const [view, setView] = useState('');
//   const [showConsultForm, setShowConsultForm] = useState(false);
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [consultationStatus, setConsultationStatus] = useState([]);

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const fetchConsultationStatus = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/consultations/consultationStatus',
      
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // console.log("esha",response);
//       setConsultationStatus(response.data);
//     } catch (error) {
//       console.error('Error fetching consultation status:', error.response ? error.response.data : error.message);
//     }
//   };

//   // Fetch data based on the selected view
//   useEffect(() => {
//     const fetchData = async () => {
//       if (view !== 'findDoctor' && view !== 'scheduleAppointment') return;

//       try {
//         const apiUrl = view === 'findDoctor' || view === 'scheduleAppointment'
//           ? 'http://localhost:5000/doctors/doctors'
//           : 'http://localhost:5000/consultations/doctors/:id/getRequests';

//         const response = await axios.get(apiUrl, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setList(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchData();
//   }, [view, token]);

//   useEffect(() => {
//     if (view === 'consultationStatus') {
//       fetchConsultationStatus();
//     }
//   }, [view]);

//   // Function to open consult form with selected doctor_id
//   const handleConsultClick = (doctor_id) => {
//     setSelectedDoctorId(doctor_id);
//     setShowConsultForm(true);
//   };

//   return (
//     <div className="dashboard">
//       <Navbar onLogout={handleLogout} onSelect={(view) => setView(view)} />

//       {view === '' ? (
//         <h2>Welcome, Patient!</h2>
//       ) : view === 'findDoctor' ? (
//         <>
//           <h2>Doctors List</h2>
//           <div className="list-container">
//             <ul className="list">
//               {list.map((item) => (
//                 <li key={item.id} className="list-item">
//                   <span>{item.name}</span>
//                   <span>{item.specialization}</span>
//                   <span>{item.email}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : view === 'scheduleAppointment' ? (
//         <>
//           <h2>Schedule an Appointment</h2>
//           <div className="list-container">
//             <ul className="list">
//               {list.map((item) => (
//                 <li key={item.id} className="list-item">
//                   <span>{item.name}</span>
//                   <span>{item.specialization}</span>
//                   <span>{item.email}</span>
//                   <button className="consult-btn" onClick={() => handleConsultClick(item.id)}>Consult</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : view === 'consultationStatus' ? (
//         <>
//           <h2>Consultation Status</h2>
//           <div className="status-list">
//             {consultationStatus.length > 0 ? (
//               consultationStatus.map((status) => (
//                 <div key={status.id} className="status-item">
//                   {/* <h3>Doctor: {status.doctor.name}</h3> */}
//                   <p>Status: {status.status}</p>
//                   <p>Appointment Time: {new Date(status.appointment_time).toLocaleString()}</p>
//                   <p>Description: {status.description}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No consultation status found.</p>
//             )}
//           </div>
//         </>
//       ) : null}

//       {showConsultForm && (
//         <ConsultForm
//           token={token}
//           patientId={patient_id} // Pass the logged-in patient’s ID
//           doctorId={selectedDoctorId} // Pass the selected doctor's ID
//           onClose={() => setShowConsultForm(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ConsultForm from './ConsultForm';
import Chat from './Chat';
import './DashboardStyles.css';

function Dashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, token, patient_id } = state || {};
  const [list, setList] = useState([]);
  const [view, setView] = useState('');
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [consultationStatus, setConsultationStatus] = useState([]);
  const [showChat, setShowChat] = useState(false); // State to manage chat visibility
  const [selectedConsultation, setSelectedConsultation] = useState(null); // Store the selected consultation details

  const handleLogout = () => {
    navigate('/');
  };

  const fetchConsultationStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/consultations/consultationStatus', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConsultationStatus(response.data);
    } catch (error) {
      console.error('Error fetching consultation status:', error.response ? error.response.data : error.message);
    }
  };

  // Fetch data based on the selected view
  useEffect(() => {
    const fetchData = async () => {
      if (view !== 'findDoctor' && view !== 'scheduleAppointment') return;

      try {
        const apiUrl =
          view === 'findDoctor' || view === 'scheduleAppointment'
            ? 'http://localhost:5000/doctors/doctors'
            : 'http://localhost:5000/consultations/doctors/:id/getRequests';

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, [view, token]);

  useEffect(() => {
    if (view === 'consultationStatus') {
      fetchConsultationStatus();
    }
  }, [view]);

  // Function to open consult form with selected doctor_id
  const handleConsultClick = (doctor_id) => {
    setSelectedDoctorId(doctor_id);
    setShowConsultForm(true);
  };

  // Function to open the chatbox for the selected consultation
  const handleChatClick = (consultation) => {
    setSelectedConsultation(consultation); // Pass the entire consultation object
    setShowChat(true);
  };

  return (
    <div className="dashboard">
      <Navbar onLogout={handleLogout} onSelect={(view) => setView(view)} />

      {view === '' ? (
        <h2>Welcome, Patient!</h2>
      ) : view === 'findDoctor' ? (
        <>
          <h2>Doctors List</h2>
          <div className="list-container">
            <ul className="list">
              {list.map((item) => (
                <li key={item.id} className="list-item">
                  <span>{item.name}</span>
                  <span>{item.specialization}</span>
                  <span>{item.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : view === 'scheduleAppointment' ? (
        <>
          <h2>Schedule an Appointment</h2>
          <div className="list-container">
            <ul className="list">
              {list.map((item) => (
                <li key={item.id} className="list-item">
                  <span>{item.name}</span>
                  <span>{item.specialization}</span>
                  <span>{item.email}</span>
                  <button className="consult-btn" onClick={() => handleConsultClick(item.id)}>Consult</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : view === 'consultationStatus' ? (
        <>
          <h2>Consultation Status</h2>
          <div className="status-list">
            {consultationStatus.length > 0 ? (
              consultationStatus.map((status) => (
                <div key={status.id} className="status-item">
                  <p>Status: {status.status}</p>
                  <p>Appointment Time: {new Date(status.appointment_time).toLocaleString()}</p>
                  <p>Description: {status.description}</p>
                  {status.status === 'Accepted' && (
                    <button
                      className="chat-btn"
                      onClick={() => navigate(`/chatBox/${status.doctor_id}/${patient_id}`)}
                    >
                      Chat
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No consultation status found.</p>
            )}
          </div>
        </>
      ) : null}

      {showConsultForm && (
        <ConsultForm
          token={token}
          patientId={patient_id}
          doctorId={selectedDoctorId}
          onClose={() => setShowConsultForm(false)}
        />
      )}

      {showChat && selectedConsultation && (
        <Chat
          roomId={selectedConsultation.roomId}
          senderId={selectedConsultation.senderId}
          receiverId={selectedConsultation.receiverId}
          onClose={() => setShowChat(false)} // Close the chat
        />
      )}
    </div>
  );
}

export default Dashboard;

