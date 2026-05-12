import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    bg: "#000000",
    textColor: "white",
    title: "Pioneers",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop",
    desc1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    desc2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
  },
  {
    bg: "#B2F6E3",
    textColor: "#000000",
    title: "Innovators",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop",
    desc1: "We don't follow playbooks — we write them. Every campaign is a chance to redefine what's possible in search and social, pushing boundaries that others are afraid to cross.",
    desc2: "Our work doesn't just perform. It sets the standard that the rest of the industry scrambles to catch up to.",
  },
  {
    bg: "#FFFFFF",
    textColor: "#000000",
    title: "Visionaries",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop",
    desc1: "We see what others can't yet imagine. Our strategies are built for where culture and search are heading — not where they've been.",
    desc2: "We're shaping the next decade of digital marketing, one bold move at a time.",
  },
];

const ScrollCard = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null); // store timeline reference

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    const initialRotations = [6, -4, 2];
    const initialY = [30, 15, 0];

    cards.forEach((card, i) => {
      gsap.set(card, {
        rotation: initialRotations[i],
        y: initialY[i],
        transformOrigin: "center center",
        zIndex: cardData.length - i,
      });
    });

    // Store timeline so we can kill only this one on cleanup
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const tl = tlRef.current;

    tl.to(cards[0], {
      y: -1000,
      rotation: -15,
      duration: 1,
      ease: "power2.inOut",
    }, 0);

    tl.to(cards[1], {
      rotation: 0,
      y: 0,
      duration: 0.6,
      ease: "power1.out",
    }, 0.3);

    tl.to(cards[1], {
      y: -1000,
      rotation: 12,
      duration: 1,
      ease: "power2.inOut",
    }, 1.1);

    tl.to(cards[2], {
      rotation: 0,
      y: 0,
      duration: 0.8,
      ease: "power1.out",
    }, 0.8);

    tl.to(cards[2], {
      y: -1000,
      rotation: -10,
      duration: 1,
      ease: "power2.inOut",
    }, 2);

    return () => {
      // Kill ONLY this component's ScrollTrigger, not all of them
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#EFEEEC" }}
    >
      <p className="text-center text-3xl font-roboto font-bold mb-20 tracking-widest">
        Legacy In The Making
      </p>

      <div className="relative w-[560px] h-[560px]">
        {cardData.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute inset-0 rounded-3xl flex flex-col items-center justify-start pt-10 px-8 pb-8 shadow-2xl"
            style={{ backgroundColor: card.bg, color: card.textColor }}
          >
            <div className="w-40 h-44 rounded-2xl overflow-hidden mb-6 shadow-lg">
              <img src={card.image} alt="" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-5xl font-bold my-4 text-center" style={{ color: card.textColor }}>
              {card.title}
            </h2>

            <p className="text-sm text-center leading-relaxed mb-3 opacity-80" style={{ color: card.textColor }}>
              {card.desc1}
            </p>
            <p className="text-sm text-center leading-relaxed opacity-80" style={{ color: card.textColor }}>
              {card.desc2}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollCard;