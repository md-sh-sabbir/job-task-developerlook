// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["Ready", "to", "Rise", "at", "Seven"];

// export default function ReadyToRise() {
//   const trackRef = useRef(null);
//   const heroRef = useRef(null);
//   const lettersRef = useRef([]);

//   useEffect(() => {
//     const track = trackRef.current;
//     const letters = lettersRef.current;

//     gsap.set(track, { x: "100vw" });

//     // Scroll-trigger: slide text from right → left
//     ScrollTrigger.create({
//       trigger: heroRef.current,
//       start: "top top",
//       end: "+=300%",
//       pin: true,
//       scrub: 1.6,
//       onUpdate(self) {
//         const targetX = -(track.scrollWidth * 0.72) * self.progress;
//         gsap.set(track, { x: `calc(100vw + ${targetX}px)` });
//       },
//     });

//     // Sea-wave animation per letter
//     let rafId;
//     const wave = (t) => {
//       letters.forEach((letter, i) => {
//         if (!letter) return;
//         const phase = (i / letters.length) * Math.PI * 2;
//         const y = Math.sin(t * 0.0018 + phase) * 22;
//         const sx = 1 + Math.cos(t * 0.0018 + phase) * 0.035;
//         letter.style.transform = `translateY(${y}px) scaleX(${sx})`;
//       });
//       rafId = requestAnimationFrame(wave);
//     };
//     rafId = requestAnimationFrame(wave);

//     return () => {
//       cancelAnimationFrame(rafId);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   let letterIndex = 0;

//   return (
//     <section
//       ref={heroRef}
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         overflow: "hidden",
//         background: "#eeece8",
//       }}
//     >
//       <div
//         ref={trackRef}
//         style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
//       >
//         {WORDS.map((word, wi) => (
//           <div key={wi} style={{ display: "inline-flex", marginRight: "0.22em" }}>
//             {word.split("").map((char) => {
//               const idx = letterIndex++;
//               return (
//                 <span
//                   key={idx}
//                   ref={(el) => (lettersRef.current[idx] = el)}
//                   style={{
//                     display: "inline-block",
//                     fontSize: "clamp(4rem, 10vw, 9rem)",
//                     fontWeight: 800,
//                     letterSpacing: "-0.04em",
//                     color: "#111",
//                     lineHeight: 0.9,
//                     willChange: "transform",
//                   }}
//                 >
//                   {char}
//                 </span>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// import { useEffect, useRef, useCallback } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ─── Configuration ───────────────────────────────────────────────
// const WORDS = ["Ready", "to", "Rise", "at", "Seven"];
// const WAVE_AMPLITUDE = 28;      // px — how tall the wave crests
// const WAVE_SPEED = 0.0022;      // higher = faster wave cycle
// const WAVE_DECAY = 0.06;        // how quickly wave fades after scrolling stops (0-1)
// const SCROLL_END_OFFSET = "+=250%"; // how much scroll distance to consume

// // ─── Component ───────────────────────────────────────────────────
// export default function ReadyToRise() {
//   const heroRef = useRef(null);
//   const trackRef = useRef(null);
//   const lettersRef = useRef([]);
//   const waveStateRef = useRef({
//     amplitude: 0,      // current live amplitude (fades in/out)
//     velocity: 0,       // scroll velocity for wave intensity
//     time: 0,
//     rafId: null,
//     lastScrollY: 0,
//     scrolling: false,
//     decayTimer: null,
//   });

//   // Build letter refs array
//   const setLetterRef = useCallback((el, i) => {
//     lettersRef.current[i] = el;
//   }, []);

//   useEffect(() => {
//     const track = trackRef.current;
//     const hero = heroRef.current;
//     const state = waveStateRef.current;
//     const letters = lettersRef.current;

//     // ── 1. Start: text is off-screen LEFT ──────────────────────
//     gsap.set(track, { x: "-100vw", opacity: 1 });

//     // ── 2. ScrollTrigger: slide text from left → resting position ──
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: hero,
//         start: "top top",
//         end: SCROLL_END_OFFSET,
//         pin: true,
//         scrub: 1.4,
//         onUpdate(self) {
//           // Drive wave amplitude from scroll velocity
//           const scrollY = window.scrollY;
//           const delta = Math.abs(scrollY - state.lastScrollY);
//           state.lastScrollY = scrollY;

