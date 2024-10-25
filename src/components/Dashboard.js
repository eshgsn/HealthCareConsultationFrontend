
// // Dashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './DashboardStyles.css';

// function Dashboard() {
//   const { state } = useLocation();
//   const { role, token } = state || {};
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = role === 'patient'
//           ? 'http://localhost:5000/doctors/doctors'
//           : 'http://localhost:5000/consultations/doctors/2/getRequests';
        
//         const response = await axios.get(apiUrl, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setList(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [role, token]);

//   return (
//     <div className="dashboard">
//       <h2>{role === 'patient' ? 'Doctors List' : 'Patients List'}</h2>
//       <ul className="list">
//         {list.map((item, index) => (
//           <li key={index} className="list-item">
//             <span>{role === 'patient' ? item.name : item.patientName}</span>
//             <span>{role === 'patient' ? item.specialization : item.condition}</span>
//             {role === 'patient' && (
//               <button className="consult-btn">Consult</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;


// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './DashboardStyles.css';

function Dashboard() {
  const { state } = useLocation();
  const { role, token } = state || {};
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = role === 'patient'
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
  }, [role, token]);

  return (
    <div className="dashboard">
      <h2>{role === 'patient' ? 'Doctors List' : 'Patients List'}</h2>
      <ul className="list">
        {list.map((item, index) => (
          <li key={index} className="list-item">
            <span>{role === 'patient' ? item.name : item.patientName}</span>
            <span>{role === 'patient' ? item.specialization : item.condition}</span>
            {role === 'patient' && (
              <button className="consult-btn">Consult</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
