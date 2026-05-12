// FeaturedWork.jsx
// deps: npm install gsap lenis
// Matches the riseatseven.com "Featured Work" pinned scroll section

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";

// gsap.registerPlugin(ScrollTrigger);

// ─── YOUR PROJECTS DATA ───────────────────────────────────────────────────────
// Replace `img` with your actual image imports or URLs
// const PROJECTS = [
//   {
//     name: "SIXT",
//     years: "[2023-2025]",
//     img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
//     tags: ["SEO", "Content"],
//   },
//   {
//     name: "Dojo — B2B",
//     years: "[2021-2025]",
//     img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
//     tags: ["PR", "Social"],
//   },
//   {
//     name: "Magnet Trade — B2B",
//     years: "[2023-2024]",
//     img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
//     tags: ["SEO", "LLM"],
//   },
//   {
//     name: "Leading E Sim brand globally",
//     years: "[2023-2025]",
//     img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
//     tags: ["Content", "PR"],
//   },
//   {
//     name: "JD Sports",
//     years: "[2025]",
//     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
//     tags: ["SEO", "Social"],
//   },
// ];

// export default function FeaturedWork() {
//   const sectionRef   = useRef(null);   // outer wrapper (defines scroll length)
//   const stickyRef    = useRef(null);   // the sticky container that pins
//   const namesRef     = useRef([]);     // each project name row
//   const imagesRef    = useRef([]);     // each project image
//   const progressRef  = useRef(null);   // thin progress line on right

//   useEffect(() => {
//     // ── 1. Lenis smooth scroll ──────────────────────────────────────────────
//     const lenis = new Lenis({ lerp: 0.08 });
//     lenis.on("scroll", ScrollTrigger.update);
//     gsap.ticker.add((t) => lenis.raf(t * 1000));
//     gsap.ticker.lagSmoothing(0);

//     // ── 2. Set initial states ───────────────────────────────────────────────
//     namesRef.current.forEach((el, i) => {
//       if (!el) return;
//       // first item starts bright, rest start dimmed
//       gsap.set(el, {
//         opacity: i === 0 ? 1 : 0.18,
//         y: 0,
//       });
//     });

//     imagesRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, {
//         opacity: i === 0 ? 1 : 0,
//         scale: i === 0 ? 1 : 1.04,
//       });
//     });

//     // ── 3. Master ScrollTrigger timeline ───────────────────────────────────
//     // Each project gets an equal chunk of the total scroll distance
//     const SCROLL_PER_PROJECT = 600; // px of scroll per project step
//     const totalScroll = SCROLL_PER_PROJECT * (PROJECTS.length - 1);

//     const masterTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: `+=${totalScroll}`,
//         pin: stickyRef.current,   // pin the inner sticky div (not the whole section)
//         scrub: 1.2,               // smooth lag
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           // update the thin progress bar
//           if (progressRef.current) {
//             progressRef.current.style.height = `${self.progress * 100}%`;
//           }
//         },
//       },
//     });

//     // For each transition between projects, add a tween to the master timeline
//     PROJECTS.forEach((_, i) => {
//       if (i === 0) return; // first is already shown

//       const prev = namesRef.current[i - 1];
//       const curr = namesRef.current[i];
//       const prevImg = imagesRef.current[i - 1];
//       const currImg = imagesRef.current[i];
//       if (!prev || !curr || !prevImg || !currImg) return;

//       // at 1/n through the timeline, swap from project i-1 → i
//       masterTl
//         // dim + lift previous name
//         .to(prev, { opacity: 0.18, duration: 0.4 }, i - 1)
//         // brighten current name
//         .to(curr, { opacity: 1, duration: 0.4 }, i - 1)
//         // fade out previous image
//         .to(prevImg, { opacity: 0, scale: 0.97, duration: 0.5 }, i - 1)
//         // fade in current image
//         .to(currImg, { opacity: 1, scale: 1, duration: 0.5 }, i - 1);
//     });

//     return () => {
//       lenis.destroy();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       gsap.ticker.remove((t) => lenis.raf(t * 1000));
//     };
//   }, []);