//           // Ramp up amplitude while scrolling
//           if (delta > 0) {
//             state.scrolling = true;
//             state.amplitude = Math.min(
//               WAVE_AMPLITUDE,
//               state.amplitude + delta * 0.8
//             );
//             clearTimeout(state.decayTimer);
//             // After scrolling stops, decay the wave
//             state.decayTimer = setTimeout(() => {
//               state.scrolling = false;
//             }, 80);
//           }
//         },
//       },
//     });

//     // Slide from left (-100vw) to 0 (resting)
//     tl.to(track, {
//       x: "0vw",
//       ease: "none",
//       duration: 1,
//     });

//     // ── 3. RAF wave loop ────────────────────────────────────────
//     const animateWave = (timestamp) => {
//       state.time = timestamp;

//       // Decay amplitude when not scrolling
//       if (!state.scrolling) {
//         state.amplitude = Math.max(0, state.amplitude - state.amplitude * WAVE_DECAY);
//       }

//       const amp = state.amplitude;

//       letters.forEach((letter, i) => {
//         if (!letter) return;
//         if (amp < 0.5) {
//           // Fully at rest — snap to flat to avoid float drift
//           letter.style.transform = "translateY(0px)";
//           return;
//         }
//         // Wave flows LEFT → RIGHT: phase increases with index
//         const phase = (i / letters.length) * Math.PI * 2;
//         const y = Math.sin(timestamp * WAVE_SPEED + phase) * amp;
//         const scaleX = 1 + Math.cos(timestamp * WAVE_SPEED + phase) * 0.03 * (amp / WAVE_AMPLITUDE);
//         letter.style.transform = `translateY(${y.toFixed(2)}px) scaleX(${scaleX.toFixed(4)})`;
//       });

//       state.rafId = requestAnimationFrame(animateWave);
//     };

//     state.rafId = requestAnimationFrame(animateWave);

//     return () => {
//       cancelAnimationFrame(state.rafId);
//       clearTimeout(state.decayTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   // Build flat letter index across all words
//   let globalIdx = 0;

//   return (
//     <>
//       {/* Inject Google Font — remove if you handle fonts globally */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
//         .rise-hero-section {
//           height: 100vh;
//           display: flex;
//           align-items: center;
//           overflow: hidden;
//           background: #eeece8;
//           position: relative;
//         }
//         .rise-wave-track {
//           display: flex;
//           align-items: center;
//           white-space: nowrap;
//           padding-left: 5vw;
//           will-change: transform;
//         }
//         .rise-wave-word {
//           display: inline-flex;
//           margin-right: 0.24em;
//         }
//         .rise-wave-letter {
//           display: inline-block;
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(5rem, 10.5vw, 10rem);
//           font-weight: 800;
//           letter-spacing: -0.04em;
//           line-height: 0.9;
//           color: #111110;
//           will-change: transform;
//           user-select: none;
//         }
//       `}</style>

//       <section className="rise-hero-section" ref={heroRef}>
//         <div className="rise-wave-track" ref={trackRef}>
//           {WORDS.map((word, wi) => (
//             <div className="rise-wave-word" key={wi}>
//               {word.split("").map((char) => {
//                 const idx = globalIdx++;
//                 return (
//                   <span
//                     key={idx}
//                     className="rise-wave-letter"
//                     ref={(el) => setLetterRef(el, idx)}
//                   >
//                     {char}
//                   </span>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// import { useEffect, useRef, useCallback } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["Ready", "to", "Rise", "at", "Seven"];
// const WAVE_AMPLITUDE   = 55;   // max wave height px — bigger = more dramatic
// const WAVE_SPEED       = 0.3; // wave cycle speed
// const WAVE_FREQUENCY   = 2.8;  // crests across the text
// const WAVE_DECAY       = 0.03; // slow = wave lingers after scroll stops
// const SCROLL_SENSITIVITY = 2.2; // how hard scroll pumps the wave

// export default function ReadyToRise() {
//   const heroRef    = useRef(null);
//   const trackRef   = useRef(null);
//   const lettersRef = useRef([]);
//   const state      = useRef({
//     amplitude: 0,
//     rafId: null,
//     lastScrollY: 0,
//     scrolling: false,
//     decayTimer: null,
//   });

//   const setLetterRef = useCallback((el, i) => {
//     lettersRef.current[i] = el;
//   }, []);

