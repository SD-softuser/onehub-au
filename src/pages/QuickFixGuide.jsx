import { useState } from "react";
import Header from "../components/Header";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { PiDeviceMobileBold } from "react-icons/pi";
import { MdOutlineTablet } from "react-icons/md";
import { MdOutlineWatch } from "react-icons/md";
import PopularSearches from "../components/PopularSearches";
import { watchData } from "../assets/watch";
import { phoneData } from "../assets/phone";
import { tabletData } from "../assets/tablet";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const QuickFixGuide = () => {
  const [mode, setMode] = useState("phone");
   const location = useLocation();
  return (
    <>
      <header className="bg-white w-full py-4 fixed flex justify-center items-center gap-3 z-50 shadow-lg">
        <Link
          to={{
            pathname: "/",
            search: location.search,
          }}
          className="bg-white border-2 py-3 px-5 rounded-2xl absolute top-[50%] left-[5%] -translate-y-[50%]"
        >
          <FaChevronLeft />
        </Link>
        <img src="../public/Google Logo.png" alt="" className="h-10 w-10" />
        <h1 className="font-semibold text-2xl">Quick Fix Guide</h1>
      </header>
      <MaxWidthWrapper className="py-28 flex flex-col gap-4 md:gap-6 py-10">
        <Header />
        <div className="flex gap-2 sm:gap-5 p-1 md:p-2 rounded-full mx-0 ml-0">
          <button
            className={`transition py-1 sm:py-3 pl-2 sm:pl-4 pr-3 sm:pr-6 gap-1 sm:gap-2 h-auto rounded-full flex items-center ${
              mode === "phone"
                ? "bg-googleBlue-50 text-googleBlue-500"
                : "bg-gray-50 text-gray-600"
            }`}
            onClick={() => setMode("phone")}
          >
            <div
              className={`rounded-full w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center ${
                mode === "phone" ? "bg-googleBlue-100" : "bg-gray-50"
              }`}
            >
              <PiDeviceMobileBold className="w-3 h-3 sm:w-6 sm:h-6" />
            </div>
            <span>Phone</span>
          </button>
          <button
            className={`transition py-1 sm:py-3 pl-2 sm:pl-4 pr-3 sm:pr-6 gap-1 sm:gap-2 h-auto rounded-full flex items-center ${
              mode === "tablet"
                ? "bg-googleBlue-50 text-googleBlue-500"
                : "bg-gray-50 text-gray-600"
            }`}
            onClick={() => setMode("tablet")}
          >
            <div
              className={`rounded-full w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center ${
                mode === "tablet" ? "bg-googleBlue-100" : "bg-gray-50"
              }`}
            >
              <MdOutlineTablet className="w-3 h-3 sm:w-6 sm:h-6" />
            </div>
            <span>Tablet</span>
          </button>
          <button
            className={`transition py-1 sm:py-3 pl-2 sm:pl-4 pr-3 sm:pr-6 gap-1 sm:gap-2 h-auto rounded-full flex items-center ${
              mode === "watch"
                ? "bg-googleBlue-50 text-googleBlue-500"
                : "bg-gray-50 text-gray-600"
            }`}
            onClick={() => setMode("watch")}
          >
            <div
              className={`rounded-full w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center ${
                mode === "watch" ? "bg-googleBlue-100" : "bg-gray-50"
              }`}
            >
              <MdOutlineWatch className="w-3 h-3 sm:w-6 sm:h-6" />
            </div>
            <span>Watch</span>
          </button>
        </div>
        {mode === "phone" ? (
          <PopularSearches Data={phoneData} />
        ) : mode === "tablet" ? (
          <PopularSearches Data={tabletData} />
        ) : (
          <PopularSearches Data={watchData} />
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default QuickFixGuide;
