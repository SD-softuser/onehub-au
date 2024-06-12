import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Structure = () => {
  return (
    <main className='bg-white w-full rounded-2xl shadow-lg'>
      <div className='py-4 px-4 relative'>
        <h1 className='text-4xl text-googleBlue-400'>
          Your Day at Best Buy
        </h1>
        <div className='absolute top-4 right-4 w-32 h-32 rounded-full border-[1px]'>
          <img src="/assets/Structure Vector.png" alt="" />
          <div className='absolute top-[10%] left-[-15%] w-10 p-2 bg-white rounded-full border-[1px]'>
            <img src="Google Logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className='bg-[#F6F7FA] w-full h-[2px]' />

      <div className='px-6'>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Check-in to GFA and LILO" />
          <FormControlLabel control={<Checkbox />} label="Connect with Management" />
          <FormControlLabel control={<Checkbox />} label="Merchandising:" />
          <FormControlLabel control={<Checkbox />} label="Follow the weekly priorities (listed on the following slide) and training materials" />
          <FormControlLabel control={<Checkbox />} label="Check-in to GFA and LILO" />
          <FormControlLabel control={<Checkbox />} label="Connect with Management" />
          <FormControlLabel control={<Checkbox />} label="Follow the weekly priorities (listed on the following slide) and training materials" />
        </FormGroup>
      </div>

      <div className='w-full px-20 py-6'>
        <img src="/assets/TSM Toolbelt.png" alt="" />
      </div>
    </main>
  )
}

export default Structure
