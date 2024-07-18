import React, { useEffect, useState } from 'react';
import { FaImage } from "react-icons/fa6";
import clsx from 'clsx';

const ImageSkeleton = () => {
  return (
    <div className='h-44 w-full bg-gray-200 flex justify-center items-center rounded-lg'>
      <FaImage className='text-zinc-400 animate-pulse' size={32} />
    </div>
  );
}

const SuspenseImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className="h-full w-full relative">
      {!loaded && <ImageSkeleton />}
      <img 
        src={src} 
        alt={alt} 
        className={clsx(
          'h-full w-full object-contain rounded-lg transition-opacity duration-500',
          { 'opacity-0': !loaded, 'opacity-100': loaded }
        )} 
        loading="lazy"
      />
    </div>
  );
};

export default SuspenseImage;
