import React from "react";
import SvgComponent from "./SvgComponent";



const TrophyDisplay = ({ data }) => {
  console.log(data);
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Center the items
    alignItems: "center",
    padding: "10px", // Reduce the padding
    gap: "20px", // Add gap between the items
  };

  const trophyContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const trophyIconStyle = (rank) => ({
    width: rank === 1 ? "200px" : rank === 2 ? "140px" : "90px",
    height: "auto",
  });

  const detailsTitleStyle = {
    margin: "5px 0", // Reduce the margin
    fontSize: "1.2em",
    color: "black",
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  };

  const detailsTextStyle = {
    margin: "5px 0", // Reduce the margin
    fontSize: "1em",
    color: "black",
    fontWeight: "bold",
  };

  if (data.length !== 0) {
    return (
      <div style={containerStyle}>
        <div style={trophyContainerStyle}>
          <div>
            <h2 style={detailsTitleStyle}>{data[1].territory}</h2>
            <div className="flex flex-row justify-center items-center gap-3 px-2 border-2 border-gray-200 rounded-2xl mb-2">
              <SvgComponent />
              <p style={detailsTextStyle}>
                {data[1].sales}
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-24 h-24">
            <img
              src={`assets/trophy.png`}
              alt="Rank 2"
              className="w-full h-full"
            />
            <p className="absolute top-6 text-white text-2xl font-bold">2</p>
          </div>
        </div>
        <div style={trophyContainerStyle}>
          <div>
            <h2 style={detailsTitleStyle}>{data[0].territory}</h2>
            <div className="flex flex-row justify-center items-center gap-3 px-2 border-2 border-gray-200 rounded-2xl mb-2">
              <SvgComponent />
              <p style={detailsTextStyle}>{data[0].sales}</p>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-48 h-48">
            <img
              src={`assets/trophy.png`}
              alt="Rank 1"
              style={trophyIconStyle(1)}
            />
            <p className="absolute top-14 text-white text-5xl font-bold -translate-x-1">1</p>
          </div>
        </div>
        <div style={trophyContainerStyle}>
          <div>
            <h2 style={detailsTitleStyle}>{data[2].territory}</h2>
            <div className="flex flex-row justify-center items-center gap-3 px-2 border-2 border-gray-200 rounded-2xl mb-2">
              <SvgComponent />
              <p style={detailsTextStyle}>{data[2].sales}</p>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-20 h-20">
            <img
              src={`assets/trophy.png`}
              alt="Rank 3"
              style={trophyIconStyle(3)}
            />
            <p className="absolute top-5 text-white text-xl font-bold">3</p>
          </div>
        </div>
      </div>
    );
  }
};

export default TrophyDisplay;