//   useEffect(() => {
//     const track   = trackRef.current;
//     const hero    = heroRef.current;
//     const s       = state.current;
//     const letters = lettersRef.current;

//     // ── Start: text off-screen to the RIGHT ──────────────────────
//     gsap.set(track, { x: "100vw" });

//     // ── ScrollTrigger: slide RIGHT → LEFT ────────────────────────
//     gsap.timeline({
//       scrollTrigger: {
//         trigger: hero,
//         start: "top top",
//         end: "+=280%",
//         pin: true,
//         scrub: 1.2,
//         onUpdate() {
//           const scrollY = window.scrollY;
//           const delta   = Math.abs(scrollY - s.lastScrollY);
//           s.lastScrollY = scrollY;

//           if (delta > 0.5) {
//             s.scrolling  = true;
//             s.amplitude  = Math.min(
//               WAVE_AMPLITUDE,
//               s.amplitude + delta * SCROLL_SENSITIVITY
//             );
//             clearTimeout(s.decayTimer);
//             s.decayTimer = setTimeout(() => { s.scrolling = false; }, 120);
//           }
//         },
//       },
//     }).to(track, { x: "0vw", ease: "none", duration: 1 });

//     // ── RAF wave loop ─────────────────────────────────────────────
//     const loop = (ts) => {
//       // Decay amplitude smoothly when scroll stops
//       if (!s.scrolling && s.amplitude > 0.1) {
//         s.amplitude *= (1 - WAVE_DECAY);
//         if (s.amplitude < 0.1) s.amplitude = 0;
//       }

//       const amp = s.amplitude;

//       letters.forEach((el, i) => {
//         if (!el) return;
//         if (amp < 0.2) {
//           el.style.transform = "translateY(0px) scaleX(1) rotate(0deg)";
//           return;
//         }
//         // Phase flows RIGHT → LEFT (negative index offset)
//         const phase = -(i / letters.length) * Math.PI * 2 * WAVE_FREQUENCY;
//         const y1    = Math.sin(ts * WAVE_SPEED + phase) * amp;
//         // Second harmonic — organic layering
//         const y2    = Math.sin(ts * WAVE_SPEED * 2.1 + phase * 1.4) * amp * 0.28;
//         const sx    = 1 + Math.cos(ts * WAVE_SPEED + phase) * 0.045 * (amp / WAVE_AMPLITUDE);
//         const rot   = Math.sin(ts * WAVE_SPEED + phase) * 2.5 * (amp / WAVE_AMPLITUDE);

//         el.style.transform =
//           `translateY(${(y1 + y2).toFixed(2)}px) ` +
//           `scaleX(${sx.toFixed(4)}) ` +
//           `rotate(${rot.toFixed(2)}deg)`;
//       });

//       s.rafId = requestAnimationFrame(loop);
//     };

//     s.rafId = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(s.rafId);
//       clearTimeout(s.decayTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   let idx = 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
//         .rise-section {
//           height: 100vh;
//           display: flex;
//           align-items: center;
//           overflow: hidden;
//           background: #eeece8;
//           position: relative;
//         }
//         .rise-track {
//           display: flex;
//           align-items: center;
//           white-space: nowrap;
//           padding-left: 4vw;
//           will-change: transform;
//         }
//         .rise-word {
//           display: inline-flex;
//           margin-right: 0.22em;
//         }
//         .rise-letter {
//           display: inline-block;
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(5rem, 11vw, 10.5rem);
//           font-weight: 800;
//           letter-spacing: -0.04em;
//           line-height: 0.9;
//           color: #111110;
//           will-change: transform;
//           user-select: none;
//           transform-origin: center bottom;
//         }
//       `}</style>

//       <section className="rise-section" ref={heroRef}>
//         <div className="rise-track" ref={trackRef}>
//           {WORDS.map((word, wi) => (
//             <div className="rise-word" key={wi}>
//               {word.split("").map((char) => {
//                 const i = idx++;
//                 return (
//                   <span
//                     key={i}
//                     className="rise-letter"
//                     ref={(el) => setLetterRef(el, i)}
//                   >
//                     {char}
//                   </span>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// import { useEffect, useRef, useCallback } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["Ready", "to", "Rise", "at", "Seven"];