//   return (
//     // ── OUTER WRAPPER — tall enough for the full scroll distance ─────────────
//     <div
//       ref={sectionRef}
//       style={{
//         // height = viewport + scroll distance for each project transition
//         height: `calc(100vh + ${600 * (PROJECTS.length - 1)}px)`,
//         background: "#0a0a0a",
//       }}
//     >
//       {/* ── STICKY CONTAINER — this is what pins ────────────────────────────── */}
//       <div
//         ref={stickyRef}
//         style={{
//           display: "grid",
//           gridTemplateColumns: "55% 45%",
//           height: "100vh",
//           width: "100%",
//           background: "#0a0a0a",
//           borderRadius: "16px",
//           overflow: "hidden",
//         }}
//       >
//         {/* ══ LEFT — project names ═══════════════════════════════════════════ */}
//         <div
//           style={{
//             position: "relative",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "60px 48px",
//             overflow: "hidden",
//           }}
//         >
//           {/* "Featured Work" label */}
//           <p
//             style={{
//               position: "absolute",
//               top: "40px",
//               left: "48px",
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#fff",
//               letterSpacing: "0.04em",
//               textTransform: "uppercase",
//             }}
//           >
//             Featured Work
//           </p>

//           {/* Project name list */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
//             {PROJECTS.map((p, i) => (
//               <div
//                 key={i}
//                 ref={(el) => (namesRef.current[i] = el)}
//                 style={{
//                   display: "flex",
//                   alignItems: "baseline",
//                   gap: "14px",
//                   cursor: "default",
//                   lineHeight: 1.05,
//                 }}
//               >
//                 {/* Giant project name */}
//                 <span
//                   style={{
//                     fontSize: "clamp(36px, 5.5vw, 72px)",
//                     fontWeight: 800,
//                     color: "#fff",
//                     letterSpacing: "-0.03em",
//                     fontFamily: "var(--font-sans, system-ui, sans-serif)",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {p.name}
//                 </span>

//                 {/* Year badge */}
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     color: "rgba(255,255,255,0.35)",
//                     letterSpacing: "0.04em",
//                     whiteSpace: "nowrap",
//                     flexShrink: 0,
//                   }}
//                 >
//                   {p.years}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Thin progress bar on left edge */}
//           <div
//             style={{
//               position: "absolute",
//               left: 0,
//               top: 0,
//               width: "2px",
//               height: "100%",
//               background: "rgba(255,255,255,0.06)",
//             }}
//           >
//             <div
//               ref={progressRef}
//               style={{
//                 width: "100%",
//                 height: "0%",
//                 background: "#7fffd4",
//                 transition: "height 0.1s linear",
//               }}
//             />
//           </div>
//         </div>

//         {/* ══ RIGHT — project images ══════════════════════════════════════════ */}
//         <div
//           style={{
//             position: "relative",
//             background: "#111",
//             display: "grid",
//             gridTemplateRows: "1fr 1fr",
//             gap: "8px",
//             padding: "8px",
//           }}
//         >
//           {PROJECTS.map((p, i) => (
//             <div
//               key={i}
//               ref={(el) => (imagesRef.current[i] = el)}
//               style={{
//                 position: "absolute",
//                 inset: "8px",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 willChange: "opacity, transform",
//               }}
//             >
//               <img
//                 src={p.img}
//                 alt={p.name}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />

//               {/* Tag pills */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "16px",
//                   left: "16px",
//                   display: "flex",
//                   gap: "6px",
//                 }}
//               >
//                 {p.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     style={{
//                       padding: "4px 10px",
//                       borderRadius: "100px",
//                       background: "rgba(0,0,0,0.5)",
//                       backdropFilter: "blur(8px)",
//                       fontSize: "11px",
//                       fontWeight: 500,
//                       color: "#fff",
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




// FeaturedWork.jsx
// deps: npm install gsap lenis

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";

// gsap.registerPlugin(ScrollTrigger);

// // ─── PROJECT DATA ─────────────────────────────────────────────────────────────
// const PROJECTS = [
//   {
//     name: "SIXT",
//     years: "[2023-2025]",
//     img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&q=80",
//     desc: "A category-leading SEO strategy for the world's largest car rental brand.",
//     tag: "Car rental",
//     cardBg: "#f0ebe3",   // warm beige
//   },
//   {
//     name: "Dojo — B2B",
//     years: "[2021-2025]",
//     img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
//     desc: "A B2B success story for Dojo card machines, dominating business search.",
//     tag: "Fintech",
//     cardBg: "#fde8dc",   // salmon/peach — matches screenshot
//   },
//   {
//     name: "Magnet Trade — B2B",
//     years: "[2023-2024]",
//     img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
//     desc: "Driving trade professional search visibility for Magnet Kitchen's B2B arm.",
//     tag: "Home & Trade",
//     cardBg: "#e8f4e8",   // soft green
//   },
//   {
//     name: "Leading E-Sim brand globally",
//     years: "[2023-2025]",
//     img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
//     desc: "Becoming the #1 searched eSIM brand across every major platform worldwide.",
//     tag: "Telecom",
//     cardBg: "#e8eaf6",   // soft lavender
//   },
//   {
//     name: "JD Sports",
//     years: "[2025]",
//     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
//     desc: "Content & social strategy making JD Sports the go-to for sneaker culture.",
//     tag: "Retail",
//     cardBg: "#fff9e6",   // warm yellow
//   },
// ];

// // ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
// function MagicCursor() {
//   const cursorRef  = useRef(null);
//   const followerRef = useRef(null);
//   const pos = useRef({ x: 0, y: 0 });
//   const fPos = useRef({ x: 0, y: 0 });
//   const raf  = useRef(null);

//   useEffect(() => {
//     const cursor   = cursorRef.current;
//     const follower = followerRef.current;

//     const onMove = (e) => {
//       pos.current = { x: e.clientX, y: e.clientY };
//       // snap cursor dot instantly
//       gsap.set(cursor, { x: e.clientX - 4, y: e.clientY - 4 });
//     };

//     // smoothly lerp the follower ring
//     const tick = () => {
//       fPos.current.x += (pos.current.x - fPos.current.x) * 0.1;
//       fPos.current.y += (pos.current.y - fPos.current.y) * 0.1;
//       gsap.set(follower, {
//         x: fPos.current.x - 20,
//         y: fPos.current.y - 20,
//       });
//       raf.current = requestAnimationFrame(tick);
//     };

//     window.addEventListener("mousemove", onMove);
//     raf.current = requestAnimationFrame(tick);

//     // grow on hoverable elements
//     const onEnter = () => gsap.to(follower, { scale: 2.8, opacity: 0.6, duration: 0.3, ease: "power2.out" });
//     const onLeave = () => gsap.to(follower, { scale: 1,   opacity: 1,   duration: 0.3, ease: "power2.out" });

//     document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
//       el.addEventListener("mouseenter", onEnter);
//       el.addEventListener("mouseleave", onLeave);
//     });

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(raf.current);
//     };
//   }, []);

//   return (
//     <>
//       {/* Dot — snaps instantly */}
//       <div
//         ref={cursorRef}
//         style={{
//           position: "fixed",
//           top: 0, left: 0,
//           width: 8, height: 8,
//           borderRadius: "50%",
//           background: "#7fffd4",
//           zIndex: 99999,
//           pointerEvents: "none",
//           mixBlendMode: "difference",
//         }}
//       />
//       {/* Ring — lags behind (magic effect) */}
//       <div
//         ref={followerRef}
//         style={{
//           position: "fixed",
//           top: 0, left: 0,
//           width: 40, height: 40,
//           borderRadius: "50%",
//           border: "1.5px solid rgba(127,255,212,0.7)",
//           zIndex: 99998,
//           pointerEvents: "none",
//           mixBlendMode: "difference",
//         }}
//       />
//     </>
//   );
// }

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// export default function FeaturedWork() {
//   const [activeIndex, setActiveIndex]   = useState(0);
//   const [hovered, setHovered]           = useState(false);

//   const sectionRef  = useRef(null);
//   const stickyRef   = useRef(null);
//   const namesRef    = useRef([]);
//   const imagesRef   = useRef([]);
//   const cardsRef    = useRef([]);
//   const progressRef = useRef(null);

//   // ── Scroll-based pinning (same as before) ──────────────────────────────────
//   useEffect(() => {
//     const lenis = new Lenis({ lerp: 0.08 });
//     lenis.on("scroll", ScrollTrigger.update);
//     gsap.ticker.add((t) => lenis.raf(t * 1000));
//     gsap.ticker.lagSmoothing(0);

//     // set initial states
//     namesRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: i === 0 ? 1 : 0.2 });
//     });
//     imagesRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
//     });
//     cardsRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
//     });

//     const SCROLL_PER = 700;
//     const total = SCROLL_PER * (PROJECTS.length - 1);

//     const masterTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: `+=${total}`,
//         pin: stickyRef.current,
//         scrub: 1.2,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           if (progressRef.current)
//             progressRef.current.style.height = `${self.progress * 100}%`;

