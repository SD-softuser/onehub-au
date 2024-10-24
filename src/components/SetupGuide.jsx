import React from "react";

const SetupGuide = () => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-6 text-[#474747]">
      <div className="flex justify-between space-x-4">
        <a
          href="https://drive.google.com/file/d/18gvF1cBmF_lWzOo2LuhiplVWbH5yJUzD/view"
          className=" p-3 rounded-lg text-center flex-1"
        >
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-4">
              <img src="Link1.png" alt="" className="w-10 h-10 object-cover" />
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-semibold ">Setup Guides</h3>
                <p>Veiw all the guides and manuals</p>
              </div>
            </div>
            <img src="/Link.png" className="w-10 h-10 object-cover" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SetupGuide;
