import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const topText = useRef(null);
  const bottomText = useRef(null);

  useGSAP(() => {
    // Initial state
    gsap.set(bottomText.current, {
      y: "100%",
      opacity: 0,
    });
  }, []);

  const handleHover = () => {
    // Current text goes up
    gsap.to(topText.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // New text comes from bottom
    gsap.to(bottomText.current, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    // Reset animation
    gsap.to(topText.current, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(bottomText.current, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div className="my-3 mx-3">
      <div className="bg-[#B2F6E3] py-2 mx-auto rounded-3xl overflow-hidden">
        <div
          className="relative h-6 flex items-center justify-center cursor-pointer overflow-hidden"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          {/* Visible Text */}
          <h2 ref={topText} className="absolute text-md font-semibold">
            🚨 The Category Leaderboard - Live Now
          </h2>

          {/* Sliding Text */}
          <h2 ref={bottomText} className="absolute text-md font-semibold">
            🚨 The Category Leaderboard - Live Now
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
