import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import amazon    from "../../assets/amazon.jpg";
import chatGpt   from "../../assets/chatGpt.jpg";
import gemini    from "../../assets/gemini.jpg";
import giphy     from "../../assets/giphy.jpg";
import google    from "../../assets/google.jpg";
import pinterest from "../../assets/pinterest.jpg";
import reddit    from "../../assets/reddit.jpg";
import tiktok    from "../../assets/tiktok.jpg";
import youtube   from "../../assets/youtube.jpg";

const NAV_LINKS = [
  "Services +",
  "Industries +",
  "International +",
  "Careers",
  "Blog & Resources +",
  "Webinar",
];

const IMAGES = [google, chatGpt, gemini, tiktok, youtube, pinterest, giphy, reddit, amazon];

export default function HeroBanner() {
  const [menuOpen, setMenuOpen] = useState(false);

  const curtainRef  = useRef(null);
  const navRef      = useRef(null);
  const badgeRef    = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const bottomRef   = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" });
    }
  }, [menuOpen]);

  // Page reveal
  useEffect(() => {
    gsap.set(
      [navRef.current, badgeRef.current, headlineRef.current, subRef.current, bottomRef.current],
      { opacity: 0, y: 30 }
    );

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(curtainRef.current, {
      yPercent: -110,
      duration: 1.3,
      ease: "power4.inOut",
    }).to(
      [navRef.current, badgeRef.current, headlineRef.current, subRef.current, bottomRef.current],
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" },
      "-=0.5"
    );

    return () => tl.kill();
  }, []);

  return (
    <>
      {/* ── CURTAIN ── */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] pointer-events-none h-[calc(100vh+90px)]"
      >
        <div className="absolute inset-0 bottom-[88px] bg-[#7fffd4]" />
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full h-[90px]"
        >
          <path d="M0,0 L1440,0 L1440,20 Q720,110 0,20 Z" fill="#7fffd4" />
        </svg>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative w-[calc(100%-16px)] min-h-[calc(100vh-16px)] overflow-hidden bg-[#0e0d0c] m-2 rounded-3xl font-sans flex flex-col">

        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-cover saturate-75"
          style={{
            backgroundImage: `
              linear-gradient(to bottom,
                rgba(14,13,12,0.55) 0%,
                rgba(14,13,12,0.15) 40%,
                rgba(14,13,12,0.75) 100%
              ),
              url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80')
            `,
          }}
        />

        {/* ── NAVBAR ── */}
        <nav ref={navRef} className="relative z-20 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4 lg:py-5">

          {/* Logo */}
          <h1 className="text-white text-[17px] font-medium tracking-[-0.02em]">
            Rise at Seven<span className="text-[#7fffd4]">.</span>
          </h1>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex gap-7 xl:gap-9 text-sm text-white/70 list-none m-0 p-0">
            {NAV_LINKS.slice(0, 3).map((l) => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
            <li>
              <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                Work
                <span className="w-[18px] h-[18px] rounded-full bg-[#7fffd4] text-black text-[10px] font-bold flex items-center justify-center">
                  25
                </span>
              </a>
            </li>
            {NAV_LINKS.slice(3).map((l) => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button className="hidden lg:flex px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full items-center gap-2 hover:bg-[#7fffd4] hover:scale-105 transition-all duration-200">
            Get In Touch
            <GoArrowUpRight size={18} />
          </button>

          {/* Mobile right side — CTA (small) + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <button className="px-4 py-2 bg-white text-black text-xs font-medium rounded-full flex items-center gap-1.5 hover:bg-[#7fffd4] transition-all duration-200">
              Get In Touch
              <GoArrowUpRight size={14} />
            </button>

            {/* Hamburger toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <HiOutlineX size={18} />
                : <HiOutlineMenuAlt3 size={18} />
              }
            </button>
          </div>
        </nav>

        {/* ── MOBILE DROPDOWN MENU ── */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="relative z-20 lg:hidden mx-3 mb-2 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col divide-y divide-white/8">
              {[...NAV_LINKS.slice(0, 3), "Work", ...NAV_LINKS.slice(3)].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-4 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150"
                  >
                    <span>{l}</span>
                    {l === "Work" && (
                      <span className="w-[18px] h-[18px] rounded-full bg-[#7fffd4] text-black text-[10px] font-bold flex items-center justify-center">
                        25
                      </span>
                    )}
                    {l !== "Work" && (
                      <GoArrowUpRight size={14} className="opacity-40" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── HERO BODY ── */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 flex-1 py-8">

          {/* Images row */}
          {/* <div ref={badgeRef} className="flex justify-center items-center flex-wrap gap-3 sm:gap-4 lg:gap-6 mb-8 lg:mb-10 max-w-[600px] lg:max-w-none">
            {IMAGES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-30 object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200"
              />
            ))}
          </div> */}

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-white font-black leading-[0.93] tracking-[-0.03em] mt-28"
            style={{ fontSize: "clamp(42px, 9vw, 110px)" }}
          >
            We <span className="italic text-[#7fffd4]">Create</span>
            <br />
            Category Leaders
          </h1>

          {/* Subtitle */}
          <p ref={subRef} className="mt-10 text-[16px] sm:text-[20px] lg:text-[22px] text-white/60 font-semibold">
            on every searchable platform
          </p>
        </div>

        <div ref={badgeRef} className="flex justify-center items-center flex-wrap gap-8 sm:gap-4 lg:gap-10 mb-8 lg:mb-40 max-w-[600px] lg:max-w-none">
            {IMAGES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-20 object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200"
              />
            ))}
          </div>

        {/* ── BOTTOM BAR — two p tags, flex justify-between ── */}
        <div
          ref={bottomRef}
          className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0 px-5 sm:px-8 lg:px-10 py-5 lg:py-6"
        >
          {/* Left */}
          <p className="text-xs sm:text-sm text-white/65 max-w-[280px] sm:max-w-[320px] leading-relaxed">
            Organic media planners creating, distributing & optimising{" "}
            <strong className="text-white font-semibold">search-first</strong>{" "}
            content for SEO, Social, PR, Ai and LLM search
          </p>

          {/* Right */}
          <p className="text-xs sm:text-sm text-white/65 sm:text-right leading-relaxed">
            4 Global Offices serving
            <br />
            <strong className="text-white font-semibold">UK, USA (New York) & EU</strong>
          </p>
        </div>

      </div>
    </>
  );
}