//           // update activeIndex based on scroll progress
//           const idx = Math.round(self.progress * (PROJECTS.length - 1));
//           setActiveIndex(idx);
//         },
//       },
//     });

//     PROJECTS.forEach((_, i) => {
//       if (i === 0) return;
//       const prev = namesRef.current[i - 1];
//       const curr = namesRef.current[i];
//       const prevImg = imagesRef.current[i - 1];
//       const currImg = imagesRef.current[i];
//       const prevCard = cardsRef.current[i - 1];
//       const currCard = cardsRef.current[i];
//       if (!prev || !curr || !prevImg || !currImg) return;

//       masterTl
//         .to(prev,     { opacity: 0.2, duration: 0.4 },  i - 1)
//         .to(curr,     { opacity: 1,   duration: 0.4 },  i - 1)
//         .to(prevImg,  { opacity: 0, scale: 0.97, duration: 0.5 }, i - 1)
//         .to(currImg,  { opacity: 1, scale: 1,    duration: 0.5 }, i - 1)
//         .to(prevCard, { opacity: 0, y: -20,      duration: 0.4 }, i - 1)
//         .to(currCard, { opacity: 1, y: 0,        duration: 0.4 }, i - 1);
//     });

//     return () => {
//       lenis.destroy();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   // ── Hover: override right panel while hovering a name ─────────────────────
//   const handleNameEnter = (i) => {
//     setHovered(true);
//     // instantly show hovered project's image & card
//     imagesRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === i ? 1 : 0, scale: j === i ? 1 : 1.03, duration: 0.35, ease: "power2.out" });
//     });
//     cardsRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === i ? 1 : 0, y: j === i ? 0 : 12, duration: 0.35, ease: "power2.out" });
//     });
//     namesRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === i ? 1 : 0.15, duration: 0.2 });
//     });
//   };

//   const handleNameLeave = () => {
//     setHovered(false);
//     // restore scroll-driven active index
//     imagesRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === activeIndex ? 1 : 0, scale: 1, duration: 0.35, ease: "power2.out" });
//     });
//     cardsRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === activeIndex ? 1 : 0, y: 0, duration: 0.35, ease: "power2.out" });
//     });
//     namesRef.current.forEach((el, j) => {
//       if (!el) return;
//       gsap.to(el, { opacity: j === activeIndex ? 1 : 0.2, duration: 0.2 });
//     });
//   };

//   return (
//     <>
//       {/* Global custom cursor */}
//       <MagicCursor />

//       {/* Outer wrapper — tall for scroll room */}
//       <div
//         ref={sectionRef}
//         style={{ height: `calc(100vh + ${700 * (PROJECTS.length - 1)}px)`, background: "#0a0a0a" }}
//       >
//         {/* Sticky container */}
//         <div
//           ref={stickyRef}
//           style={{
//             display: "grid",
//             gridTemplateColumns: "55% 45%",
//             height: "100vh",
//             width: "100%",
//             background: "#0a0a0a",
//             overflow: "hidden",
//             cursor: "none",   // hide default cursor
//           }}
//         >
//           {/* ══ LEFT — project names ══════════════════════════════════════════ */}
//           <div
//             style={{
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               padding: "60px 48px",
//             }}
//           >
//             {/* Label */}
//             <p style={{
//               position: "absolute", top: 40, left: 48,
//               fontSize: 13, fontWeight: 600, color: "#fff",
//               letterSpacing: "0.06em", textTransform: "uppercase",
//             }}>
//               Featured Work
//             </p>

//             {/* Progress bar */}
//             <div style={{
//               position: "absolute", left: 0, top: 0,
//               width: 2, height: "100%",
//               background: "rgba(255,255,255,0.06)",
//             }}>
//               <div ref={progressRef} style={{
//                 width: "100%", height: "0%",
//                 background: "#7fffd4",
//                 transition: "height 0.1s linear",
//               }} />
//             </div>

