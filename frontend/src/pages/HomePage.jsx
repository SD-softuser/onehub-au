import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useQuery from "../utils/useQuery";
import LeaderBoardForm from "../components/LeaderBoardForm";
import axios from "axios";
import { partnersList } from "../../constants";
import { setCurrentPartner } from "../app/slices/partnerSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const [opened, setOpened] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();
  const currentPartner = useSelector((state) => state.partner.currentPartner);
  const partnerState = (partner) => {
    dispatch(setCurrentPartner(partner));
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await axios.get('/api/testing')
  //     const data = response.data
  //     console.log(data)
  //   }
  //   fetch()
  // })

  return (
    <MaxWidthWrapper className="flex flex-col gap-6">
      <header className="w-full flex justify-center items-center py-2.5 gap-2">
        <img src="/Google Logo.png" alt="Google" className="h-10 w-10" />
        <h1 className="font-bold text-3xl">Store Hub</h1>
      </header>

      <main className="w-full bg-white rounded-lg px-6 py-10 shadow-md">
        <div className="flex justify-center items-center gap-4 px-4 py-1 rounded-full shadow-md">
          {/* <div>
            <img
              src='assets/Best Buy Button.png'
            />
          </div>
          <div>
            <img
              src='assets/Bell Button.png'
            />
          </div>
          <div>
            <img
              src='assets/Telus Button.png'
            />
          </div>
          <div>
            <img
              src='assets/Unnamed Button.png'
            />
          </div> */}
          {partnersList.map((partner, index) => (
            <div
              className="cursor-pointer"
              onClick={() => partnerState(partner)}
            >
              {currentPartner.name === partner.name ? (
                <img src={partner.imageChecked} />
              ) : (
                <img src={partner.image} />
              )}
            </div>
          ))}
        </div>

        <div
          className={`relative grid grid-cols-2 mt-4 gap-4 ${
            opened ? "h-full" : "h-60 overflow-hidden"
          }`}
        >
          {currentPartner.banners.map((banner, index) => (
            <img src={banner} key={index} />
          ))}
          {!opened && (
            <div className="absolute h-full w-full bg-gradient-to-t from-white to-transparent to-40%"></div>
          )}
        </div>

        <button
          className="mx-auto bg bg-googleBlue-100 text-googleBlue-500 px-6 py-1.5 rounded-full font-medium flex justify-center items-center text-sm gap-2"
          onClick={() => setOpened(!opened)}
        >
          <h2>View All</h2>
          <FaChevronDown />
        </button>

        <div className="w-full bg-[#F5F5F5] flex justify-between px-3 py-2 rounded-xl mt-4">
          <div className="flex gap-2">
            <img
              src="assets/Besy Buy Square.png"
              alt="Best Buy"
              className="h-12 w-12"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-medium">Best Buy</h1>
              <h6 className="text-xs text-gray-500 -mt-1">Field Sales</h6>
            </div>
          </div>
          <Link
            to={"/field-guide"}
            className="bg-[#EBEBEB] text-[#333333] rounded-full px-4 flex justify-center items-center gap-2"
          >
            <HiOutlineArrowTopRightOnSquare />
            Check Field Guide
          </Link>
        </div>

        <Link
          to={"/leaderboard"}
          className="bg-[#EBEBEB] text-[#333333] rounded-full mt-4 px-4 flex justify-center items-center gap-2"
        >
          <HiOutlineArrowTopRightOnSquare />
          Assisted LeaderBoard
        </Link>
      </main>

      <LeaderBoardForm />
    </MaxWidthWrapper>
  );
};

export default HomePage;
