'use client';
import { useFormik } from 'formik';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Signup = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values)
        .then((result) => {
          console.log(result.status);
          toast.success('Signup Successfully');
          router.push('/signin');
        }).catch((err) => {
          toast.error('Some Error Occurred');
        });
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-lime-100 rounded-lg shadow-xl p-8 rounded-l-lg rounded-r-lg  "
      style={{
        backgroundImage: 'url("")'
      }}
    >
      <div className="p-12 max-w-lg mx-auto bg-white rounded-2xl shadow-lg bg-opacity-80 ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-56 bg-lime-600 text-white px-6 py-3 rounded-xl hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