// // ── Tuning ────────────────────────────────────────────────────────
// const FONT_SIZE_BIG    = "clamp(9rem, 20vw, 22rem)"; // oversized entry size
// const FONT_SIZE_NORMAL = "clamp(5rem, 11vw, 10.5rem)"; // resting size
// const WAVE_AMPLITUDE   = 60;   // px — wave height when scrolling
// const WAVE_SPEED       = 0.003;
// const WAVE_FREQUENCY   = 2.6;  // crests across text
// const WAVE_DECAY       = 0.025;
// const SCROLL_SENSITIVITY = 2.5;

// export default function ReadyToRise() {
//   const heroRef    = useRef(null);
//   const trackRef   = useRef(null);
//   const lettersRef = useRef([]);
//   const wordsRef   = useRef([]);
//   const state      = useRef({
//     amplitude: 0,
//     rafId: null,
//     lastScrollY: 0,
//     scrolling: false,
//     decayTimer: null,
//   });

//   const setLetterRef = useCallback((el, i) => { lettersRef.current[i] = el; }, []);
//   const setWordRef   = useCallback((el, i) => { wordsRef.current[i] = el; }, []);

//   useEffect(() => {
//     const track   = trackRef.current;
//     const hero    = heroRef.current;
//     const s       = state.current;
//     const letters = lettersRef.current;

//     // ── Phase 1: Start — giant text off-screen RIGHT ──────────────
//     gsap.set(track, { x: "100vw" });
//     gsap.set(".rise-letter", { fontSize: FONT_SIZE_BIG });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: hero,
//         start: "top top",
//         end: "+=400%",          // 4 scroll lengths total
//         pin: true,
//         scrub: 1.0,
//         onUpdate(self) {
//           const scrollY = window.scrollY;
//           const delta   = Math.abs(scrollY - s.lastScrollY);
//           s.lastScrollY = scrollY;

//           // Only pump wave during the active middle phase (20%–75%)
//           const p = self.progress;
//           if (delta > 0.5 && p > 0.18 && p < 0.78) {
//             s.scrolling  = true;
//             s.amplitude  = Math.min(
//               WAVE_AMPLITUDE,
//               s.amplitude + delta * SCROLL_SENSITIVITY
//             );
//             clearTimeout(s.decayTimer);
//             s.decayTimer = setTimeout(() => { s.scrolling = false; }, 120);
//           }
//         },
//       },
//     });

//     // ── Phase 1 (0–25%): Slide in from RIGHT, big font ──────────
//     tl.to(track, {
//       x: "4vw",                 // land with left padding
//       ease: "power2.out",
//       duration: 0.25,
//     });

//     // ── Phase 2 (25–50%): Scale font DOWN to normal size ─────────
//     tl.to(".rise-letter", {
//       fontSize: FONT_SIZE_NORMAL,
//       ease: "power2.inOut",
//       duration: 0.25,
//       stagger: 0,               // all at once
//     });

//     // ── Phase 3 (50–75%): Hold / wave plays during this scroll ───
//     tl.to({}, { duration: 0.25 }); // empty tween = hold position

//     // ── Phase 4 (75–100%): Exit to the LEFT off screen ───────────
//     tl.to(track, {
//       x: () => -(track.scrollWidth + window.innerWidth * 0.1),
//       ease: "power2.in",
//       duration: 0.25,
//     });

//     // ── RAF wave loop ─────────────────────────────────────────────
//     const loop = (ts) => {
//       if (!s.scrolling && s.amplitude > 0.1) {
//         s.amplitude *= (1 - WAVE_DECAY);
//         if (s.amplitude < 0.1) s.amplitude = 0;
//       }

//       const amp = s.amplitude;

//       letters.forEach((el, i) => {
//         if (!el) return;
//         if (amp < 0.2) {
//           el.style.transform = "translateY(0px) scaleX(1) rotate(0deg)";
//           return;
//         }
//         // Phase flows RIGHT → LEFT
//         const phase = -(i / letters.length) * Math.PI * 2 * WAVE_FREQUENCY;
//         const y1  = Math.sin(ts * WAVE_SPEED + phase) * amp;
//         const y2  = Math.sin(ts * WAVE_SPEED * 2.1 + phase * 1.4) * amp * 0.28;
//         const sx  = 1 + Math.cos(ts * WAVE_SPEED + phase) * 0.04 * (amp / WAVE_AMPLITUDE);
//         const rot = Math.sin(ts * WAVE_SPEED + phase) * 2.5 * (amp / WAVE_AMPLITUDE);

