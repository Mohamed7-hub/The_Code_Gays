"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Copra",
    initials: "CO",
    role: "Full Stack Developer",
    focus: "Backend · APIs · Database",
    tags: ["BACKEND", "APIS", "DATABASE"],
    bio: "Architects the systems that power the frontend. Clean code, solid foundations, and scalable infrastructure design.",
  },
  {
    name: "Sadam",
    initials: "SA",
    role: "Full Stack Developer",
    focus: "Frontend · Mobile · UI/UX",
    tags: ["FRONTEND", "MOBILE", "UI/UX"],
    bio: "Builds interfaces people love using. React, Flutter, and everything in between. Focuses on seamless interactions and polished styling.",
  },
];

function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="card-premium group relative overflow-hidden p-6 sm:p-8"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a8ff3e]/0 to-[#a8ff3e]/0 group-hover:from-[#a8ff3e]/4 group-hover:to-transparent transition-all duration-700 rounded-2xl pointer-events-none" />

      {/* Avatar + index number row */}
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-14 h-14 rounded-full border-2 border-[#a8ff3e]/30 flex items-center justify-center bg-[#a8ff3e]/10">
            <span
              className="text-[#a8ff3e] text-base font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {member.initials}
            </span>
          </div>
          {/* Online dot */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#a8ff3e] border-2 border-[#111]" />
        </div>
        <span
          className="text-white/6 text-5xl font-bold select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-white text-2xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {member.name}
      </h3>

      {/* Skill tags */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        {member.tags.map((tag, i) => (
          <span key={tag} className="flex items-center gap-1.5">
            <span className="text-[#a8ff3e] text-[10px] tracking-[2px] font-semibold uppercase">
              {tag}
            </span>
            {i < member.tags.length - 1 && (
              <span className="text-white/20 text-[10px]">•</span>
            )}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-white/45 text-sm leading-relaxed mb-6">{member.bio}</p>

      {/* Footer */}
      <div className="pt-5 border-t border-white/5">
        <p className="text-white/20 text-[11px] tracking-[3px] uppercase">{member.role}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-heading",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" }
        }
      );
      gsap.fromTo(".about-para",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".about-para", start: "top 85%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#a8ff3e]/3 blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="container-main">

        {/* Section label */}
        <div className="section-label"
          style={{ marginBottom: "4rem" }}>
          <span>About us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12 lg:gap-20">

          {/* ── Left column ── */}
          <div>
            <h2
              className="about-heading font-semibold"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, marginBottom: "2.5rem" }}
            >
              <span className="text-white">Two devs.</span>
              <br />
              <span style={{ fontFamily: "Magenta", color: "#a8ff3e" }}>
                One mission.
              </span>
            </h2>

            <p className="about-para text-white/50 text-lg leading-relaxed"
              style={{ marginBottom: "1.5rem" }}>
              We&apos;re{" "}
              <span className="text-white font-medium">Copra & Sadam</span> — a
              two-person full stack studio from{" "}
              <span className="text-white font-medium">Kampala, Uganda</span>. We
              design and build digital products end to end, from database to
              screen.
            </p>

            <p className="about-para text-white/50 text-lg leading-relaxed"
              style={{ marginBottom: "3rem" }}>
              No handoffs. No bloat. Just clean, working products built with
              modern technology and relentless attention to detail.
            </p>

            {/* Trait pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ marginBottom: "3rem" }}>
              {[
                { icon: "⚡", label: "Fast delivery",     iconBg: "rgba(234,179,8,0.15)"   },
                { icon: "🎯", label: "Pixel perfect",     iconBg: "rgba(236,72,153,0.15)"  },
                { icon: "🔒", label: "Secure & scalable", iconBg: "rgba(249,115,22,0.15)"  },
                { icon: "🤝", label: "Client focused",    iconBg: "rgba(234,179,8,0.12)"   },
              ].map((item) => (
                <div
                  key={item.label}
                  className="card-premium flex items-center gap-3"
                  style={{ padding: "0.875rem 1.25rem" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: item.iconBg }}
                  >
                    <span className="text-base leading-none">{item.icon}</span>
                  </div>
                  <span className="text-white/65 text-sm font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a8ff3e] animate-pulse" />
              <span className="text-white/30 text-sm">
                Based in {SITE.location} — building for everywhere
              </span>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card-premium border-l-2 border-l-[#a8ff3e] p-6 sm:p-8"
            >
              <p className="text-white/55 text-base leading-relaxed italic">
                &quot;We&apos;re still early in our journey, but we build with the
                same standards as teams 10x our size. Every project is a chance
                to prove what two focused developers can do.&quot;
              </p>
              <p className="text-[#a8ff3e] text-xs mt-5 tracking-[3px] uppercase font-medium">
                — Sadam & Copra
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}