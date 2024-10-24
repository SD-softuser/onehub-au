import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaChevronDown, FaChevronRight, FaChevronUp, FaImage } from "react-icons/fa";
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
import { fetchData } from "../app/slices/dataSlice";
import SuspenseImage from "../components/SuspenseImage";
import { twMerge } from "tailwind-merge";
import { partnersData } from "../../public/assets/partnersData";
import PerfectStore from "../components/PerfectStore";

const HomePage = () => {
  const query = useQuery();
  const territory_id = query.get("territory_id");

  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();
  const country = useSelector((state) => state.country.country);
  const partners = useSelector((state) => state.partners.partners);
  const partnerDetails = useSelector((state) => state.partnerDetails.details);
  const selectedPartner = useSelector((state) => state.partnerDetails.selectedPartner);
  const { banners, status: bannerStatus } = useSelector((state) => state.banners);

  const countryStatus = useSelector((state) => state.country.status);
  const partnersStatus = useSelector((state) => state.partners.status);
  const partnerDetailsStatus = useSelector((state) => state.partnerDetails.status);


  useEffect(() => {
    if (territory_id) {
      dispatch(fetchCountry(territory_id));
      console.log(country);
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
  const[currentPartner,setCurrentPartner]=useState(partnersData[0])


  if (countryStatus === 'loading' || partnersStatus === 'loading' || partnerDetailsStatus === 'loading') {
    return (
      <MaxWidthWrapper className="flex flex-col gap-6">
        <SkeletonLoader />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-6 py-10">
      <main className="w-full flex flex-col gap-8 bg-white rounded-3xl px-6 pt-6 pb-10 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center justify-center">
            <img
              src="../assets/StorePromotionIcon.png"
              alt=""
              className="ml-2 h-12 w-12"
            />
            <p className="text-lg text-center sm:text-3xl  font-medium">
              Store Promotions
            </p>
          </div>
          {/* {banners && (
          <>
            <SwipeCarousel imgs={Object.values(banners)} />
          </>
        )} */}

          <div
            className={`grid grid-cols-3 justify-center gap-2 items-center px-2 py-1 sm:shadow-md sm:rounded-full`}
          >
            {partnersData &&
              partnersData.map((partner, index) => {
                console.log(currentPartner, partner);
                return (
                  <div
                    className={twMerge(
                      "h-auto w-full flex justify-center items-center cursor-pointer h-10 w-10 lg:h-20 lg:w-20"
                    )}
                    onClick={() => setCurrentPartner(partner)}
                    key={index}
                  >
                    <img
                      src={
                        currentPartner.name === partner.name
                          ? partner.checked
                          : partner.unchecked
                      }
                      className="object-contain"
                      alt={partner.name}
                    />

                    {/* <SuspenseImage
                    src={
                      selectedPartner === partner.name
                        ? partner.checked
                        : partner.unchecked
                    }
                    alt={partner.name}
                    suspenseClassName="w-full h-full bg-black/5 py-4 rounded-full"
                  /> */}
                  </div>
                );
              })}
          </div>
        </div>

        {currentPartner.banners &&
          (() => {
            const bannersArray = currentPartner.banners;
            const bannersLength = bannersArray.length;
            console.log("banners array: ", bannersArray);

            return banners && bannersLength !== 0 ? (
              <>
                <div
                  className={`relative grid grid-cols-2 mt-4 gap-4 ${
                    opened || (bannersLength && bannersLength <= 2)
                      ? "h-full"
                      : "h-60 overflow-hidden"
                  }`}
                >
                  {bannersArray.map((banner, index) => (
                    <img src={banner} key={index} alt={`Banner ${index}`} />
                  ))}

                  {!opened && bannersLength > 2 && (
                    <div className="absolute h-full w-full bg-gradient-to-t from-white to-transparent to-40%"></div>
                  )}
                </div>

                {bannersLength > 2 && (
                  <button
                    className="mx-auto bg bg-googleBlue-100 text-googleBlue-500 px-6 py-1.5 rounded-full font-medium flex justify-center items-center text-sm gap-2 my-2"
                    onClick={() => setOpened(!opened)}
                  >
                    <h2>{opened ? "Collapse" : "View All"}</h2>
                    {opened ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </>
            ) : (
              <h1 className="text-center text-xl sm:text-3xl lg:text-4xl font-medium">
                No Promotions Available!
              </h1>
            );
          })()}

        {/* <Link
          to={{
            pathname: "/leaderboard",
            search: location.search,
          }}
          className="bg-googleBlue-500 py-2 text-white rounded-full mt-4 px-4 flex justify-center items-center gap-2"
        >
          <HiOutlineArrowTopRightOnSquare />
          Leaderboard
        </Link> */}
      </main>
      <div className="w-full flex items-center flex-row gap-6">
        <Link
          to={{
            pathname: "/field-guide",
            search: location.search,
          }}
          state={{
            name: selectedPartner,
            icon: partnerDetails[selectedPartner]?.square,
          }}
          className="relative w-full h-32 sm:h-auto cursor-pointer bg-[#FBFBFB] rounded-2xl overflow-hidden shadow-md"
        >
          <img
            src="../public/assets/Discover Field Guide.png"
            alt=""
            className="rounded-2xl object-contain h-full w-full"
          />
        </Link>
        <Link
          to={{
            pathname: "/quick-fix-guide",
            search: location.search,
          }}
          state={{
            name: selectedPartner,
            icon: partnerDetails[selectedPartner]?.square,
          }}
          className="relative w-full h-32 sm:h-auto cursor-pointer bg-[#FBFBFB] rounded-2xl overflow-hidden shadow-md"
        >
          <img
            src="../public/assets/Quick Fix Guide.png"
            alt=""
            className="rounded-2xl object-contain h-full w-full"
          />
        </Link>
      </div>
      <main className="w-full flex flex-col gap-8 bg-white rounded-3xl px-6 pt-6 pb-10 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center justify-center">
            <img
              src="../public/assets/DemoInstallationGuide.png"
              alt=""
              className="ml-2 h-12 w-12"
            />
            <p className="text-lg text-center sm:text-3xl font-medium">
              Demo Installation Guide
            </p>
          </div>
          <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Phone</option>
            <option>Tablet</option>
          </select>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex-none w-[300px]">
            <img src="../public/assets/Pixel9.png" alt="" className="mb-2" />
            <div className="flex items-center justify-between text-googleBlue-500 bg-[#F0F5FF] h-12 rounded-lg">
              <a
                href="https://drive.google.com/file/d/18ccwUacFyHdnVGWg-ebn91yCLfuzRrv6/view"
                className="font-medium pl-4"
              >
                Pixel 9 Installation Guide
              </a>
              <FaChevronRight className="h-3 w-3 mr-4" />
            </div>
          </div>
          <div className="flex-none w-[300px]">
            <img src="../public/assets/Pixel9Pro.png" alt="" className="mb-2" />
            <div className="flex items-center justify-between text-googleBlue-500 bg-[#F0F5FF] h-12 rounded-lg">
              <a href="" className="font-medium pl-4">
                Pixel 9 Pro Installation Guide
              </a>
              <FaChevronRight className="h-3 w-3 mr-4" />
            </div>
          </div>
          <div className="flex-none w-[300px]">
            <img src="../public/assets/Pixel9ProXL.png" alt="" className="mb-2" />
            <div className="flex items-center justify-between text-googleBlue-500 bg-[#F0F5FF] h-12 rounded-lg">
              <a
                href="https://drive.google.com/file/d/18floB3wfu_L-x4m_xdzy-KLgop_pJnqu/view"
                className="font-medium pl-4"
              >
                Pixel 9 Pro XL Installation Guide
              </a>
              <FaChevronRight className="h-3 w-3 mr-4" />
            </div>
          </div>
          <div className="flex-none w-[300px]">
            <img src="../public/assets/Pixel9Pro.png" alt="" className="mb-2" />
            <div className="flex items-center justify-between text-googleBlue-500 bg-[#F0F5FF] h-12 rounded-lg">
              <a href="" className="font-medium pl-4">
                Pixel 9 Pro Installation Guide
              </a>
              <FaChevronRight className="h-3 w-3 mr-4" />
            </div>
          </div>
        </div>
      </main>
      <PerfectStore />
    </MaxWidthWrapper>
  );
};

export default HomePage;
