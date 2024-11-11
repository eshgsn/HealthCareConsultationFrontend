
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
//   const { role, token } = state || {};
//   const [list, setList] = useState([]);
//   const [view, setView] = useState('');
//   const [showConsultForm, setShowConsultForm] = useState(false);

//   // Logout function
//   const handleLogout = () => {
//     navigate('/');
//   };

//   // Fetch data based on the selected view
//   useEffect(() => {
//     const fetchData = async () => {
//       if (view !== 'findDoctor' && view !== 'scheduleAppointment') return;

//       try {
//         const apiUrl = view === 'findDoctor' || view === 'scheduleAppointment'
//           ? 'http://localhost:5000/doctors/doctors'
//           : 'http://localhost:5000/consultations/doctors/2/getRequests';

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

//   // Toggle consult form visibility
//   const openConsultForm = () => setShowConsultForm(true);
//   const closeConsultForm = () => setShowConsultForm(false);

//   // Handle form submission from ConsultForm
//   const handleConsultFormSubmit = (appointmentData) => {
//     console.log('Appointment data submitted:', appointmentData);
//     // Add API call to save appointment data here if needed
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
//               {list.map((item, index) => (
//                 <li key={index} className="list-item">
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
//               {list.map((item, index) => (
//                 <li key={index} className="list-item">
//                   <span>{item.name}</span>
//                   <span>{item.specialization}</span>
//                   <span>{item.email}</span>
//                   <button className="consult-btn" onClick={openConsultForm}>Consult</button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Consultation Form Modal */}
//           {showConsultForm && (
//             <ConsultForm onClose={closeConsultForm} onSubmit={handleConsultFormSubmit} />
//           )}
//         </>
//       ) : view === 'consultationStatus' ? (
//         <h2>Consultation Status</h2>
//       ) : null}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ConsultForm from './ConsultForm';
import './DashboardStyles.css';

function Dashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, token, patient_id } = state || {}; // Assuming patient_id is passed in state on login
  const [list, setList] = useState([]);
  const [view, setView] = useState('');
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleLogout = () => {
    navigate('/');
  };

  // Fetch data based on the selected view
  useEffect(() => {
    const fetchData = async () => {
      if (view !== 'findDoctor' && view !== 'scheduleAppointment') return;

      try {
        const apiUrl = view === 'findDoctor' || view === 'scheduleAppointment'
          ? 'http://localhost:5000/doctors/doctors'
          : 'http://localhost:5000/consultations/doctors/2/getRequests';

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

  // Function to open consult form with selected doctor_id
  const handleConsultClick = (doctor_id) => {
    setSelectedDoctorId(doctor_id);
    setShowConsultForm(true);
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
        <h2>Consultation Status</h2>
      ) : null}

      {showConsultForm && (
        <ConsultForm
          token={token}
          patientId={patient_id} // Pass the logged-in patient’s ID
          doctorId={selectedDoctorId} // Pass the selected doctor's ID
          onClose={() => setShowConsultForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
