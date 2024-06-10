import React from 'react'

const Weekly = () => {
  return (
    <main className='bg-white w-full rounded-2xl shadow-lg'>
      <h1 className='font-semibold text-center text-4xl my-4'>
        Weekly Priorities
      </h1>
      <div className='bg-[#F6F7FA] w-full h-[2px]' />

      <div className='flex flex-col gap-4 pl-4 pr-6 py-8'>
        <div className='flex gap-4'>
          <div className='relative w-16 h-16'>
            <p className='absolute text-googleBlue-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>1</p>
            <img src="/assets/Index Vector.png" alt="" className='object-contain' />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <img src="/assets/Pixel 8a Launch.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                Priority and training focus on Pixel 8a and on-self. Use the TSM execution guide when structuring visits.
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
              <img src="/assets/Google Family Link.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                Review the pixel 8a product information = Family Link demo with every store associate to ensure they are aware of the features to be able to drive sell out in stores.
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
              <img src="/assets/Google X Finals.png" className='object-contain' alt="" />
            </div>
            <div className='bg-googleBlue-50 rounded-xl px-4 py-3'>
              <h6>
                Drive sell-out at AR with Finals incentives and jerseys.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Weekly