//             {/* Names */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
//               {PROJECTS.map((p, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (namesRef.current[i] = el)}
//                   data-cursor
//                   onMouseEnter={() => handleNameEnter(i)}
//                   onMouseLeave={handleNameLeave}
//                   style={{
//                     display: "flex",
//                     alignItems: "baseline",
//                     gap: 12,
//                     lineHeight: 1.08,
//                     padding: "4px 0",
//                     cursor: "none",
//                   }}
//                 >
//                   <span style={{
//                     fontSize: "clamp(34px, 5vw, 70px)",
//                     fontWeight: 800,
//                     color: "#fff",
//                     letterSpacing: "-0.03em",
//                     fontFamily: "system-ui, sans-serif",
//                     transition: "letter-spacing 0.3s",
//                   }}>
//                     {p.name}
//                   </span>
//                   <span style={{
//                     fontSize: 11,
//                     color: "rgba(255,255,255,0.3)",
//                     letterSpacing: "0.04em",
//                     flexShrink: 0,
//                   }}>
//                     {p.years}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ══ RIGHT — stacked image + card ══════════════════════════════════ */}
//           <div style={{
//             position: "relative",
//             display: "grid",
//             gridTemplateRows: "58% 42%",
//             gap: 8,
//             padding: 8,
//           }}>

//             {/* Images — all stacked, only active one visible */}
//             <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
//               {PROJECTS.map((p, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (imagesRef.current[i] = el)}
//                   style={{
//                     position: "absolute", inset: 0,
//                     borderRadius: 12, overflow: "hidden",
//                     willChange: "opacity, transform",
//                   }}
//                 >
//                   <img
//                     src={p.img}
//                     alt={p.name}
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                   {/* Tag pill on image */}
//                   <div style={{
//                     position: "absolute", bottom: 14, right: 14,
//                     display: "flex", alignItems: "center", gap: 6,
//                     padding: "5px 12px",
//                     background: "rgba(255,255,255,0.15)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: 100,
//                     fontSize: 12, color: "#fff", fontWeight: 500,
//                   }}>
//                     🔍 {p.tag}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Colored info cards — all stacked, only active one visible */}
//             <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
//               {PROJECTS.map((p, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (cardsRef.current[i] = el)}
//                   style={{
//                     position: "absolute", inset: 0,
//                     borderRadius: 12,
//                     background: p.cardBg,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     padding: "28px 32px",
//                     willChange: "opacity, transform",
//                   }}
//                 >
//                   {/* Description */}
//                   <p style={{
//                     fontSize: "clamp(20px, 2vw, 30px)",
//                     fontWeight: 700,
//                     color: "#111",
//                     lineHeight: 1.25,
//                     letterSpacing: "-0.02em",
//                     maxWidth: 340,
//                   }}>
//                     {p.desc}
//                   </p>

