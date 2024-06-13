import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import useQuery from "../utils/useQuery";
import { FiEdit3, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../app/slices/loaderSlice";
import { setCurrentPartnerState } from "../app/slices/currentPartnerSlice";
import { partnersList, CApartnersList } from "../../constants";

const PartnerButton = ({ selectedPartner, propPartner }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={`flex flex-row gap-3 justify-center items-center px-4 py-2 border-[1px] rounded-xl ${
        selectedPartner === propPartner.name
          ? "border-googleBlue-500 text-googleBlue-500"
          : ""
      }`}
      onClick={() => dispatch(setCurrentPartnerState(propPartner))}
    >
      <img
        src={propPartner.icon}
        alt={`${propPartner.name}`}
        className="h-6 w-7"
      />
      <h6>{propPartner.name}</h6>
    </button>
  );
};

const LeaderBoardForm = () => {
  const query = useQuery();
  const territory_id = query.get("territory_id");
  // const [partner, setPartner] = useState("AT&T");
  const [country, setCountry] = useState("CA");
  const currentPartnerUS = useSelector((state) => state.partner.currentPartner);
  const currentPartnerCA = useSelector(
    (state) => state.partnerCA.currentPartner
  );
  const partner = useSelector((state) => state.currentPartner);
  const convertDate = (date)=>{
    const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  }
  const [date, setDate] = useState(convertDate(Date.now()));
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [template, setTemplate] = useState([]);
  console.log(template);
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd,setIsAdd] = useState(false);
  const [columns, setColumns] = useState([
    "store_name",
    "city",
    "date",
    "country",
    "Pixel 8a",
    "Pixel 8",
    "Pixel 8 Pro",
    "Pixel Watch",
  ]);
  // console.log(columns)
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
        setTableData([]);
        const encodedTerritory = encodeURIComponent(territory_id);
        // const encodedDate = encodeURIComponent(date);
        const encodedPartner = encodeURIComponent(partner.name);
        const response = await axios.get(
          `/api/fetchProductSales?territory_id=${encodedTerritory}&partner=${encodedPartner}`
        );
        console.log(response.data);
        setAllData(response.data);
        setTemplate(response.data);
        filterDataByDate(response.data, date);
      } catch (err) {
        console.error("Error fetching data:", err);
        setAllData([]);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchData();
  }, [territory_id, partner, date]);

  const filterDataByDate = (data, selectedDate) => {
    console.log(selectedDate);
    const filteredData = data.filter(
      (item) => formatDate(item.date) === selectedDate
    );
    console.log(filteredData);
    setTableData(filteredData);
    setOriginalTableData(filteredData);
    if (filteredData.length > 0) {
      setColumns(getUniqueColumns(filteredData));
    } else {
      console.log("clicked");
      setColumns([
        "store_name",
        "city",
        "date",
        "country",
        "Pixel 8a",
        "Pixel 8",
        "Pixel 8 Pro",
        "Pixel Watch",
      ]);
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetch = async () => {
      const encodedTerritory = encodeURIComponent(territory_id);
      const response = await axios.get(
        `/api/fetchCountry?territory_id=${encodedTerritory}`
      );
      const data = response.data;
      setCountry(data[0].country);
    };
    fetch();
  }, [territory_id]);

  useEffect(() => {
    if (country === "US") {
      dispatch(setCurrentPartnerState(currentPartnerUS));
    } else {
      dispatch(setCurrentPartnerState(currentPartnerCA));
      console.log("set CA");
    }
  }, [country]);

  const handleEditClick = () => {
    if (isEdit) {
      saveChanges();
    } else {
      setOriginalTableData(JSON.parse(JSON.stringify(tableData))); // Save original data for cancel
    }
    setIsEdit(!isEdit);
    setIsAdd(true);
  };

  const handleCancelClick = () => {
    setTableData(originalTableData); // Revert to original data
    setChangedInputs({});
    setIsEdit(false);
    setIsAdd(false)
  };

  const handleInputChange = (rowIndex, colName, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][colName] = value;
    setTableData(updatedTableData);

    const key = `${rowIndex}-${colName}`;
    setChangedInputs((prev) => ({
      ...prev,
      [key]: { rowIndex, colName, value },
    }));
  };

  

  const saveChanges = async () => {
    try {
      dispatch(showLoader());
      for (const key in changedInputs) {
        const { rowIndex, colName, value } = changedInputs[key];
        const row = tableData[rowIndex];
        if (colName !== "store_name" && colName !== "city") {
          await axios.put("/api/updateProductSales", {
            sales: value,
            store_name: row.store_name,
            productModel: colName,
            date: date,
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
  const addChanges = async()=>{
    try {
      dispatch(showLoader());
      for (const key in changedInputs) {
        const { rowIndex, colName, value } = changedInputs[key];
        const row = tableData[rowIndex];
          await axios.post("/api/createEntry", {
            date:date,
            country:country,
            partner:partner.name,
            territory_id:territory_id,
            sales:value,
            city:row.city,
            store_name:row.store_name,
            productModel:colName

          });

      }
      const existingStoreNames = new Set(tableData.map(row => row.store_name));
      console.log(existingStoreNames)
      for (const row of template) {
        if (!existingStoreNames.has(row.store_name)) {
          // Create default row with zero values
          const defaultRow = {};
          columns.forEach(colName => {
            defaultRow[colName] = colName === "store_name" || colName === "city" ? row[colName] : "0";
          });
  
          // Add row with zero values
          await axios.post("/api/createEntry", {
            date: date,
            country: country,
            partner: partner.name,
            territory_id: territory_id,
            city: row.city,
            store_name: row.store_name,
            ...defaultRow
          });
        }
      }
      setChangedInputs({});
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      dispatch(hideLoader());
    }
  }

  const createDefaultRow = () => {
    const defaultRow = {};
    console.log(columns);
    columns.forEach((colName) => {
      defaultRow[colName] =
        colName === "store_name" || colName === "city" ? "" : "0";
    });
    console.log(defaultRow);
    return defaultRow;
  };
  const handleAdd = (rowIndex, colName, value)=>{
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][colName] = value;
    setTableData(updatedTableData);

    const key = `${rowIndex}-${colName}`;
    setChangedInputs((prev) => ({
      ...prev,
      [key]: { rowIndex, colName, value },
    }));
  }
  const handleAddClick = ()=>{
    if(isAdd){
      addChanges()
    }
    setIsAdd(!isAdd);
  }

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
        {(country === "CA" ? CApartnersList : partnersList).map(
          (partnerName) => (
            <PartnerButton
              key={partnerName.name}
              selectedPartner={partner.name}
              propPartner={partnerName}
            />
          )
        )}
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
        {isAdd && (
          <button
            className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
            onClick={handleAddClick}
          >
            Add
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
          {tableData.length > 0 ? (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border border-gray-300`}>
                {columns.map((colName) => (
                  <td
                    key={`${rowIndex}-${colName}`}
                    className={`hover:bg-gray-100 ${
                      colName === "store_name" ? "will-change-scroll w-96" : ""
                    }`}
                  >
                    {row.hasOwnProperty(colName) ? (
            <input
              type="text"
              value={row[colName]}
              onChange={(e) =>
                handleInputChange(rowIndex, colName, e.target.value)
              }
              disabled={
                !isEdit ||
                colName === "store_name" ||
                colName === "city"
              }
              className="border border-gray-300 w-full px-4 py-1 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <input
              type="text"
              value={row[colName] || 0}
              onChange={(e) =>
                handleAdd(rowIndex,colName,e.target.value)
              }
              disabled={
                !isAdd ||
                colName === "store_name" ||
                colName === "city"
              }
              className="border border-gray-300 w-full px-4 py-1 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {allData.length > 0 && template ? (
                  <div>
                    {template.map((data, index) => {
                      const { store_name, city } = data;
                      // Create a new row based on the template
                      const newRow = { ...template, store_name, city };
                      // Set all other values in newRow to zero, except storeName and city
                      newRow[columns] = 0
                      console.log(newRow)
                      setTableData(prevTableData => [...prevTableData, newRow]);
                    })}
                  </div>
                ) : (
                  "No Partner for this store."
                )}
              </td>
            </tr>
          )}
          {/* {tableData ? tableData.map((row, rowIndex) => (
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
          )) : (
            <h1>No Data Found</h1>
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardForm;
