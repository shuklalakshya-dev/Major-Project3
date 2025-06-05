'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TemplateDetailsRedirect = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to browse templates page since no specific template ID is provided
    router.push('/browse-template');
  }, [router]);

  return (
    <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Redirecting to Templates
        </h1>
        <p className="text-gray-600 mb-6">
          Please select a specific template to view its details.
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default TemplateDetailsRedirect;
