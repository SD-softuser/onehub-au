// components/SkeletonLoader.jsx

import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full bg-white rounded-lg px-6 py-10 shadow-md mt-8">
      {/* Placeholder elements for loading state */}
      <div className="animate-pulse flex justify-center items-center gap-4 px-4 py-3 rounded-full shadow-md">
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="animate-pulse relative grid grid-cols-2 mt-4 gap-4 h-60 overflow-hidden">
        <div className="w-full h-full bg-gray-200 rounded-md"></div>
        <div className="w-full h-full bg-gray-200 rounded-md"></div>
        <div className="absolute h-full w-full bg-gradient-to-t from-white to-transparent to-40%"></div>
      </div>

      <button
        className="mx-auto bg bg-googleBlue-100 text-googleBlue-500 px-6 py-1.5 rounded-full font-medium flex justify-center items-center text-sm gap-2 my-2"
      >
        <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
      </button>

      <div className="w-full bg-[#F5F5F5] flex justify-between px-3 py-2 rounded-xl mt-4">
        <div className="flex gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col justify-center">
            <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div className="bg-[#EBEBEB] text-[#333333] rounded-full px-4 flex justify-center items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
