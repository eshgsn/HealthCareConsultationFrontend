

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router
// import './components/FormStyles.css';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import Dashboard from './components/Dashboard'; // Import Dashboard component

// function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState('patient');

//   const toggleSwitch = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <div className="toggle-container" onClick={toggleSwitch}>
//                 <div className={`toggle-btn ${isLogin ? 'left' : 'right'}`}>
//                   {isLogin ? 'Login' : 'Register'}
//                 </div>
//                 <div className="toggle-label left">Login</div>
//                 <div className="toggle-label right">Register</div>
//               </div>

//               {isLogin ? (
//                 <LoginForm />
//               ) : (
//                 <div>
//                   <select
//                     className="role-selector"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                   >
//                     <option value="patient">Patient</option>
//                     <option value="doctor">Doctor</option>
//                   </select>
//                   <RegistrationForm role={role} />
//                 </div>
//               )}
//             </>
//           } />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/FormStyles.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');

  const toggleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="App">
        <div className="toggle-container" onClick={toggleSwitch}>
          <div className={`toggle-btn ${isLogin ? 'left' : 'right'}`}>
            {isLogin ? 'Login' : 'Register'}
          </div>
          <div className="toggle-label left">Login</div>
          <div className="toggle-label right">Register</div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              isLogin ? (
                <LoginForm />
              ) : (
                <div>
                  <select
                    className="role-selector"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                  <RegistrationForm role={role} />
                </div>
              )
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
