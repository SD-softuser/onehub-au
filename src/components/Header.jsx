import headerimg from "../assets/headerimg.png"
const Header = () => {
  return (
    <div className="flex w-full justify-between items-end">
      <div className="flex flex-col justify-end py-2 sm:py-4">
        <p className="text-xs sm:text-2xl lg:text-4xl font-medium">
          Browse the issues,
        </p>
        <p className="text-xs sm:text-2xl lg:text-4xl font-medium text-googleBlue-500">
          you are facing with the Pixel Device
        </p>
      </div>
      <div className="w-[40%]">
        <img src={headerimg} alt="" />
      </div>
    </div>
  );
};

export default Header;
