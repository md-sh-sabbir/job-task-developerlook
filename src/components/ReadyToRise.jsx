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