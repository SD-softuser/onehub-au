import React, { useState } from 'react';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Structure from '../components/Structure';
import Weekly from '../components/Weekly';

const FieldGuide = () => {
  const [mode, setMode] = useState('structure');
  const location = useLocation()
  const { name, icon } = location.state || {}
  console.log("location props", location.state);

  return (
    <>
      <header className='bg-white w-full py-4 fixed flex justify-center items-center gap-3 z-50 shadow-lg'>
        <Link
          to={{
            pathname: "/",
            search: location.search
          }}
          className='bg-white border-2 py-3 px-5 rounded-2xl absolute top-[50%] left-[5%] -translate-y-[50%]'
        >
          <FaChevronLeft />
        </Link>
        <img
          src={icon}
          alt={name}
          className="h-10 w-10"
        />
        <h1 className='font-semibold text-2xl'>
          {name} Field Guide
        </h1>
      </header>

      <MaxWidthWrapper className="py-28 flex flex-col justify-between">
        {mode === 'structure' ? (
          <Structure />
        ) : (
          <Weekly />
        )}

        <div className='fixed bottom-8 left-10 right-10 bg-white flex gap-2 p-2 rounded-full shadow-xl'>
          <button
            className={`transition py-3 w-full rounded-full ${mode === 'structure' ? "bg-googleBlue-500 text-white" : "bg-googleBlue-50"}`}
            onClick={() => setMode('structure')}
          >
            Structure of a visit
          </button>
          <button
            className={`transition py-3 w-full rounded-full ${mode === 'weekly' ? "bg-googleBlue-500 text-white" : "bg-googleBlue-50"}`}
            onClick={() => setMode('weekly')}
          >
            Weekly Priorities
          </button>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default FieldGuide;
