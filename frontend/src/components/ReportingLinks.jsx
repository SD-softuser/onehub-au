import React from "react";
import { reportingLinks } from "../constants";

const Links = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-[#474747]">
      <div className="flex gap-4">
        <img src="Link1.png" alt="" className="w-10 h-10 object-cover" />
        <h3 className="text-xl font-semibold mb-6 mt-1">Reporting Links</h3>
      </div>
      <div className="flex justify-between space-x-4 ">
        {reportingLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="bg-blue-100 p-3 rounded-lg text-center flex-1"
          >
            <div className="flex justify-between">
              <div className="flex flex-col items-start ml-1">
                <p className="text-2xl md:text-xl">{link.name}</p>
                <p>{link.content}</p>
              </div>
              <img src="/Link.png" className="w-10 h-10 object-cover" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Links;
