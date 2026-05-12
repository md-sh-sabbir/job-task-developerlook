import React from "react";

const Consumers = () => {
  const items = [
    { type: "text", content: "Chasing Consumers" },
    { type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&auto=format&fit=crop" },
    { type: "text", content: "Not Algorithms" },
    { type: "image", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&auto=format&fit=crop" },
    // Duplicated for seamless loop
    { type: "text", content: "Chasing Consumers" },
    { type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&auto=format&fit=crop" },
    { type: "text", content: "Not Algorithms" },
    { type: "image", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&auto=format&fit=crop" },
  ];

  return (
    <div className="my-24 overflow-hidden">
      <div className="flex w-max animate-marquee items-center">
        {items.map((item, index) =>
          item.type === "text" ? (
            <span
              key={index}
              className="mx-10 text-[110px] font-semibold text-black whitespace-nowrap"
            >
              {item.content}
            </span>
          ) : (
            <img
              key={index}
              src={item.src}
              alt=""
              className="mx-6 w-44 h-44 rounded-2xl object-cover"
            />
          )
        )}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Consumers;