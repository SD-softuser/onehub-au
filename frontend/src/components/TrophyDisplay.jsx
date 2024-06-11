import React from "react";

const TrophyDisplay = ({ data }) => {
  console.log(data);
  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
  };

  const trophyContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const trophyIconStyle = (rank) => ({
    width: rank === 1 ? "140px" : rank === 2 ? "120px" : "90px",
    height: "auto",
  });

  const detailsTitleStyle = {
    margin: "10px 0 5px",
    fontSize: "1.2em",
    color: "black",
    fontWeight: "900",
  };

  const detailsTextStyle = {
    margin: "0",
    fontSize: "1em",
    color: "black",
    fontWeight: "bold",
  };

  if(data.length!==0){
    return (
        <div style={containerStyle}>
          <div style={trophyContainerStyle}>
            <div>
              <h2 style={detailsTitleStyle}>{data[1].territory}</h2>
              <p style={detailsTextStyle}>Assisted Sales: {data[1].sales}</p>
            </div>
            <div>
              <img
                src={`assets/Index Vector.png`}
                alt="Rank 2"
                style={trophyIconStyle(2)}
              />
            </div>
          </div>
          <div style={trophyContainerStyle}>
            <div>
              <h2 style={detailsTitleStyle}>{data[0].territory}</h2>
              <p style={detailsTextStyle}>Assisted Sales: {data[0].sales}</p>
            </div>
            <div>
              <img
                src={`assets/Index Vector.png`}
                alt="Rank 1"
                style={trophyIconStyle(1)}
              />
            </div>
          </div>
          <div style={trophyContainerStyle}>
            <div>
              <h2 style={detailsTitleStyle}>{data[2].territory}</h2>
              <p style={detailsTextStyle}>Assisted Sales: {data[2].sales}</p>
            </div>
            <div>
              <img
                src={`assets/Index Vector.png`}
                alt="Rank 3"
                style={trophyIconStyle(3)}
              />
            </div>
          </div>
        </div>
      );
  }
};

export default TrophyDisplay;
