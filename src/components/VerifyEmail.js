// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'; 
// import './EmailVerification.css';  

// const EmailVerification = () => {
//   const [loading, setLoading] = useState(true);
//   const [isVerified, setIsVerified] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get('token');
//   const code = queryParams.get('code');

//   // Function to verify email
//   const verifyEmail = async () => {
//     // console.log('Token:', token);  // Debugging log
//     // console.log('Code:', code);    // Debugging log

//     if (!token) {
//       setError('Verification token is missing.');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Check user role based on the code
//       let userRole = 'doctor';  
//       if (code === 'patient') {
//         userRole = 'patient';  
//       }

//       // Call the API for email verification
//       const response = await axios.post(`http://localhost:5000/${userRole}s/verify-email?token=${token}`);
//       console.log(response);
//       if (response.status === 200) {  
//         setIsVerified(true);
//         setTimeout(() => {
//           toast.success('Email verified successfully!');
//           navigate('/'); 
//         }, 1500);
//       } else {
//         toast.error('Email verification failed.');
//       }
//     } catch (err) {
//       // console.error(err);
//       // toast.error(err.response?.data?.message || 'Verification failed.');
//       // setError('An error occurred while verifying the email', err);
//       setError('An error occurred while verifying the email: ' + err.message);

//     } finally {
//       setLoading(false);
//     }
//   };

 
//   useEffect(() => {
//     if (token) {
//       verifyEmail(); 
//     } else {
//       setLoading(false);
//       setError('Token not found in the URL.');
//     }
//   }, [location, token, code]);

//   return (
//     <div className="verification-container">
//       <ToastContainer /> 
      
//       {loading ? (
//         <div className="loading">
//           <div className="spinner"></div>
//           <h3>Verifying your email...</h3>
//         </div>
//       ) : error ? (
//         <div className="error">
//           <h3>{error}</h3>
//         </div>
//       ) : (
//         <div className="verification-message">
//           {isVerified ? (
//             <div className="success">
//               <h3>Your email has been verified successfully!</h3>
//               <p>You will be redirected shortly...</p>
//             </div>
//           ) : (
//             <div className="error">
//               <h3>Email verification failed.</h3>
//               <p>Please try again later or contact support if the issue persists.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailVerification;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const EmailVerification = () => {
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); 

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Verification token is missing.');
        console.log('No token found.');
        return;
      }

      try {
        // Decode the JWT token to get the role
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token to check its contents

        const userRole = decodedToken.role; // Extract the role from the decoded token
        console.log('User Role:', userRole); // Log the role to ensure it's correct

        // Call the appropriate API based on the role (doctor or patient)
        if (userRole === 'doctor') {
          // Doctor verification
          const response = await axios.get(`http://localhost:5000/doctors/verify-email/${token}`);
          if (response.status === 200) {
            setIsVerified(true);
            setTimeout(() => {
              navigate('/'); // Redirect to login after successful verification
            }, 3000);
          }
        } else if (userRole === 'patient') {
          // Patient verification
          const response = await axios.get(`http://localhost:5000/patients/verify-email/${token}`);
          if (response.status === 200) {
            setIsVerified(true);
            setTimeout(() => {
              navigate('/'); // Redirect to login after successful verification
            }, 3000);
          }
        } else {
          setError('Invalid user role.');
        }
      } catch (error) {
        console.error('Verification error:', error.response ? error.response.data : error.message);
        setError('Email verification failed. Please check the token or try again later.');
      }
    };

    verifyEmail(); // Call verifyEmail directly inside the effect
  }, [token, navigate]); // `token` and `navigate` as dependencies

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {isVerified ? (
          <div className="text-green-500 text-center">
            <h3 className="font-bold">Your email has been verified successfully!</h3>
            <p>You will be redirected to the login page shortly.</p>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="font-semibold">Verifying your email...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;