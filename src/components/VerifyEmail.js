import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const EmailVerification = () => {
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from the URL parameter

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
              navigate('/login'); // Redirect to login after successful verification
            }, 3000);
          }
        } else if (userRole === 'patient') {
          // Patient verification
          const response = await axios.get(`http://localhost:5000/patients/verify-email/${token}`);
          if (response.status === 200) {
            setIsVerified(true);
            setTimeout(() => {
              navigate('/login'); // Redirect to login after successful verification
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
