import React, { useState } from 'react'
import DatePicker from 'react-multi-date-picker'

const LeaderBoardForm = () => {
  const [partner, setPartner] = useState('AT&T')
  const [value, setValue] = useState(new Date())

  return (
    <div className='bg-white w-full px-4 py-4 rounded-xl shadow-md'>
      <div className='flex gap-3'>
        <button className={`px-4 py-2 border-[1px] rounded-xl ${partner === "AT&T" ? "border-googleBlue-500 text-googleBlue-500": ""}`} onClick={() => setPartner('AT&T')}>
          <div></div>
          <h6>AT&T</h6>
        </button>
        <button className={`px-4 py-2 border-[1px] rounded-xl ${partner === "Verizon" ? "border-googleBlue-500 text-googleBlue-500": ""}`} onClick={() => setPartner('Verizon')}>
          <div></div>
          <h6>Verizon</h6>
        </button>
        <button className={`px-4 py-2 border-[1px] rounded-xl ${partner === "T-Mobile" ? "border-googleBlue-500 text-googleBlue-500": ""}`} onClick={() => setPartner('T-Mobile')}>
          <div></div>
          <h6>T-Mobile</h6>
        </button>
        <button className={`px-4 py-2 border-[1px] rounded-xl ${partner === "Best Buy" ? "border-googleBlue-500 text-googleBlue-500": ""}`} onClick={() => setPartner('Best Buy')}>
          <div></div>
          <h6>Best Buy</h6>
        </button>
      </div>

      <div className='flex gap-2 my-4 items-center'>
        <h1 className='font-semibold'>Date Selector:</h1>
        <DatePicker
          value={value}
          onChange={setValue}
          style={{ padding: '20px 12px' }}
        />
      </div>
    </div>
  )
}

export default LeaderBoardForm