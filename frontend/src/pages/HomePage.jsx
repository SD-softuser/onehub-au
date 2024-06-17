import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useQuery from "../utils/useQuery";
import LeaderBoardForm from "../components/LeaderBoardForm";
import axios from "axios";
import { partnersList, CApartnersList } from "../constants";
import { setCurrentPartnerState } from "../app/slices/currentPartnerSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const [opened, setOpened] = useState(false);
  const [country, setCountry] = useState("CA");

  const query = useQuery();
  const territory_id = query.get("territory_id");
  
  const dispatch = useDispatch();
  const currentPartnerUS = useSelector((state) => state.partner.currentPartner);
  const currentPartnerCA = useSelector((state) => state.partnerCA.currentPartner);
  const currentPartner = useSelector((state) => state.currentPartner);

  console.log(currentPartner)
  
  const partnerState = (partner) => {
    if (country === "US") {
      dispatch(setCurrentPartnerState(partner))
    } else {
      dispatch(setCurrentPartnerState(partner))
    }
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await axios.get('/api/testing')
  //     const data = response.data
  //     console.log(data)
  //   }
  //   fetch()
  // })

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

  return (
    <MaxWidthWrapper className="flex flex-col gap-6">
      {/* <header className="w-full flex justify-center items-center py-2.5 gap-2">
        <img src="/Google Logo.png" alt="Google" className="h-10 w-10" />
        <h1 className="font-bold text-3xl">Store Hub</h1>
      </header> */}

      <main className="w-full bg-white rounded-lg px-6 py-10 shadow-md mt-8">
        <div className="flex justify-center items-center gap-4 px-4 py-3 rounded-full shadow-md">
          {country === "CA"
            ? CApartnersList.map((partner, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => partnerState(partner)}
                  key={index}
                >
                  {currentPartner.name === partner.name ? (
                    <img src={partner.imageChecked} alt={partner.name} />
                  ) : (
                    <img src={partner.image} alt={partner.name} />
                  )}
                </div>
              ))
            : partnersList.map((partner, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => partnerState(partner)}
                  key={index}
                >
                  {currentPartner.name === partner.name ? (
                    <img src={partner.imageChecked} alt={partner.name} />
                  ) : (
                    <img src={partner.image} alt={partner.name} />
                  )}
                </div>
              ))}
        </div>

        <div
          className={`relative grid grid-cols-2 mt-4 gap-4 ${
            opened || currentPartner.banners.length <= 2 ? "h-full" : "h-60 overflow-hidden"
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
          className="mx-auto bg bg-googleBlue-100 text-googleBlue-500 px-6 py-1.5 rounded-full font-medium flex justify-center items-center text-sm gap-2 my-2"
          onClick={() => setOpened(!opened)}
        >
          <h2>{opened ? "Collapse" : "View All"}</h2>
          {opened ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div className="w-full bg-[#F5F5F5] flex justify-between px-3 py-2 rounded-xl mt-4">
          <div className="flex gap-2">
            <img
              src={currentPartner.icon}
              alt={currentPartner.name}
              className="h-12 w-12"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-medium">{currentPartner.name}</h1>
              <h6 className="text-xs text-gray-500 -mt-1">Field Sales</h6>
            </div>
          </div>
          <Link
            to={{
              pathname: "/field-guide",
              search: location.search  
            }}
            state= {{
              name: currentPartner.name,
              icon: currentPartner.icon
            }}
            className="bg-[#EBEBEB] text-[#333333] rounded-full px-4 flex justify-center items-center gap-2"
          >
            <HiOutlineArrowTopRightOnSquare />
            Check Field Guide
          </Link>
        </div>

        <Link
          to={{
            pathname: "/leaderboard",
            search: location.search
          }}
          className="bg-googleBlue-500 py-2 text-white rounded-full mt-4 px-4 flex justify-center items-center gap-2"
        >
          <HiOutlineArrowTopRightOnSquare />
          Leaderboard
        </Link>
      </main>

      <LeaderBoardForm />
    </MaxWidthWrapper>
  );
};

export default HomePage;