//         el.style.transform =
//           `translateY(${(y1 + y2).toFixed(2)}px) ` +
//           `scaleX(${sx.toFixed(4)}) ` +
//           `rotate(${rot.toFixed(2)}deg)`;
//       });

//       s.rafId = requestAnimationFrame(loop);
//     };

//     s.rafId = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(s.rafId);
//       clearTimeout(s.decayTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   let idx = 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

//         .rise-section {
//           height: 100vh;
//           display: flex;
//           align-items: center;
//           overflow: hidden;
//           background: #eeece8;
//           position: relative;
//         }

//         .rise-track {
//           display: flex;
//           align-items: center;
//           white-space: nowrap;
//           will-change: transform;
//         }

//         .rise-word {
//           display: inline-flex;
//           /* word gap */
//           margin-right: 0.35em;
//         }

//         .rise-word:last-child {
//           margin-right: 0;
//         }

//         .rise-letter {
//           display: inline-block;
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           letter-spacing: -0.04em;
//           line-height: 0.9;
//           color: #111110;
//           will-change: transform, font-size;
//           user-select: none;
//           transform-origin: center bottom;
//         }
//       `}</style>

//       <section className="rise-section" ref={heroRef}>
//         <div className="rise-track" ref={trackRef}>
//           {WORDS.map((word, wi) => (
//             <div
//               className="rise-word"
//               key={wi}
//               ref={(el) => setWordRef(el, wi)}
//             >
//               {word.split("").map((char) => {
//                 const i = idx++;
//                 return (
//                   <span
//                     key={i}
//                     className="rise-letter"
//                     ref={(el) => setLetterRef(el, i)}
//                   >
//                     {char}
//                   </span>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }









// import { useEffect, useRef, useCallback } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["Ready", "  ", "to", "  ", "Rise", "  ", "at", "  ", "Seven"];

// const WAVE_AMPLITUDE    = 65;
// const WAVE_SPEED        = 0.003;
// const WAVE_FREQUENCY    = 2.6;
// const WAVE_DECAY        = 0.025;
// const SCROLL_SENSITIVITY = 2.8;

// export default function RiseHero() {
//   const heroRef    = useRef(null);
//   const trackRef   = useRef(null);
//   const lettersRef = useRef([]);
//   const state      = useRef({
//     amplitude: 0,
//     rafId: null,
//     lastScrollY: 0,
//     scrolling: false,
//     decayTimer: null,
//   });

//   const setLetterRef = useCallback((el, i) => {
//     lettersRef.current[i] = el;
//   }, []);

//   useEffect(() => {
//     const track   = trackRef.current;
//     const hero    = heroRef.current;
//     const s       = state.current;
//     const letters = lettersRef.current;

//     // Start — giant text off-screen RIGHT
//     gsap.set(track, { x: "100vw" });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: hero,
//         start: "top top",
//         end: "+=400%",
//         pin: true,
//         scrub: 1.0,
//         onUpdate(self) {
//           const scrollY = window.scrollY;
//           const delta   = Math.abs(scrollY - s.lastScrollY);
//           s.lastScrollY = scrollY;
//           const p = self.progress;

//           if (delta > 0.5 && p > 0.20 && p < 0.78) {
//             s.scrolling  = true;
//             s.amplitude  = Math.min(
//               WAVE_AMPLITUDE,
//               s.amplitude + delta * SCROLL_SENSITIVITY
//             );
//             clearTimeout(s.decayTimer);
//             s.decayTimer = setTimeout(() => { s.scrolling = false; }, 120);
//           }
//         },
//       },
//     });

//     // Phase 1 (0–25%): slide in from right, BIG size
//     tl.to(track, {
//       x: "3vw",
//       ease: "power2.out",
//       duration: 0.25,
//     });

//     // Phase 2 (25–50%): shrink font to normal
//     tl.to(".rise-letter", {
//       fontSize: "clamp(5rem, 11vw, 10.5rem)",
//       ease: "power2.inOut",
//       duration: 0.25,
//     });

//     // Phase 3 (50–75%): hold — wave plays here
//     tl.to({}, { duration: 0.25 });

//     // Phase 4 (75–100%): exit left
//     tl.to(track, {
//       x: () => -(track.scrollWidth + window.innerWidth * 0.15),
//       ease: "power2.in",
//       duration: 0.25,
//     });

