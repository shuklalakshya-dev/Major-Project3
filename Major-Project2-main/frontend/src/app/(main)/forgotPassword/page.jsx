'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      handleResetPassword(values.email);
    },
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleResetPassword = () => {
    const email = formik.values.email;
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setSuccessMessage('');
      return;
    }

    // Reset messages
    setErrorMessage('');
    setSuccessMessage('Processing your request...');

    // Make API call to send reset password email
    axios.post('http://localhost:5000/user/forgot-password', { email })
      .then((result) => {
        setSuccessMessage('A password reset link has been sent to your email');
        toast.success('Reset link sent successfully');
      })
      .catch((err) => {
        setErrorMessage('Failed to send reset link. Please try again.');
        toast.error('Error sending reset link');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-lime-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Forgot Password</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Enter your email address</label>
            <input
              type="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Enter your email"
            />
          </div>
          
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
          {successMessage && <div className="text-green-500 text-sm mt-2">{successMessage}</div>}
          
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded-xl hover:bg-lime-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/signin" className="text-lime-500 hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
