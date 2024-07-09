import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCountry } from '../app/slices/countrySlice';
import useQuery from '../utils/useQuery';
import { fetchWeekly } from '../app/slices/weeklySlice';

const Weekly = () => {

  const query = useQuery();
  const dispatch = useDispatch();
  const territory_id = query.get("territory_id");

  const location = useLocation();
  const { name } = location.state;

  const { country } = useSelector((state) => state.country)
  const { data: weekly, status: weeklyStatus, error: weeklyError } = useSelector((state) => state.weekly)

  useEffect(() => {
    if (territory_id) {
      dispatch(fetchCountry(territory_id));
    }
  }, [territory_id, dispatch]);

  useEffect(() => {
    if (territory_id && country && name) {
      dispatch(fetchWeekly({ country: country, partner: name }));
      console.log(country, name, "\nWeekly", weekly);
    }
  }, [territory_id, name, country, dispatch]);


  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(`https://storehub-image.testexperience.site/next_level/storehub-company/${country}/${name}/Weekly`);
  //       const data = response.data.images;
  //       console.log("Data is : ", data);
  //       setImageUrls(data);
  //     } catch (error) {
  //       console.error("Error fetching images: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchImages()
  // }, [name, country])

  return (
    <main className='bg-white w-full rounded-2xl shadow-lg'>
      <h1 className='font-semibold text-center text-4xl my-4'>
        Weekly Priorities
      </h1>
      <div className='w-full flex justify-center items-center mb-4'>
        <div className='bg-googleBlue-50 font-medium px-2 py-1 rounded-lg'>
          <h6 className='text-[#164EA7] text-center'>
            Week of July 1st
          </h6>
        </div>
      </div>

      <div className='bg-[#F6F7FA] w-full h-[2px]' />

      {weeklyStatus === 'loading' ? (
        <div className="flex flex-col gap-4 pl-4 pr-6 pb-8 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="relative w-16 h-16 bg-gray-300 rounded"></div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="w-full h-32 bg-gray-300 rounded"></div>
                <div className="w-full h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : weeklyStatus === 'succeeded' ? (
        <div className='flex flex-col gap-4 pl-4 pr-6 pb-8 mt-4'>
          {weekly && weekly.map((card, index) => (
            <div className='flex gap-4' key={index}>
              <div className='relative w-16 h-16'>
                <p className='absolute text-googleBlue-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                  {card.order || index + 1}
                </p>
                <img src="/assets/Index Vector.png" alt="vector" className='object-contain' />
              </div>

              <div className='flex-1 flex flex-col gap-4'>
                <div>
                  {card.imageURL && <img src={card.imageURL} alt="" className='object-contain' />}
                </div>
              
                <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
                  <h6>
                    {card.description}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}




    </main>
  )
}

export default Weekly