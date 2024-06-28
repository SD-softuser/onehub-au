import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import useQuery from "../utils/useQuery";
import { FiEdit3, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../app/slices/loaderSlice";
import { setSelectedPartner } from "../app/slices/partnerDetailsSlice";
import TableSkeleton from "./TableSkeleton";
import toast from "react-hot-toast";

const getCode = (selectedPartner) => {
  if(selectedPartner == "at&t")
    return "ATT%"
  else if (selectedPartner == "verizon")
    return "VZW%"
  else if (selectedPartner == "t-mobile")
    return "TMO%"
  else if (selectedPartner == "best buy")
    return "BBY%"
  else
    return "%"
}

const LeaderBoardForm = () => {
  const query = useQuery();
  const territory_id = query.get("territory_id");

  const country = useSelector((state) => state.country.country);
  const partners = useSelector((state) => state.partners.partners);
  const partnerDetails = useSelector((state) => state.partnerDetails.details);
  const selectedPartner = useSelector((state) => state.partnerDetails.selectedPartner);

  const convertDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [date, setDate] = useState(convertDate(Date.now()));
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [template, setTemplate] = useState([]);
  // console.log(template);
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
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
        const encodedPartner = encodeURIComponent(selectedPartner);
        const encodedCode = encodeURIComponent(getCode(selectedPartner))
        const response = await axios.get(
          `/api/fetchProductSales?territory_id=${encodedTerritory}&partner=${encodedPartner}&code=${encodedCode}`
        );
        console.log("Data is : ", response.data);
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
    if (territory_id && selectedPartner) {
      fetchData();
    }
  }, [territory_id, selectedPartner, date]);

  const filterDataByDate = (data, selectedDate) => {
    // console.log(selectedDate);
    const filteredData = data.filter(
      (item) => formatDate(item.date) === selectedDate
    );
    // console.log(filteredData);
    setTableData(filteredData);
    setOriginalTableData(filteredData);
    if (filteredData.length > 0) {
      setIsAdd(false)
      setColumns(getUniqueColumns(filteredData));
    } else {
      setIsAdd(true)
      // console.log("clicked");
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
      toast.success('Changes Saved Successfully!')
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      dispatch(hideLoader());
    }
  };
  const addChanges = async () => {
    try {
      dispatch(showLoader());

      const promises = [];

      tableData.forEach(tableRow => {
        for (const newKey in tableRow) {
          if (["Pixel 8a", "Pixel 8", "Pixel 8 Pro", "Pixel Watch"].includes(newKey)) {
            const obj = {
              date: date,
              country: country,
              partner: selectedPartner,
              territory_id: territory_id,
              sales: tableRow[newKey] || '0',
              city: tableRow.city,
              store_name: tableRow.store_name,
              productModel: newKey
            };
            console.log(obj);
            promises.push(axios.post("/api/createEntry", obj));
          }
        }
      });

      await Promise.all(promises);
      toast.success('Added Successfully!')
      console.log("All requests completed");
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      dispatch(hideLoader());
    }
  }

  const handleAdd = (rowIndex, colName, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][colName] = value;
    setTableData(updatedTableData);
  }
  const handleAddClick = () => {
    if (isAdd) {
      addChanges()
    }
    setIsAdd(!isAdd);
    setIsEdit(false);
  }
  
  const handlePartnerSelect = (partner) => {
    dispatch(setSelectedPartner(partner));
  };
 
  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="bg-white w-full px-4 py-4 rounded-xl shadow-md">
      {/* Partners */}
      <div className="flex gap-3">
        {partners.map((partner, index) => (
          <button
            className={`flex flex-row gap-3 justify-center items-center px-4 py-2 border-[1px] rounded-xl ${selectedPartner === partner
              ? "border-googleBlue-500 text-googleBlue-500"
              : ""
              }`}
            onClick={() => handlePartnerSelect(partner)}
            key={index}
          >
            {partnerDetails[partner] && (
              <img
                src={partnerDetails[partner].square}
                alt={selectedPartner}
                className="h-6 w-7"
              />
            )}
            <h6>{partner}</h6>
          </button>
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
        {!isEdit && (
          <button
            className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
            onClick={handleEditClick}
          >
            Edit <FiEdit3 />
          </button>
        )}
        {!isAdd && isEdit && (
          <button
            className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
            onClick={handleEditClick}
          >
            Save <FiEdit3 />
          </button>
        )}
        {isAdd && isEdit && (
          <button
            className="border-2 border-gray-200 p-3 rounded-xl flex-row flex justify-center items-center gap-2 hover:bg-gray-300"
            onClick={handleAddClick}
          >
            Add
          </button>
        )}
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
            {columns.filter(colName => colName !== "date" && colName !== "country").map((colName) => (
              <th
                key={colName}
                className={`px-4 py-2 border border-gray-300 text-left`}
              >
                {colName === "store_name" ? "Store Name" : colName === "city" ? "City" : colName}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border border-gray-300`}>
                {columns.filter(colName => colName !== "date" && colName !== "country").map((colName) => (
                  <td
                    key={`${rowIndex}-${colName}`}
                    className={`hover:bg-gray-100 ${colName === "store_name" ? "will-change-scroll w-96" : colName === "city" ? "w-40" : ""}`}
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
                          handleAdd(rowIndex, colName, e.target.value)
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
              {allData.length > 0 && template ? (
                <div>
                  {Array.from(new Set(template.map(data => data.store_name))).map((uniqueStoreName, index) => {
                    const data = template.find(item => item.store_name === uniqueStoreName);
                    if (data) {
                      const { store_name, city } = data;
                      // Create a new row based on the template
                      const newRow = { ...data, store_name, city };
                      // Set all other values in newRow to zero, except store_name and city
                      columns.forEach(col => {
                        if (col !== 'store_name' && col !== 'city') {
                          newRow[col] = 0;
                        }
                      });
                      // console.log(newRow);
                      setTableData(prevTableData => [...prevTableData, newRow]);
                    }
                  })}
                </div>
              ) : (
                <div className="text-red-500 mt-5">No Partner for this store.</div>

              )}
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardForm;
