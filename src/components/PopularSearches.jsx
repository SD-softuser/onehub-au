import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PopularSearches = ({ Data }) => {
  const [clicked, setClicked] = useState(null);
  const [height, setHeight] = useState({}); // Store height for each section
  const contentRef = useRef([]); // Ref array to handle multiple items

  // Calculate and set height dynamically
  const calculateHeight = useCallback((i) => {
    if (contentRef.current[i]) {
      setHeight((prev) => ({
        ...prev,
        [i]: `${contentRef.current[i].scrollHeight}px`,
      }));
    }
  }, []);

  const toggle = (i) => {
    if (clicked === i) {
      setClicked(null); // Collapse
    } else {
      setClicked(i); // Expand
      calculateHeight(i); // Calculate height on toggle
    }
  };

  useEffect(() => {
    // Ensure height is recalculated when images load
    Data.forEach((_, i) => calculateHeight(i));
  }, [Data, calculateHeight]);

  return (
    <section className="flex flex-col">
      <div className="sm:text-xl font-bold sm:mb-4">Popular Searches</div>
      <div className="p-4 w-full overflow-auto">
        {Data.map((ques, i) => (
          <div
            key={i}
            className="flex flex-col mb-2 cursor-pointer transition-all duration-500 ease-out"
          >
            <div
              className="flex justify-between p-4 items-center"
              onClick={() => toggle(i)}
            >
              <div className="flex gap-5 items-center">
                <img src={ques.icon} alt="" className="h-8 w-8" />
                <div>{ques.question}</div>
              </div>
              <span className="flex items-center justify-center w-8 h-8">
                {clicked === i ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>

            {/* Answer Section with Animation */}
            <div
              ref={(el) => (contentRef.current[i] = el)} // Assign ref to each section
              style={{
                height: clicked === i ? height[i] : "0px",
                overflow: "hidden",
                transition: "height 0.5s ease-out",
              }}
              className="w-full"
            >
              <div className="block w-full h-[1px] bg-gray-400 mt-5 rounded-full"></div>
              <div className="flex flex-col gap-4 mt-2">
                {ques.answer.map((ans, j) => (
                  <img
                    key={j}
                    src={ans}
                    alt=""
                    onLoad={() => calculateHeight(i)} // Recalculate on image load
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSearches;
