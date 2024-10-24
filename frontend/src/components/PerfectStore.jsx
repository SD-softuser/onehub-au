import React from "react";

const PerfectStore = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-x-6 p-4 bg-white">
        <div className="flex items-center justify-center gap-4">
          <img
            src="Google Logo.png"
            alt=""
            className="object-cover w-10 h-10"
          />
          <h1 className="text-2xl font-semibold">Perfect Store</h1>
        </div>

        <div className="flex space-x-4">
          {/* <!-- Retailer Dropdown --> */}
          <div>
            {/* <label class="block text-sm font-medium text-gray-700">Retailer</label> */}
            <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Telstra</option>
              <option>JB Hifi</option>
              <option>OPTUS</option>
            </select>
          </div>

          {/* <!-- Store Name Dropdown --> */}
          <div>
            {/* <label class="block text-sm font-medium text-gray-700">Store name</label> */}
            <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Business Tech Center</option>
              <option>Hunter Central</option>
              <option>WIFI Hotspot</option>
              <option>Center</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <img src="/Table.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default PerfectStore;