//     // RAF wave loop
//     const loop = (ts) => {
//       if (!s.scrolling && s.amplitude > 0.1) {
//         s.amplitude *= (1 - WAVE_DECAY);
//         if (s.amplitude < 0.1) s.amplitude = 0;
//       }
//       const amp = s.amplitude;
//       letters.forEach((el, i) => {
//         if (!el) return;
//         if (amp < 0.2) {
//           el.style.transform = "translateY(0px) scaleX(1) rotate(0deg)";
//           return;
//         }
//         const phase = -(i / letters.length) * Math.PI * 2 * WAVE_FREQUENCY;
//         const y1  = Math.sin(ts * WAVE_SPEED + phase) * amp;
//         const y2  = Math.sin(ts * WAVE_SPEED * 2.1 + phase * 1.4) * amp * 0.28;
//         const sx  = 1 + Math.cos(ts * WAVE_SPEED + phase) * 0.04 * (amp / WAVE_AMPLITUDE);
//         const rot = Math.sin(ts * WAVE_SPEED + phase) * 2.5 * (amp / WAVE_AMPLITUDE);
//         el.style.transform =
//           `translateY(${(y1 + y2).toFixed(2)}px) scaleX(${sx.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
//       });
//       s.rafId = requestAnimationFrame(loop);
//     };
//     s.rafId = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(s.rafId);
//       clearTimeout(s.decayTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   let idx = 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

//         .rise-section {
//           height: 100vh;
//           display: flex;
//           align-items: center;
//           overflow: hidden;
//           background: #eeece8;
//         }

//         .rise-track {
//           display: flex;
//           align-items: center;
//           white-space: nowrap;
//           will-change: transform;
//           /* gap between words */
//           gap: 0.45em;
//         }

//         .rise-word {
//           display: inline-flex;
//           align-items: center;
//           /* explicit space character padding on both sides */
//           padding: 0 0.1em;
//         }

//         .rise-letter {
//           display: inline-block;
//           font-family: 'Syne', sans-serif;
//           /* BIG starting size — GSAP will shrink this in phase 2 */
//           font-size: clamp(9rem, 19vw, 20rem);
//           font-weight: 800;
//           letter-spacing: -0.03em;
//           line-height: 1;
//           color: #111110;
//           will-change: transform, font-size;
//           user-select: none;
//           transform-origin: center bottom;
//         }
//       `}</style>

//       <section className="rise-section" ref={heroRef}>
//         <div className="rise-track" ref={trackRef}>
//           {WORDS.map((word, wi) => (
//             <div className="rise-word" key={wi}>
//               {word.split("").map((char) => {
//                 const i = idx++;
//                 return (
//                   <span
//                     key={i}
//                     className="rise-letter"
//                     ref={(el) => setLetterRef(el, i)}
//                   >
//                     {char}
//                   </span>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }








// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["Ready", "to", "Rise", "at", "Seven"];
// const WAVE_AMPLITUDE     = 70;
// const WAVE_SPEED         = 0.3;
// const WAVE_FREQUENCY     = 2.6;
// const WAVE_DECAY         = 0.025;
// const SCROLL_SENSITIVITY = 3.0;
// const ENTRY_SCALE        = 2.8;

// export default function RiseHero() {
//   const heroRef    = useRef(null);
//   const trackRef   = useRef(null);
//   const lettersRef = useRef([]);   // only animatable letter spans
//   const state      = useRef({
//     amplitude: 0, rafId: null,
//     lastScrollY: 0, scrolling: false, decayTimer: null,
//   });

//   useEffect(() => {
//     const track   = trackRef.current;
//     const hero    = heroRef.current;
//     const s       = state.current;
//     // Grab ALL .rise-letter spans from the DOM after render
//     const letters = Array.from(track.querySelectorAll(".rise-letter"));

//     // ── Initial: off-screen RIGHT, scaled up big ─────────────────
//     gsap.set(track, {
//       x: "100vw",
//       scaleY: ENTRY_SCALE,
//       scaleX: ENTRY_SCALE * 0.75,
//       transformOrigin: "center center",
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: hero,
//         start:   "top top",
//         end:     "+=450%",
//         pin:     true,
//         scrub:   1.0,
//         onUpdate(self) {
//           const scrollY = window.scrollY;
//           const delta   = Math.abs(scrollY - s.lastScrollY);
//           s.lastScrollY = scrollY;
//           const p = self.progress;
//           if (delta > 0.5 && p > 0.22 && p < 0.75) {
//             s.scrolling = true;
//             s.amplitude = Math.min(WAVE_AMPLITUDE, s.amplitude + delta * SCROLL_SENSITIVITY);
//             clearTimeout(s.decayTimer);
//             s.decayTimer = setTimeout(() => { s.scrolling = false; }, 120);
//           }
//         },
//       },
//     });

