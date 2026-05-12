import React from "react";
import platoon from "../assets/platoon.jpg";
import { GoArrowUpRight } from "react-icons/go";

const ContentSection = () => {
  return (
    <div className="mx-[30px] my-20">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h2 className="text-xl font-semibold">
            A global team of search-first content marketers <br /> engineering
            semantic relevancy & category <br /> signals for both the internet
            and people
          </h2>
        </div>
        <div className="inline-block">
          <h1 className="text-7xl font-semibold">Driving Demand &</h1>
          <h1 className="text-7xl font-semibold">
            Discovery{" "}
            <img src={platoon} alt="" className="w-20 rounded-2xl inline" />
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <button className="hidden lg:flex px-5 py-2.5 bg-[#EFEEEC] text-black text-sm font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
              Our Story
              <GoArrowUpRight size={18} />
            </button>
            <button className="hidden lg:flex px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
              Our Services
              <GoArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
