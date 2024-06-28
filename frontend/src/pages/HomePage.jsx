import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useQuery from "../utils/useQuery";
import LeaderBoardForm from "../components/LeaderBoardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from "../app/slices/countrySlice";
import { fetchPartners } from "../app/slices/partnersSlice";
import { fetchPartnerDetails, setSelectedPartner } from "../app/slices/partnerDetailsSlice";
import { fetchBanners } from "../app/slices/bannersSlice";
import SkeletonLoader from "../components/SkeletonLoader";

const HomePage = () => {
  const [opened, setOpened] = useState(false);
  const query = useQuery();
  const territory_id = query.get("territory_id");

  const dispatch = useDispatch();
  const country = useSelector((state) => state.country.country);
  const partners = useSelector((state) => state.partners.partners);
  const partnerDetails = useSelector((state) => state.partnerDetails.details);
  const selectedPartner = useSelector((state) => state.partnerDetails.selectedPartner);
  const banners = useSelector((state) => state.banners.banners);

  const countryStatus = useSelector((state) => state.country.status);
  const partnersStatus = useSelector((state) => state.partners.status);
  const partnerDetailsStatus = useSelector((state) => state.partnerDetails.status);
  const bannersStatus = useSelector((state) => state.banners.status);

  useEffect(() => {
    if (territory_id) {
      dispatch(fetchCountry(territory_id));
    }
  }, [territory_id, dispatch]);

  useEffect(() => {
    if (country) {
      dispatch(fetchPartners(country));
    }
  }, [country, dispatch]);

  useEffect(() => {
    if (country && partners.length > 0) {
      partners.forEach(partner => {
        dispatch(fetchPartnerDetails({ country, partner }));
      });
    }
    if (partners.length > 0) {
      dispatch(setSelectedPartner(partners[0]));
    }
  }, [country, partners, dispatch]);

  useEffect(() => {
    if (selectedPartner) {
      dispatch(fetchBanners({ country, partner: selectedPartner }));
    }
  }, [selectedPartner, country, dispatch]);

  const handlePartnerSelect = (partner) => {
    dispatch(setSelectedPartner(partner));
  };

  if (countryStatus === 'loading' || partnersStatus === 'loading' || partnerDetailsStatus === 'loading') {
    return (
      <MaxWidthWrapper className="flex flex-col gap-6">
        <SkeletonLoader />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-6 py-10">
      <main className="w-full bg-white rounded-lg px-6 py-10 shadow-md">
        <div className="flex justify-center items-center gap-4 px-4 py-3 rounded-full shadow-md">
          {partners && partnerDetails && partners.map((partner, index) => (
            <div
              className="cursor-pointer"
              onClick={() => handlePartnerSelect(partner)}
              key={index}
            >
              {partnerDetails[partner] && (
                <img src={selectedPartner === partner ? partnerDetails[partner].checked : partnerDetails[partner].unchecked} alt={partner} />
              )}
            </div>
          ))}
        </div>

        {bannersStatus === 'loading' ? (
          <div className="animate-pulse relative grid grid-cols-2 mt-4 gap-4 h-full w-full overflow-hidden">
            <div className="w-full h-52 bg-gradient-to-b from-gray-200 to-transparent rounded-md"></div>
            <div className="w-full h-52 bg-gradient-to-b from-gray-200 to-transparent rounded-md"></div>
            <button
              className="mx-auto bg-googleBlue-100 text-googleBlue-500 px-6 py-1.5 rounded-full font-medium flex justify-center items-center text-sm gap-2 my-2 col-span-2"
            >
              <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
            </button>
          </div>
        ) : (
          <>
            <div className={`relative grid grid-cols-2 mt-4 gap-4 ${opened || (banners && banners.length <= 2) ? "h-full" : "h-60 overflow-hidden"}`}>
              {banners && banners.map((banner, index) => (
                <img src={banner} key={index} alt={`Banner ${index}`} />
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
          </>
        )}

        {partnerDetails && selectedPartner && (
          <div className="w-full bg-[#F5F5F5] flex justify-between px-3 py-2 rounded-xl mt-4">
            <div className="flex gap-2">
              <img
                src={partnerDetails[selectedPartner]?.square}
                alt={selectedPartner}
                className="h-12 w-12"
              />
              <div className="flex flex-col justify-center">
                <h1 className="font-medium">{selectedPartner}</h1>
                <h6 className="text-xs text-gray-500 -mt-1">Field Sales</h6>
              </div>
            </div>
            <Link
              to={{
                pathname: "/field-guide",
                search: location.search
              }}
              state={{
                name: selectedPartner,
                icon: partnerDetails[selectedPartner]?.square
              }}
              className="bg-[#EBEBEB] text-[#333333] rounded-full px-4 flex justify-center items-center gap-2"
            >
              <HiOutlineArrowTopRightOnSquare />
              Check Field Guide
            </Link>
          </div>
        )}

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
