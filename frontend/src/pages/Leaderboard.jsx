import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import TrophyDisplay from "../components/TrophyDisplay";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../app/slices/loaderSlice";
import SvgComponent from "../components/SvgComponent";
import TableSkeleton from "../components/TableSkeleton";

const LeaderBoard = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loader.isLoading)
  console.log("loading ? ", isLoading);

  const [partners, setPartners] = useState(["Overall", "AT&T", "Verizon", "T-Mobile", "Best Buy"])

  const [filters, setFilters] = useState({
    country: "US",
    startdate: "2024-05-07",
    enddate: "2024-06-08",
    productModel: "Overall",
    partner: "Overall",
  });

  const [tableData, setTableData] = useState([]);
  console.log(tableData)
  const [columns, setColumns] = useState([]);

  const getUniqueColumns = (data) => {
    const columns = new Set();
    for (const item of data) {
      Object.keys(item).forEach((key) => columns.add(key));
    }
    return Array.from(columns);
  };

  const proccessedData = (data) => {
    return [...data].sort((a, b) => b.total_sales - a.total_sales).slice(0, 3).map((item, index) => ({ rank: index + 1, territory: item.territory, sales: item.total_sales }))
  }
  const sortedData = (data) => {
    setDataRanking(proccessedData(data))
    return [...data].sort((a, b) => b.total_sales - a.total_sales);
  };

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
      enddate: endDateString,
    });
  };
  const [dataRanking, setDataRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoader())
        const response = await axios.get(`/api/fetchLeaderBoard`, {
          params: filters,
        });
        console.log("Leaderboard Data : ", response.data);
        setTableData(sortedData(response.data));
        setColumns(getUniqueColumns(sortedData(response.data)));
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Finally done");
        dispatch(hideLoader())
      }
    };
    fetchData();
  }, [filters, dispatch]);

  return (
    <MaxWidthWrapper>
      <header className="w-full flex justify-between items-center px-4">
        <div className="flex gap-2 h-full">
          <button
            className={`flex flex-row gap-3 justify-center items-center px-6 py-2.5 border-[1px] rounded-xl transition ${filters.country === "US" && "border-googleBlue-500"
              }`}
            onClick={() => {
              setFilters({
                ...filters,
                partner: "Overall",
                country: encodeURIComponent("US"),
              });
              setPartners(["Overall", "AT&T", "Verizon", "T-Mobile", "Best Buy"]);
            }}
          >
            <img src="assets/us.webp" alt="US" className="h-6 w-12" />
            <p>US</p>
          </button>
          <button
            // disabled for now
            className={`flex flex-row gap-3 justify-center items-center px-6 py-2.5 border-[1px] rounded-xl transition ${filters.country === "CA" && "border-googleBlue-500"
              }`}
            onClick={() => {
              setFilters({
                ...filters,
                partner: "Overall",
                country: encodeURIComponent("CA"),
              });
              setPartners(["Overall", "Best Buy", "Telus", "Roger", "Bell", "Videotron"]);
            }}
          >
            <img src="assets/ca.webp" alt="US" className="h-6 w-12" />
            <p>CA</p>
          </button>
        </div>

        <div className="flex">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Partner
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filters.partner}
              label="Partner"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  partner: e.target.value,
                });
              }}
            >
              {partners.map(partner => (
                <MenuItem value={partner}>{partner}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Product Model
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filters.productModel}
              label="Product Model"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  productModel: e.target.value,
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
          <h1 className="font-semibold">Date Range Selector:</h1>
          <DatePicker
            value={[filters.startdate, filters.enddate]}
            onChange={handleDateRangeChange}
            style={{ padding: "20px 12px" }}
            numberOfMonths={2}
            range
          />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          {(tableData && dataRanking) && <TrophyDisplay data={dataRanking} />}

          <table className="table-auto w-full my-3">
            {/* Table Header */}
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                {" "}
                <th className={`px-4 py-2 text-left text-gray-600`}>Rank</th>{" "}
                {columns.map((colName) => (
                  <th key={colName} className={`px-4 py-2 text-left text-gray-600`}>
                    {/* Capitalize the first letter */}
                    {colName.charAt(0).toUpperCase() + colName.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex === 0 ? "font-bold" : ""}`}
                >
                  <td className={`px-4 py-2 hover:bg-gray-200 text-gray-500`}>
                    {rowIndex + 1}
                  </td>
                  {columns.map((colName, colIndex) => (
                    <td
                      key={`${rowIndex}-${colName}`}
                      className={`px-4 py-2 hover:bg-gray-200 ${colIndex === 1 && "flex gap-2"}`}
                    >
                      {colIndex === 1 && <SvgComponent />}
                      {row[colName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default LeaderBoard;