//     // Phase 1: slide in from right
//     tl.to(track, { x: "3vw", ease: "power2.out", duration: 0.22 });
//     // Phase 2: scale down to normal
//     tl.to(track, { scaleY: 1, scaleX: 1, ease: "power2.inOut", duration: 0.23 });
//     // Phase 3: hold (wave zone)
//     tl.to({}, { duration: 0.30 });
//     // Phase 4: exit left
//     tl.to(track, {
//       x: () => -(track.scrollWidth + window.innerWidth * 0.2),
//       ease: "power2.in",
//       duration: 0.25,
//     });

//     // ── Wave RAF loop ─────────────────────────────────────────────
//     const loop = (ts) => {
//       if (!s.scrolling && s.amplitude > 0.1) {
//         s.amplitude *= (1 - WAVE_DECAY);
//         if (s.amplitude < 0.1) s.amplitude = 0;
//       }
//       const amp = s.amplitude;
//       letters.forEach((el, i) => {
//         if (amp < 0.2) {
//           el.style.transform = "translateY(0px) scaleX(1) rotate(0deg)";
//           return;
//         }
//         const phase = -(i / letters.length) * Math.PI * 2 * WAVE_FREQUENCY;
//         const y1  = Math.sin(ts * WAVE_SPEED + phase) * amp;
//         const y2  = Math.sin(ts * WAVE_SPEED * 2.1 + phase * 1.4) * amp * 0.28;
//         const sx  = 1 + Math.cos(ts * WAVE_SPEED + phase) * 0.04 * (amp / WAVE_AMPLITUDE);
//         const rot = Math.sin(ts * WAVE_SPEED + phase) * 2.5 * (amp / WAVE_AMPLITUDE);
//         el.style.transform = `translateY(${(y1 + y2).toFixed(2)}px) scaleX(${sx.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
//       });
//       s.rafId = requestAnimationFrame(loop);
//     };
//     s.rafId = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(s.rafId);
//       clearTimeout(s.decayTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

//         .rise-section {
//           height: 100vh;
//           display: flex;
//           align-items: center;
//           overflow: hidden;
//           background: #eeece8;
//         }

//         /*
//           KEY FIX: the track is display:block so child word-divs
//           sit as block children, but we use inline-block on words
//           so they line up horizontally with natural text spacing.
//           We add a right-margin ON EACH WORD to create the gap.
//         */
//         .rise-track {
//           display: block;
//           white-space: nowrap;
//           will-change: transform;
//           padding-left: 3vw;
//           line-height: 1.1;
//         }

//         /* Each word is an inline-block box.
//            margin-right creates the inter-word space. */
//         .rise-word {
//           display: inline-block;
//           margin-right: 0.4em;   /* ← THIS is the word gap */
//           vertical-align: middle;
//         }
//         .rise-word:last-child {
//           margin-right: 0;
//         }

//         /* Letter spans inside each word */
//         .rise-letter {
//           display: inline-block;
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(7rem, 14vw, 15rem);
//           font-weight: 800;
//           letter-spacing: -0.02em;
//           line-height: 1;
//           color: #111110;
//           will-change: transform;
//           user-select: none;
//           transform-origin: center bottom;
//         }
//       `}</style>

//       <section className="rise-section" ref={heroRef}>
//         <div className="rise-track" ref={trackRef}>
//           {WORDS.map((word, wi) => (
//             <div className="rise-word" key={wi}>
//               {/*
//                 Each character gets its own span for wave animation.
//                 The word-div wrapper provides the spacing between words.
//               */}
//               {word.split("").map((char, ci) => (
//                 <span className="rise-letter" key={ci}>
//                   {char}
//                 </span>
//               ))}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }




import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Ready", "to", "Rise", "at", "Seven"];

