import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmailVerification = () => {
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();  // Extract token from the URL parameter

  useEffect(() => {
    const verifyEmail = async () => {
      console.log('Token:', token); // Log the token to ensure it's extracted correctly.

      if (!token) {
        setError('Verification token is missing.');
        console.log('No token found in URL.'); // Log if token is missing
        return;
      }

      try {
        console.log('Sending request to backend...');
        
        const response = await axios.get(`http://localhost:5000/doctors/verify-email/${token}`);
        console.log('Backend response:', response.data); // Log the response from the backend

        if (response.status === 200) {
          setIsVerified(true);
          console.log('Email verified successfully. Redirecting to login...');
          setTimeout(() => {
            console.log('Navigating to login page...');
            navigate('/'); // Redirect to login after successful verification
          }, 3000); // Wait 3 seconds before redirecting
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