//                   {/* Arrow CTA */}
//                   <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                     <div style={{
//                       width: 52, height: 52,
//                       borderRadius: "50%",
//                       background: "#7fffd4",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 22,
//                       cursor: "none",
//                     }}>
//                       ↗
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: "SIXT",
    years: "[2023-2025]",
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&q=80",
    desc: "A category-leading SEO strategy for the world's largest car rental brand.",
    tag: "Car rental",
    cardBg: "#f0ebe3",
    overlayBg: "#0d1117",
  },
  {
    name: "Dojo — B2B",
    years: "[2021-2025]",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    desc: "A B2B success story for Dojo card machines, dominating business search.",
    tag: "Fintech",
    cardBg: "#fde8dc",
    overlayBg: "#1a0e08",
  },
  {
    name: "Magnet Trade — B2B",
    years: "[2023-2024]",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    desc: "Driving trade professional search visibility for Magnet Kitchen's B2B arm.",
    tag: "Home & Trade",
    cardBg: "#e8f4e8",
    overlayBg: "#08130a",
  },
  {
    name: "Leading E-Sim brand globally",
    years: "[2023-2025]",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    desc: "Becoming the #1 searched eSIM brand across every major platform worldwide.",
    tag: "Telecom",
    cardBg: "#e8eaf6",
    overlayBg: "#08091a",
  },
  {
    name: "JD Sports",
    years: "[2025]",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
    desc: "Content & social strategy making JD Sports the go-to for sneaker culture.",
    tag: "Retail",
    cardBg: "#fff9e6",
    overlayBg: "#131005",
  },
];

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function MagicCursor() {
  const cursorRef   = useRef(null);
  const followerRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const fPos = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(cursor, { x: e.clientX - 4, y: e.clientY - 4 });
    };

    const tick = () => {
      fPos.current.x += (pos.current.x - fPos.current.x) * 0.1;
      fPos.current.y += (pos.current.y - fPos.current.y) * 0.1;
      gsap.set(follower, { x: fPos.current.x - 20, y: fPos.current.y - 20 });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    const onEnter = () => gsap.to(follower, { scale: 2.8, opacity: 0.6, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to(follower, { scale: 1,   opacity: 1,   duration: 0.3, ease: "power2.out" });

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 8, height: 8, borderRadius: "50%",
        background: "#7fffd4", zIndex: 99999,
        pointerEvents: "none", mixBlendMode: "difference",
      }} />
      <div ref={followerRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 40, height: 40, borderRadius: "50%",
        border: "1.5px solid rgba(127,255,212,0.7)",
        zIndex: 99998, pointerEvents: "none", mixBlendMode: "difference",
      }} />
    </>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef  = useRef(null);
  const stickyRef   = useRef(null);
  const namesRef    = useRef([]);
  const imagesRef   = useRef([]);
  const overlaysRef = useRef([]); // solid-color text overlays on image slot
  const cardsRef    = useRef([]);
  const progressRef = useRef(null);

  const MARGIN = 12; // px — gap all around (matches screenshot red-arrow spacing)

  // ── Scroll-based pinning ──────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Initial states
    namesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0.2 });
    });
    imagesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
    });
    overlaysRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0 });
    });
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
    });

    const SCROLL_PER = 700;
    const total = SCROLL_PER * (PROJECTS.length - 1);

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total}`,
        pin: stickyRef.current,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressRef.current)
            progressRef.current.style.height = `${self.progress * 100}%`;
          const idx = Math.round(self.progress * (PROJECTS.length - 1));
          setActiveIndex(idx);
        },
      },
    });

    PROJECTS.forEach((_, i) => {
      if (i === 0) return;
      const prev     = namesRef.current[i - 1];
      const curr     = namesRef.current[i];
      const prevImg  = imagesRef.current[i - 1];
      const currImg  = imagesRef.current[i];
      const prevCard = cardsRef.current[i - 1];
      const currCard = cardsRef.current[i];
      if (!prev || !curr || !prevImg || !currImg) return;

      masterTl
        .to(prev,     { opacity: 0.2, duration: 0.4 }, i - 1)
        .to(curr,     { opacity: 1,   duration: 0.4 }, i - 1)
        .to(prevImg,  { opacity: 0, scale: 0.97, duration: 0.5 }, i - 1)
        .to(currImg,  { opacity: 1, scale: 1,    duration: 0.5 }, i - 1)
        .to(prevCard, { opacity: 0, y: -20, duration: 0.4 }, i - 1)
        .to(currCard, { opacity: 1, y: 0,   duration: 0.4 }, i - 1);
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ── Hover: show solid-color overlay with text over the image slot ─────────
  const handleNameEnter = (i) => {
    // Show the correct image underneath (in case scroll moved it)
    imagesRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === i ? 1 : 0, scale: j === i ? 1 : 1.03, duration: 0.3, ease: "power2.out" });
    });

    // Fade in this project's solid overlay on top of image
    overlaysRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === i ? 1 : 0, duration: 0.35, ease: "power2.out" });
    });

    // Hide cards while hovering
    cardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, { opacity: 0, y: 8, duration: 0.25, ease: "power2.out" });
    });

    // Dim other names
    namesRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === i ? 1 : 0.12, duration: 0.2 });
    });
  };

  const handleNameLeave = () => {
    // ── IMAGE STAYS visible (scroll-active one) ──────────────────────────
    imagesRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === activeIndex ? 1 : 0, scale: 1, duration: 0.35, ease: "power2.out" });
    });

    // Hide all overlays → image is revealed
    overlaysRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, { opacity: 0, duration: 0.35, ease: "power2.out" });
    });

    // Restore cards
    cardsRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === activeIndex ? 1 : 0, y: 0, duration: 0.35, ease: "power2.out" });
    });

    // Restore name opacities
    namesRef.current.forEach((el, j) => {
      if (!el) return;
      gsap.to(el, { opacity: j === activeIndex ? 1 : 0.2, duration: 0.2 });
    });
  };

  return (
    <>
      <MagicCursor />

      {/* ── Outer scroll wrapper — background acts as margin colour ─────── */}
      <div
        ref={sectionRef}
        style={{
          height: `calc(100vh + ${700 * (PROJECTS.length - 1)}px)`,
          background: "#0a0a0a",
        }}
      >
        {/* ── Sticky viewport panel ────────────────────────────────────── */}
        <div
          ref={stickyRef}
          style={{
            height: "100vh",
            width: "100%",
            background: "#0a0a0a",   // this shows through as the margin colour
            cursor: "none",
            padding: `${MARGIN}px`,
            boxSizing: "border-box",
          }}
        >
          {/* ── Inner rounded section ─────────────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "55% 45%",
              height: "100%",
              width: "100%",
              borderRadius: 16,
              overflow: "hidden",
              background: "#111111",
            }}
          >

            {/* ══ LEFT — project names ══════════════════════════════════ */}
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 48px",
            }}>

              {/* Section label */}
              <p style={{
                position: "absolute", top: 40, left: 48,
                fontSize: 13, fontWeight: 600, color: "#fff",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                Featured Work
              </p>

              {/* Progress bar */}
              <div style={{
                position: "absolute", left: 0, top: 0,
                width: 2, height: "100%",
                background: "rgba(255,255,255,0.06)",
              }}>
                <div ref={progressRef} style={{
                  width: "100%", height: "0%",
                  background: "#7fffd4",
                  transition: "height 0.1s linear",
                }} />
              </div>

              {/* Project names list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {PROJECTS.map((p, i) => (
                  <div
                    key={i}
                    ref={(el) => (namesRef.current[i] = el)}
                    data-cursor
                    onMouseEnter={() => handleNameEnter(i)}
                    onMouseLeave={handleNameLeave}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      lineHeight: 1.08,
                      padding: "4px 0",
                      cursor: "none",
                    }}
                  >
                    <span style={{
                      fontSize: "clamp(34px, 5vw, 70px)",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.03em",
                      fontFamily: "system-ui, sans-serif",
                    }}>
                      {p.name}
                    </span>
                    <span style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}>
                      {p.years}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ RIGHT — image slot + info cards ═══════════════════════ */}
            <div style={{
              position: "relative",
              display: "grid",
              gridTemplateRows: "58% 42%",
              gap: 8,
              padding: 8,
            }}>

              {/* ── Image slot (images + solid overlays stacked) ─────── */}
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>

                {/* Stacked project images */}
                {PROJECTS.map((p, i) => (
                  <div
                    key={`img-${i}`}
                    ref={(el) => (imagesRef.current[i] = el)}
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: 12, overflow: "hidden",
                      willChange: "opacity, transform",
                    }}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Tag pill */}
                    <div style={{
                      position: "absolute", bottom: 14, right: 14,
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "5px 12px",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 100,
                      fontSize: 12, color: "#fff", fontWeight: 500,
                    }}>
                      🔍 {p.tag}
                    </div>
                  </div>
                ))}

                {/* ── Solid-color text overlays (shown on name hover) ── */}
                {PROJECTS.map((p, i) => (
                  <div
                    key={`overlay-${i}`}
                    ref={(el) => (overlaysRef.current[i] = el)}
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: 12,
                      background: p.overlayBg,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "36px 40px",
                      zIndex: 10,           // above images
                      willChange: "opacity",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Category badge */}
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 14px",
                      background: "rgba(127,255,212,0.1)",
                      border: "1px solid rgba(127,255,212,0.2)",
                      borderRadius: 100,
                      fontSize: 11,
                      color: "#7fffd4",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      marginBottom: 22,
                    }}>
                      {p.tag}
                    </div>

                    {/* Large project name */}
                    <p style={{
                      fontSize: "clamp(28px, 3.2vw, 50px)",
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      marginBottom: 16,
                      fontFamily: "system-ui, sans-serif",
                    }}>
                      {p.name}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontSize: "clamp(13px, 1.1vw, 17px)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.6,
                      maxWidth: 320,
                    }}>
                      {p.desc}
                    </p>

                    {/* Year — top right */}
                    <span style={{
                      position: "absolute",
                      top: 18, right: 18,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.04em",
                    }}>
                      {p.years}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Info cards (below image) ──────────────────────────── */}
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
                {PROJECTS.map((p, i) => (
                  <div
                    key={`card-${i}`}
                    ref={(el) => (cardsRef.current[i] = el)}
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: 12,
                      background: p.cardBg,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "28px 32px",
                      willChange: "opacity, transform",
                    }}
                  >
                    <p style={{
                      fontSize: "clamp(20px, 2vw, 30px)",
                      fontWeight: 700,
                      color: "#111",
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                      maxWidth: 340,
                    }}>
                      {p.desc}
                    </p>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{
                        width: 52, height: 52,
                        borderRadius: "50%",
                        background: "#7fffd4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        cursor: "none",
                      }}>
                        ↗
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}