const WAVE_AMPLITUDE     = 32;    // was 70 — much gentler crest height
const WAVE_SPEED         = 0.0018; // was 0.3 — smooth slow ocean rhythm
const WAVE_FREQUENCY     = 2.2;   // crests across the text
const WAVE_DECAY         = 0.04;  // how fast wave fades after scroll stops
const SCROLL_SENSITIVITY = 0.9;   // was 3.0 — subtle pump per scroll px
const ENTRY_SCALE        = 2.8;

export default function RiseHero() {
  const heroRef  = useRef(null);
  const trackRef = useRef(null);
  const state    = useRef({
    amplitude: 0, rafId: null,
    lastScrollY: 0, scrolling: false, decayTimer: null,
  });

  useEffect(() => {
    const track = trackRef.current;
    const hero  = heroRef.current;
    const s     = state.current;
    const letters = Array.from(track.querySelectorAll(".rise-letter"));

    gsap.set(track, {
      x: "100vw",
      scaleY: ENTRY_SCALE,
      scaleX: ENTRY_SCALE * 0.75,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start:   "top top",
        end:     "+=450%",
        pin:     true,
        scrub:   1.4,          // slightly more scrub = smoother scroll feel
        onUpdate(self) {
          const scrollY = window.scrollY;
          const delta   = Math.abs(scrollY - s.lastScrollY);
          s.lastScrollY = scrollY;
          const p = self.progress;

          // Only activate wave in the hold zone (phases 2–3)
          if (delta > 1 && p > 0.22 && p < 0.75) {
            s.scrolling = true;
            // Clamp increment — no sudden spikes
            const increment = Math.min(delta * SCROLL_SENSITIVITY, 6);
            s.amplitude = Math.min(WAVE_AMPLITUDE, s.amplitude + increment);
            clearTimeout(s.decayTimer);
            s.decayTimer = setTimeout(() => { s.scrolling = false; }, 150);
          }
        },
      },
    });

    // Phase 1: slide in from right at giant scale
    tl.to(track, { x: "3vw", ease: "power2.out", duration: 0.22 });
    // Phase 2: scale down to normal
    tl.to(track, { scaleY: 1, scaleX: 1, ease: "power2.inOut", duration: 0.23 });
    // Phase 3: hold — wave zone
    tl.to({}, { duration: 0.30 });
    // Phase 4: exit left
    tl.to(track, {
      x: () => -(track.scrollWidth + window.innerWidth * 0.2),
      ease: "power2.in",
      duration: 0.25,
    });

    // RAF wave — smooth sine, slow speed, gentle amplitude
    const loop = (ts) => {
      if (!s.scrolling && s.amplitude > 0.05) {
        s.amplitude *= (1 - WAVE_DECAY);
        if (s.amplitude < 0.05) s.amplitude = 0;
      }
      const amp = s.amplitude;

      letters.forEach((el, i) => {
        if (amp < 0.1) {
          el.style.transform = "translateY(0px)";
          return;
        }
        // Phase flows right → left
        const phase = -(i / letters.length) * Math.PI * 2 * WAVE_FREQUENCY;
        const y     = Math.sin(ts * WAVE_SPEED + phase) * amp;
        // Subtle second harmonic for organic feel
        const y2    = Math.sin(ts * WAVE_SPEED * 1.7 + phase * 1.3) * amp * 0.18;
        const rot   = Math.sin(ts * WAVE_SPEED + phase) * 1.2 * (amp / WAVE_AMPLITUDE);
        el.style.transform = `translateY(${(y + y2).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
      });

      s.rafId = requestAnimationFrame(loop);
    };
    s.rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.rafId);
      clearTimeout(s.decayTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

        .rise-section {
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #eeece8;
        }

        .rise-track {
          display: block;
          white-space: nowrap;
          will-change: transform;
          padding-left: 3vw;
          line-height: 1.1;
        }

        .rise-word {
          display: inline-block;
          margin-right: 0.4em;
          vertical-align: middle;
        }
        .rise-word:last-child { margin-right: 0; }

        .rise-letter {
          display: inline-block;
          font-family: 'Syne', sans-serif;
          font-size: clamp(7rem, 14vw, 15rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #111110;
          will-change: transform;
          user-select: none;
          transform-origin: center bottom;
        }
      `}</style>

      <section className="rise-section" ref={heroRef}>
        <div className="rise-track" ref={trackRef}>
          {WORDS.map((word, wi) => (
            <div className="rise-word" key={wi}>
              {word.split("").map((char, ci) => (
                <span className="rise-letter" key={ci}>{char}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}