import React from 'react';

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <div className='bg-[#F6F7FA] w-full h-full min-h-screen'>
      <div className={`mx-auto w-full h-full max-w-screen-xl px-2.5 md:px-20 font-googleSans ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default MaxWidthWrapper;