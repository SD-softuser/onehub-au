import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCountry } from '../app/slices/countrySlice';
import useQuery from '../utils/useQuery';

const Weekly = () => {

  const query = useQuery();
  const territory_id = query.get("territory_id");

  const location = useLocation()
  const country = useSelector((state) => state.country.country)
  console.log(country);
  const dispatch = useDispatch();
  useEffect(() => {
    if (territory_id) {
      dispatch(fetchCountry(territory_id));
    }
  }, [territory_id, dispatch]);
  // const store = 
  const { name } = location.state;

  const [imageUrls, setImageUrls] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://storehub-image.testexperience.site/next_level/storehub-company/${country}/${name}/Weekly`);
        const data = response.data.images;
        console.log("Data is : ", data);
        setImageUrls(data);
      } catch (error) {
        console.error("Error fetching images: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages()
  }, [name, country])

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

      {loading ? (
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
      ) : (
        <div className='flex flex-col gap-4 pl-4 pr-6 pb-8 mt-4'>
          {imageUrls.map((url, index) => (
            <div className='relative' key={index}>
              <img src={url} alt={`Weekly priority ${index}`} key={index} className={`relative ${(country === "CA" && (name === "Rogers" || name === "Bell" || name === "Telus") && index == 1) && 'cursor-pointer'}`} onClick={() => {
                if(country === "CA" && (name === "Rogers" || name === "Bell" || name === "Telus") && index == 1){
                  console.log("Link");  
                  window.location.href = "https://docs.google.com/forms/d/1qe7hZj1HzTRQYU6xtORygzIcUE_1EUmVfExHW_Myv7Y/formrestricted"
                }
              }} />
              
              
              
              {name === "AT&T" && index == 2 && (
                <div className='bg-black/0 absolute top-[50%] left-[20%] flex gap-2 right-[8%]'>
                  <a href="https://docs.google.com/presentation/d/1uus22kWoKBWo9b3drQQFNUrJbjsAt7dspesttCa40Bg/edit" className='relative w-full h-10 bg-black/0' target='_blank'></a>
                  <a href="https://docs.google.com/presentation/d/1FlE3Erf8F52t7jhPY0g_4wYji1tE-YzW4DMPs5mPnTE/edit#slide=id.g2cae7cf6e6d_1_24" className='relative w-full h-10 bg-black/0' target='_blank'></a>
                  <a href="https://docs.google.com/presentation/d/1o8L1KoT869XOBpDjf1heziup3jcgHcUwbBF1pnGwfKM/edit#slide=id.g2cae7cf6e6d_1_0" className='relative w-full h-10 bg-black/0' target='_blank'></a>
                  <a href="https://docs.google.com/presentation/d/1ozAqB0m_MyqyG1LwVb7oBzAyPhu5qLUgQ9WKVWHZFNg/edit#slide=id.g2cae7cf6e6d_1_12" className='relative w-full h-10 bg-black/0' target='_blank'></a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}



      {/* <div className='flex flex-col gap-4 pl-4 pr-6 pb-8 mt-4'>
        <div className='flex gap-4'>
          <div className='relative w-16 h-16'>
            <p className='absolute text-googleBlue-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>1</p>
            <img src="/assets/Index Vector.png" alt="" className='object-contain' />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <img src="/assets/Pixel 8a.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                WRR has improved, inventory in the channel is strong, the most affordable AI device has to be the focus. Leverage the family link demo with all ME&apos;s, and leverage the G3 message being available in an A Series.
              </h6>
            </div>
          </div>
        </div>


        <div className='flex gap-4'>
          <div className='relative w-16 h-16'>
            <p className='absolute text-googleBlue-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>2</p>
            <img src="/assets/Index Vector.png" alt="" className='object-contain' />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <img src="/assets/Gemini.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                Critically important to emphasize Pixel + Gemini, every ME, ASM, RSM should be familiar with Gemini and know a few solid use cases.
              </h6>
            </div>
          </div>
        </div>


        <div className='flex gap-4'>
          <div className='relative w-16 h-16'>
            <p className='absolute text-googleBlue-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>3</p>
            <img src="/assets/Index Vector.png" alt="" className='object-contain' />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <img src="/assets/Advocacy.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                As we prepare for another launch, it is very important that we learn from last year, start identifying PhG&apos;s that are going to stay in the program and ones that you would like to add, the turn around will be fast come next launch and you should be as prepared as possible early to make it easier when we deploy.
              </h6>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  )
}

export default Weekly