import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import axios from "axios";

const PartnerButton = ({ partnerName, selectedPartner, setPartner }) => {
  return (
    <button
      className={`px-4 py-2 border-[1px] rounded-xl ${
        selectedPartner === partnerName
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
  const [partner, setPartner] = useState("AT&T");
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState("2024-05-07");
  const [territoryId, setTerritoryId] = useState("Dallas, TX");

  console.log(value);
  const partners = ["AT&T", "Verizon", "T-Mobile", "Best Buy"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type":"application/json",
          "Accept":"/"
        }
        const params = {
          territory_id: territoryId,
          date: date,
          partner: partner,
        };
        console.log(params);
        // const response = await axios.get('/api/fetchProductSales', 
        //   {params}
        // );
        const response = await axios({
          method: 'GET',
          url: '/api/fetchProductSales',
          data: {
            territory_id: territoryId,
            date: date,
            partner: partner,
          },
          headers:headers
        });
        console.log(response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

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
          value={value}
          onChange={setValue}
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
