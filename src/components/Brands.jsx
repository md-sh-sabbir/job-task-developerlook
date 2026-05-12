import React from "react";
import emirates from "../assets/Emirates.jpg";
import krogar from "../assets/Krogar.jpg";
import redBull from "../assets/red-bull-logo-black.jpg";
import sn from "../assets/SN.jpg";

const Brands = () => {
  const brands = [
    emirates,
    krogar,
    redBull,
    sn,
    emirates,
    krogar,
    redBull,
    sn,
  ];

  return (
    <div className="max-w-[1440px] mx-auto my-16 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="mx-16 flex items-center justify-center"
          >
            <img
              src={brand}
              alt=""
              className="w-28 object-contain"
            />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Brands;