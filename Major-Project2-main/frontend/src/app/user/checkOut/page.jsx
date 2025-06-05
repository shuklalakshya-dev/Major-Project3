'use client';
import React from 'react';
import { useFormik } from 'formik';

const CheckOut = () => {
  // Handle checkout logic
  const handleCheckout = () => {
    const form = document.getElementById('checkoutForm');
    if (form.checkValidity()) {
      // Simulate a successful checkout
      alert('Order placed successfully!');
      form.reset(); // Clear the form
    } else {
      alert('Please fill out all required fields.');
    }
  };
 
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
          toast.success('');
          router.push('/');
        }).catch((err) => {
          toast.error('Some Error Occurred');
        });
    },
  });

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Billing Information Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <form id="checkoutForm">
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
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
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                   type="text"
                   id="email"
                   onChange={formik.handleChange}
                   value={formik.values.email}
                   className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                   placeholder="email"
                   required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                    placeholder="phone"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                 type="text"
                 id="address"
                 onChange={formik.handleChange}
                 value={formik.values.address}
                 className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                 placeholder="Address"
                 required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                   type="text"
                   id="zip"
                   onChange={formik.handleChange}
                   value={formik.values.zip}
                   className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                   placeholder="Zip"
                   required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Product</span>
                <span className="font-medium">Total</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Product 1</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Product 2</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$50.00</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-emerald-600 text-white px-6 py-2 rounded-2xl hover:bg-emerald-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;