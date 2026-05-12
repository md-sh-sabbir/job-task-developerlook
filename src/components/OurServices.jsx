import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import service from '../assets/service.jpg'

const leftServices = [
  { label: "Digital PR", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop" },
  { label: "Search & Growth Strategy", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop" },
  { label: "Data & Insights", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop" },
];

const rightServices = [
  { label: "Organic Social & Content", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop" },
  { label: "Content Experience", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop" },
  { label: "Onsite SEO", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop" },
];

const ServiceItem = ({ label, image }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="my-5 cursor-pointer relative overflow-hidden rounded-full transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          hovered
            ? {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            opacity: hovered ? 1 : 0,
          }}
        />
        <h2
          className="text-6xl font-semibold py-3 px-6 relative z-10 flex items-center gap-3 transition-colors duration-300"
          style={{ color: hovered ? "white" : "black" }}
        >
          {hovered && <GoArrowUpRight size={40} />}
          {label}
        </h2>
      </div>
      <hr className="text-gray-300" />
    </>
  );
};

const OurServices = () => {
  return (
    <div className="mx-[30px] my-10">
      <div className="flex justify-center items-center mb-10">
        <button className="hidden lg:flex px-5 py-2.5 bg-[#EFEEEC] text-black text-lg font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
          Explore Our Work
          <GoArrowUpRight size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center pb-5">
        <div>
          <h1 className="text-7xl font-semibold">
            Our{" "}
            <img
              src={service}
              alt=""
              className="w-20 rounded-2xl inline"
            />{" "}
            Services
          </h1>
        </div>
        <div>
          <button className="hidden lg:flex px-5 py-2.5 bg-[#EFEEEC] text-black text-lg font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
            View All Services
            <GoArrowUpRight size={18} />
          </button>
        </div>
      </div>
      <hr className="text-gray-300" />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6 ms-5">
          {leftServices.map((s) => (
            <ServiceItem key={s.label} label={s.label} image={s.image} />
          ))}
        </div>
        <div className="col-span-6 ms-5">
          {rightServices.map((s) => (
            <ServiceItem key={s.label} label={s.label} image={s.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;