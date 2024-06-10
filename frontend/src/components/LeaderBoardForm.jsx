import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import useQuery from "../utils/useQuery";
import formatDate from "../utils/formatDate";


const partners = ["AT&T", "Verizon", "T-Mobile", "Best Buy"];

const PartnerButton = ({ partnerName, selectedPartner, setPartner }) => {
  return (
    <button
      className={`px-4 py-2 border-[1px] rounded-xl ${selectedPartner === partnerName
        ? "border-googleBlue-500 text-googleBlue-500"
        : ""
        }`}
      onClick={() => setPartner(partnerName)}
    >
      <div></div>
      <h6>{partnerName}</h6>
    </button>
  );
};

const LeaderBoardForm = () => {
  const query = useQuery()

  const [partner, setPartner] = useState("Verizon");
  const [date, setDate] = useState("2024-05-07");


  const handleDateChange = (e) => {
    console.log(e);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`/api/fetchProductSales?territory_id=${query.get("territory_id")}&date=${date}&partner=${partner}`)

        console.log(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [query.get("territory_id"), date, partner]);

  return (
    <div className="bg-white w-full px-4 py-4 rounded-xl shadow-md">
      {/* Partners */}
      <div className="flex gap-3">
        {partners.map((partnerName) => (
          <PartnerButton
            key={partnerName}
            partnerName={partnerName}
            selectedPartner={partner}
            setPartner={setPartner}
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
    </div>
  );
};

export default LeaderBoardForm;
