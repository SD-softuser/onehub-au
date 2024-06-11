import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from '../components/MaxWidthWrapper'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from 'react-multi-date-picker';
import axios from 'axios';

const LeaderBoard = () => {
  const [filters, setFilters] = useState({
    country: "US",
    startdate: "2024-05-07",
    enddate: "2024-06-08",
    productModel: "Overall",
    partner: "Overall"
  })

  console.log(filters);

  const handleDateRangeChange = (e) => {
    console.log("event is :  ", e);
    const startYear = e[0].year;
    const startMonth = String(e[0].month.number).padStart(2, "0");
    const startDay = String(e[0].day).padStart(2, "0");
    const startDateString = `${startYear}-${startMonth}-${startDay}`;
    const endYear = e[1]?.year;
    const endMonth = String(e[1]?.month.number).padStart(2, "0");
    const endDay = String(e[1]?.day).padStart(2, "0");
    const endDateString = `${endYear}-${endMonth}-${endDay}`;

    console.log(startDateString, endDateString);

    setFilters({
      ...filters,
      startdate: startDateString,
      enddate: endDateString
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/fetchLeaderBoard`, {
        params: filters,
      })
      console.log("Leaderboard Data : ", response.data);
    }
    fetchData()
  }, [filters])

  return (
    <MaxWidthWrapper>
      <header className='w-full flex justify-between items-center px-4'>
        <div className='flex gap-2 h-full'>
          <button
            className={`px-6 py-2.5 border-[1px] rounded-xl transition ${filters.country === "US" && "border-googleBlue-500"}`}
            onClick={() => {
              setFilters({
                ...filters,
                country: encodeURIComponent("US")
              })
            }}
          >
            US
          </button>
          <button
            className={`px-6 py-2.5 border-[1px] rounded-xl transition ${filters.country === "CA" && "border-googleBlue-500"}`}
            onClick={() => {
              setFilters({
                ...filters,
                country: encodeURIComponent("CA")
              })
            }}
          >
            CA
          </button>
        </div>

        <div className='flex'>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Partner</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filters.partner}
              label="Partner"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  partner: e.target.value
                });
              }}
            >
              <MenuItem value={"Overall"}>Overall</MenuItem>
              <MenuItem value={"AT&T"}>AT&T</MenuItem>
              <MenuItem value={"Verizon"}>Verizon</MenuItem>
              <MenuItem value={"T-Mobile"}>T-Mobile</MenuItem>
              <MenuItem value={"Best Buy"}>Best Buy</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Product Model</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filters.productModel}
              label="Product Model"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  productModel: e.target.value
                });
              }}
            >
              <MenuItem value={"Overall"}>Overall</MenuItem>
              <MenuItem value={"Pixel 8a"}>Pixel 8a</MenuItem>
              <MenuItem value={"Pixel 8"}>Pixel 8</MenuItem>
              <MenuItem value={"Pixel 8 Pro"}>Pixel 8 Pro</MenuItem>
              <MenuItem value={"Pixel Watch"}>Pixel Watch</MenuItem>
            </Select>
          </FormControl>
        </div>
      </header>

      <div>
        <div className="flex gap-2 my-4 items-center">
          <h1 className="font-semibold">Date Selector:</h1>
          <DatePicker
            value={[filters.startdate, filters.enddate]}
            onChange={handleDateRangeChange}
            style={{ padding: "20px 12px" }}
            numberOfMonths={2}
            range
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default LeaderBoard