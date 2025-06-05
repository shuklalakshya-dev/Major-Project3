'use client';
import { useFormik } from 'formik';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          console.log(result.data);
          if (result.data.role === 'admin') {
            localStorage.setItem('admintoken', result.data.token);
            localStorage.setItem('admin', JSON.stringify(result.data));
            document.cookie = `admintoken=${result.data.token}`;
            router.push('/admin/add-template');
          } else {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data));
            document.cookie = `token=${result.data.token}`;
            router.push('/');
          }
          toast.success('Login Successfully');
        }).catch((err) => {
          toast.error('Some Error Occurred');
        });
    },
  });

  return (
    <div
    className="flex items-center justify-center min-h-screen bg-lime-100 rounded-lg shadow-xl p-8 rounded-l-lg rounded-r-lg  "
    style={{
      backgroundImage: 'url("https://scontent.flko11-1.fna.fbcdn.net/v/t39.30808-6/460499278_453298471193103_1927094701927232585_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e1afaa&_nc_ohc=o03zHfGyIMAQ7kNvgGfBtaL&_nc_ht=scontent.flko11-1.fna&_nc_gid=AzcTdhXjOp7qhZinHC-YaZC&oh=00_AYBJufMNffiU7fTyuVGKRKk3_9Y2bui8soGXpxByjIqQlw&oe=66F75FB2")'
    }}
  >
    <div className="p-12 max-w-lg mx-auto bg-white rounded-2xl shadow-lg bg-opacity-80 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6 ">
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
            className="flex justify-center bg-lime-600 w-64 text-white px-6 py-3 rounded-xl hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
  
      {/* Forgot Password Link */}
      <div className="mt-4 text-center">
        <a href="forgotPassword" className="text-sm text-indigo-600 hover:underline">
          Forgot password?
        </a>
      </div>
  
      {/* Sign Up Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
  
  );
}

export default Login;
