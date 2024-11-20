

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './components/FormStyles.css';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import Dashboard from './components/Dashboard';
// import DashboardDoctor from './components/DashboardDoctor';  // Make sure this component is imported
// import EmailVerification from './components/VerifyEmail';

// function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState('patient');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(''); // Store logged-in user's role here
//   const toggleSwitch = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleLogin = (role) => {
//     setIsAuthenticated(true);
//     setUserRole(role); // Store the role on login
//   };

//   return (
//     <Router>
//       <div className="App">
//         {!isAuthenticated && (
//           <div className="toggle-container" onClick={toggleSwitch}>
//             <div className={`toggle-btn ${isLogin ? 'left' : 'right'}`}>
//               {isLogin ? 'Login' : 'Register'}
//             </div>
//             <div className="toggle-label left">Login</div>
//             <div className="toggle-label right">Register</div>
//           </div>
//         )}

//         <Routes>
//           <Route
//             path="/"
//             element={
//               isLogin ? (
//                 <LoginForm
//                   onLogin={(role) => handleLogin(role)} // Pass role to handleLogin
//                 />
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
//               )
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={<Dashboard />}
//           />
//           <Route
//             path="/dashboarddoctor"
//             element={<DashboardDoctor />} 
//           />
//                 <Route path="/verify-email" element={<EmailVerification role={role}/> } />
//                 {/* <Route path="/verify-email/:token/:code" element={<EmailVerification />} /> */}

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
 import DashboardDoctor from './components/DashboardDoctor';  // Make sure this component is imported
 import EmailVerification from './components/VerifyEmail';

 
 
 function App() {
   const [isLogin, setIsLogin] = useState(true);
   const [role, setRole] = useState('patient');
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [userRole, setUserRole] = useState(''); // Store logged-in user's role here
 
   const toggleSwitch = () => {
     setIsLogin(!isLogin);
   };
 
   const handleLogin = (role) => {
     setIsAuthenticated(true);
     setUserRole(role); // Store the role on login
   };
 
   return (
     <Router>
       <div className="App">
         {!isAuthenticated && (
           <div className="toggle-container" onClick={toggleSwitch}>
             <div className={`toggle-btn ${isLogin ? 'left' : 'right'}`}>
               {isLogin ? 'Login' : 'Register'}
             </div>
             <div className="toggle-label left">Login</div>
             <div className="toggle-label right">Register</div>
           </div>
         )}
 
         <Routes>
           <Route
             path="/"
             element={
               isLogin ? (
                 <LoginForm
                   onLogin={(role) => handleLogin(role)} // Pass role to handleLogin
                 />
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
           <Route
             path="/dashboard"
             element={<Dashboard />}
           />
           <Route
             path="/dashboarddoctor"
             element={<DashboardDoctor />} 
           />
                 <Route path="/verify-email/:token" element={<EmailVerification role={role}/> } />
 
         </Routes>
         
       </div>
       
     </Router>
   );
 }
 
 export default App;