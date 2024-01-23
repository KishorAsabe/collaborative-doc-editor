// Error.js
import React from 'react';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-600 mb-2">We're sorry, but it seems like there's been an error.</p>
        <p className="text-gray-600 mb-2">Please try again later or contact support.</p>
        {/* You can add additional Tailwind CSS classes or customize as needed */}
      </div>
    </div>
  );
};

export default Error;
