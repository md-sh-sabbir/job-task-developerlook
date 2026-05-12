// import React from "react";
// import { GoArrowUpRight } from "react-icons/go";
// import whatsNew from "../assets/whatsNew.jpg";

// const WhatsNew = () => {
//   return (
//     <div className="mx-30 my-10">

//       <div className="flex justify-between items-center pb-5">
//         <div>
//           <h1 className="text-7xl font-semibold">
//             What's{" "}
//             <img src={whatsNew} alt="" className="w-20 rounded-2xl inline" />{" "}
//             New
//           </h1>
//         </div>
//         <div>
//           <button className="hidden lg:flex px-5 py-2.5 bg-[#EFEEEC] text-black text-lg font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
//             Explore More Thoughts
//             <GoArrowUpRight size={18} />
//           </button>
//         </div>
//       </div>
//       <hr className="text-gray-300" />

//       <div>
//         <div>
//             <img src="" alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhatsNew;

import React, { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { LuClock3 } from "react-icons/lu";
import whatsNew from "../assets/whatsNew.jpg";

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    author: "Ray Saddiq",
    initials: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "3 mins",
    badge: null,
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    author: "Ray Saddiq",
    initials: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "2 mins",
    badge: "News",
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=800&q=80",
    author: "Carrie Rose",
    initials: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "2 mins",
    badge: "News",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
];

const BlogCard = ({ post }) => {
  const cursorRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  };

  return (
    <div className="group cursor-none rounded-2xl overflow-hidden bg-white">
      {/* Image Wrapper */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:blur-md group-hover:brightness-75"
        />

        {/* Badge */}
        {post.badge && (
          <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-medium px-3 py-1 rounded-md z-10">
            {post.badge}
          </span>
        )}

        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-20 w-14 h-14 bg-[#6EE7B7] rounded-full flex items-center justify-center
                     opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
                     transition-all duration-200 -translate-x-1/2 -translate-y-1/2"
        >
          <GoArrowUpRight size={22} className="text-black" />
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-4 pb-1">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">

            <button className="bg-[#EFEEEC] text-black font-bold rounded-3xl px-4 py-2 flex items-center gap-2">
                <img src={post.initials} className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[9px] font-medium text-gray-600" />
                {post.author}</button>
          </div>
          <div>
            <button className="bg-[#EFEEEC] text-black font-bold rounded-3xl px-4 py-2 flex items-center gap-2"><LuClock3 size={18} /> {post.readTime}</button>
          </div>
        </div>

        {/* Title */}
        <p className="text-[24px] font-semibold text-gray-900 leading-snug">
          {post.title}
        </p>
      </div>
    </div>
  );
};

const WhatsNew = () => {
  return (
    <div className="mx-30 my-10">
      {/* Header */}
      <div className="flex justify-between items-center pb-5">
        <div>
          <h1 className="text-7xl font-semibold">
            What's{" "}
            <img src={whatsNew} alt="" className="w-20 rounded-2xl inline" />{" "}
            New
          </h1>
        </div>
        <div>
          <button className="hidden lg:flex px-5 py-2.5 bg-[#EFEEEC] text-black text-lg font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
            Explore More Thoughts
            <GoArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <hr className="text-gray-300 mb-8" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;
