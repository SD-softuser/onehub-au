import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import useQuery from "../utils/useQuery";
import { FiEdit3, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from '../app/slices/loaderSlice';
import { setCurrentPartner } from "../app/slices/partnerSlice";
import { partnersList } from "../../constants";

const partners = [
  { name: "AT&T", logo: "assets/att.webp" },
  { name: "Verizon", logo: "assets/verizon.webp" },
  { name: "T-Mobile", logo: "assets/tmobile.webp" },
  { name: "Best Buy", logo: "assets/bestbuy.webp" }
];

const PartnerButton = ({ selectedPartner,propPartner }) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`flex flex-row gap-3 justify-center items-center px-4 py-2 border-[1px] rounded-xl ${selectedPartner === propPartner.name
        ? "border-googleBlue-500 text-googleBlue-500"
        : ""
        }`}
      onClick={() => dispatch(setCurrentPartner(propPartner))}
    >
      <img src={propPartner.icon} alt={`${propPartner.name}`} className="h-6 w-8" />
      <h6>{propPartner.name}</h6>
    </button>
  );
};

const LeaderBoardForm = () => {
  const query = useQuery();
  const territory_id = query.get("territory_id");
  // const [partner, setPartner] = useState("AT&T");
  const partner = useSelector((state)=>state.partner.currentPartner)
  const [date, setDate] = useState("2024-05-07");
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [columns, setColumns] = useState([]);
  const [changedInputs, setChangedInputs] = useState({});

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const handleDateChange = (e) => {
    const year = e.year;
    const month = String(e.month.number).padStart(2, "0");
    const day = String(e.day).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    setDate(dateString);
  };

  const getUniqueColumns = (data) => {
    const columns = new Set();
    for (const item of data) {
      Object.keys(item).forEach((key) => columns.add(key));
    }
    return Array.from(columns);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoader());
        const encodedTerritory = encodeURIComponent(territory_id);
        const encodedDate = encodeURIComponent(date);
        const encodedPartner = encodeURIComponent(partner.name);
        const response = await axios.get(
          `/api/fetchProductSales?territory_id=${encodedTerritory}&date=${encodedDate}&partner=${encodedPartner}`
        );

        setTableData(response.data);
        setOriginalTableData(response.data);
        setColumns(getUniqueColumns(response.data));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchData();
  }, [territory_id, date, partner]);

  const handleEditClick = () => {
    if (isEdit) {
      saveChanges();
    } else {
      setOriginalTableData(JSON.parse(JSON.stringify(tableData))); // Save original data for cancel
    }
    setIsEdit(!isEdit);
  };

  const handleCancelClick = () => {
    setTableData(originalTableData); // Revert to original data
    setChangedInputs({});
    setIsEdit(false);
  };

  const handleInputChange = (rowIndex, colName, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][colName] = value;
    setTableData(updatedTableData);

    const key = `${rowIndex}-${colName}`;
    setChangedInputs((prev) => ({
      ...prev,
      [key]: { rowIndex, colName, value }
    }));
  };

  const saveChanges = async () => {
    try {
      dispatch(showLoader());
      for (const key in changedInputs) {
        const { rowIndex, colName, value } = changedInputs[key];
        const row = tableData[rowIndex];
        if (colName !== "store_name" && colName !== "city") {
          await axios.put('/api/updateProductSales', {
            sales: value,
            store_name: row.store_name,
            productModel: colName,
            date: date
          });
        }
      }
      setChangedInputs({});
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      dispatch(hideLoader());
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-white w-full px-4 py-4 rounded-xl shadow-md">
      {/* Partners */}
      <div className="flex gap-3">
        {partnersList.map((partnerName) => (
          <PartnerButton
            key={partnerName.name}
            selectedPartner={partner.name}
            propPartner={partnerName}
          />
        ))}
      </div>

      {/* Calendar */}
      <div className="flex gap-2 my-4 items-center">
        <h1 className="font-semibold">Date Selector:</h1>
        <DatePicker
          value={date}
          onChange={handleDateChange}
          style={{ padding: "20px 12px" }}
        />
      </div>

      {/* Instructions */}
      <div className="instructions px-3 py-2 border-2 border-gray-200 rounded-md">
        <p className="font-black text-lg">
          How to update daily assisted sales?
        </p>
        <ol className="list-decimal list-inside">
          <li>Select the partner from above.</li>
          <li>
            Select the date for which you want to update the assisted sales from
            above.
          </li>
          <li>Enter the assisted sales value by product for each store.</li>
          <li>Click Save button post entering the correct value below.</li>
        </ol>
      </div>

      <div className="flex gap-2 justify-end items-center py-3 text-blue-600">
        <button
          className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
          onClick={handleEditClick}
        >
          {isEdit ? "Save" : "Edit"} <FiEdit3 />
        </button>
        {isEdit && (
          <button
            className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
            onClick={handleCancelClick}
          >
            Cancel <FiX />
          </button>
        )}
      </div>

      <table className="table-auto w-full my-3">
        {/* Table Header */}
        <thead>
          <tr>
            {columns.map((colName) => (
              <th
                key={colName}
                className={`px-4 py-2 border border-gray-300 text-left`}
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border border-gray-300`}
            >
              {columns.map((colName) => (
                <td key={`${rowIndex}-${colName}`} className={`hover:bg-gray-100 ${colName === 'store_name' ? 'will-change-scroll w-96' : ''}`}>
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(e) => handleInputChange(rowIndex, colName, e.target.value)}
                    disabled={!isEdit || colName === "store_name" || colName === "city"}
                    className="border border-gray-300 w-full px-4 py-1 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardForm;
