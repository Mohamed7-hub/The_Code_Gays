"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";

function FloatingCard({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute card-premium ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const layer1X = useTransform(springX, [-1, 1], [-15, 15]);
  const layer1Y = useTransform(springY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(labelRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(headlineRef.current?.children ?? [],
      { opacity: 0, y: 80, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.18, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#080808]"
      id="home"
    >
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/motion.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#080808]/70" />
      </div>

      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[0%] w-[800px] h-[800px] rounded-full bg-[#a8ff3e]/5 blur-[160px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#a8ff3e]/4 blur-[140px]" />
      </div>

      {/* Floating cards */}
      <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute inset-0 pointer-events-none">

        {/* Card 1 — Available status */}
        <FloatingCard
          delay={1.4}
          className="top-[22%] right-[4%] w-[190px] p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#a8ff3e] animate-pulse" />
            <p className="text-white/70 text-xs font-medium">Available</p>
          </div>
          <p className="text-white/30 text-[11px] leading-relaxed">
            Open for new projects & collaborations
          </p>
        </FloatingCard>

        {/* Card 2 — Latest build progress */}
        <FloatingCard
          delay={1.6}
          className="bottom-[25%] right-[4%] w-[210px] p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#a8ff3e]/15 border border-[#a8ff3e]/20 flex items-center justify-center">
              <span className="text-[#a8ff3e] text-xs">⚡</span>
            </div>
            <div>
              <p className="text-white/75 text-xs font-medium">Latest Build</p>
              <p className="text-white/30 text-[10px]">Full Stack App</p>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ delay: 2.5, duration: 1.8, ease: "easeOut" }}
              className="h-full bg-[#a8ff3e] rounded-full"
            />
          </div>
          <p className="text-white/25 text-[10px] mt-1.5">72% complete</p>
        </FloatingCard>

      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container-main w-full pb-20" style={{ paddingTop: "calc(var(--navbar-height, 80px) + 5rem)" }}>

        {/* Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-4 mb-14"
          style={{ opacity: 0 }}
        >
          <div className="w-12 h-px bg-[#a8ff3e]" />
          <span className="text-[#a8ff3e] text-xs tracking-[5px] uppercase font-medium">
            [01] Full Stack Development Studio
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="max-w-5xl mb-10">
          <div style={{ opacity: 0, paddingBottom: "0.2em" }}>
            <span
              className="text-white font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              We build{" "}
            </span>
            <span
              style={{
                fontFamily: "Magenta",
                color: "#a8ff3e",
                fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
              }}
            >
              digital
            </span>
          </div>

          <div style={{ opacity: 0, paddingBottom: "0.2em" }}>
            <span
              className="text-white font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              products for
            </span>
          </div>

          <div style={{ opacity: 0, paddingBottom: "0.2em" }}>
            <span
              style={{
                fontFamily: "Magenta",
                fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(168,255,62,0.6)",
              }}
            >
              ambitious{" "}
            </span>
            <span
              className="text-white font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              people.
            </span>
          </div>
        </div>

        {/* Subtext */}
        <p
          ref={subRef}
          className="text-white/40 text-xl leading-relaxed max-w-xl"
          style={{ opacity: 0, marginBottom: "2.5rem" }}
        >
          Web apps, mobile apps, and APIs — built end to end by{" "}
          <span className="text-white/75">Sadam & Copra</span>, based in{" "}
          <span className="text-white/75">Kampala, Uganda</span>.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex items-center gap-5 flex-wrap"
          style={{ opacity: 0, marginBottom: "4rem" }}
        >
          <a href="#projects" className="btn-primary text-base px-8 py-4">
            View our work →
          </a>
          <a href="#contact" className="btn-outline text-base px-8 py-4">
            Start a project
          </a>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="flex items-center flex-wrap"
          style={{ opacity: 0, gap: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "2",    label: "Developers" },
            { value: "10+",  label: "Projects built" },
            { value: "3+",   label: "Years experience" },
            { value: "100%", label: "Passion driven" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center" style={{ gap: "2rem" }}>
              <div>
                <p
                  className="text-white font-semibold leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.2rem, 2.4vw, 2.5rem)",
                    marginBottom: "0.1rem",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-white/30 text-xs tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
              {i < 3 && (
                <div style={{ width: "1px", height: "3rem", background: "rgba(255,255,255,0.06)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}