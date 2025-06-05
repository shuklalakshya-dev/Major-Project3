'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const TemplateDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  // Use this instead of direct localStorage access to avoid SSR issues
  const [token, setToken] = useState(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle localStorage in useEffect to avoid SSR issues
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);
  // Fetch product details from the server
  const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/template/getbyid/${id}`);
      setSelectedTemplate(res.data);
    } catch (err) {
      setError('Error fetching template details');
      toast.error('Error fetching template details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id, fetchDetails]);

  // Placeholder for when no image is available
  const placeholderImage = 'https://via.placeholder.com/300';

  return (
    <div className="min-h-screen p-8 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center text-white shadow-lg p-4 mb-8 font-bold rounded-lg">
        React Template Details
      </h1>

      <div className="w-full max-w-4xl p-4 bg-black rounded-lg shadow-lg">
        {/* Template Details */}
        {loading ? (
          <p className="text-xl text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          selectedTemplate && (
            <div>
              <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                {selectedTemplate.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Image Section */}
                <div className="col-span-4 flex justify-center">
                  <Image
                    src={selectedTemplate.image || placeholderImage}
                    alt={selectedTemplate.name}
                    width={320}
                    height={320}
                    className="w-80 h-80 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  />
                </div>

                {/* Product Info Section */}
                <div className="col-span-8">
                  <div className="mb-4">
                    <p className="font-bold text-2xl text-black">
                      <span className="block mt-1 font-bold text-gray-700">{selectedTemplate.name}</span>
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold text-xl text-black">
                      Description:
                      <span className="block mt-1 text-gray-600">{selectedTemplate.description}</span>
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold text-xl text-black">
                      Price:
                      <span className="block mt-1 text-green-600">₹ {selectedTemplate.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TemplateDetailsPage;