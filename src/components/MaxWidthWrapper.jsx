import React from 'react';

const MaxWidthWrapper = ({ className, children }) => {
  return (
    // <div className='bg-[#F6F7FA] w-full h-full min-h-screen'>
    <div
      className={`bg-[#F6F7FA] mx-auto w-full overflow-hidden min-h-screen px-2.5 md:px-8 font-googleSans ${className}`}
    >
      {children}
    </div>
    // </div>
  );
};

export default MaxWidthWrapper;
