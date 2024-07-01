import React from 'react'

const Weekly = () => {
  return (
    <main className='bg-white w-full rounded-2xl shadow-lg'>
      <h1 className='font-semibold text-center text-4xl my-4'>
        Weekly Priorities
      </h1>
      <div className='w-full flex justify-center items-center mb-4'>
        <div className='bg-googleBlue-50 font-medium px-2 py-1 rounded-lg'>
          <h6 className='text-[#164EA7] text-center'>
            Week of June 24th
          </h6>
        </div>
      </div>

      <div className='bg-[#F6F7FA] w-full h-[2px]' />

      <div className='flex flex-col gap-4 pl-4 pr-6 pb-8 mt-4'>
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
      </div>
    </main>
  )
}

export default Weekly