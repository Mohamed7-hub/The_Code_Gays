"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Tech icons as SVG paths — using recognizable brand shapes
const TECH_ICONS: Record<string, string> = {
  React:        "M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-13C6.5.5 2 5.3 2 11.2c0 3.4 1.7 6.4 4.3 8.3L12 24l5.7-4.5C20.3 17.6 22 14.6 22 11.2 22 5.3 17.5.5 12 .5z",
  "Next.js":    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
  TypeScript:   "M3 3h18v18H3V3zm10.5 12.5v-2h-2v-1.5h2v-2h1.5v2h2v1.5h-2v2h-1.5zM7 13h3.5v1.5H7V17H5.5v-7H10v1.5H7V13z",
  "Tailwind CSS":"M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.37 10.82 14.59 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.63 7.18 14.41 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.37 16.82 9.59 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.63 13.18 9.41 12 7 12z",
  Flutter:      "M12.956 0L5.5 7.456l2.544 2.544L18 0h-5.044zM5.5 12.956L12.956 20.5H18l-7.456-7.544L13.088 10.5 5.5 10.412v2.544z",
  "React Native":"M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z",
  "Node.js":    "M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.69 16.6c-.07-.04-.12-.12-.12-.2V7.71c0-.08.04-.16.12-.2l7.44-4.29c.07-.04.16-.04.24 0l7.44 4.29c.08.04.12.12.12.2v8.68c0 .08-.04.16-.12.2l-7.44 4.29c-.07.04-.17.04-.24 0l-1.92-1.12c-.06-.04-.14-.05-.2-.02-.53.3-.63.34-1.13.51-.12.04-.31.11.07.32l2.49 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2z",
  Java:         "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
  GraphQL:      "M12 2.25l-8.5 4.9v9.72l8.5 4.9 8.5-4.9V7.15L12 2.25zm0 1.5l7 4.04v8.42l-7 4.04-7-4.04V7.79l7-4.04zM8.5 9.25v5.5l3.5 2 3.5-2v-5.5l-3.5-2-3.5 2z",
  "REST APIs":  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  Supabase:     "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.59.736 13.5 1.43 13.5H12.5V22.964c.015.986 1.26 1.41 1.874.637l9.262-11.651c.434-.54.028-1.45-.665-1.45H12V1.036z",
  Firebase:     "M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z",
  MySQL:        "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.047-.147-.072-.182-.151M5.86 12.172c-.068-.005-.136-.006-.204-.006-.13 0-.258.01-.387.02h.045c-.048.077-.09.16-.09.26.008.162.2.284.337.284.16.01.32-.015.404-.165.044-.075.06-.16.06-.248 0-.144-.068-.268-.165-.145M16.51 11.65c-.11.42-.285.804-.477 1.196l1.148-1.248zm-5.14.434c-.204.04-.378.122-.519.256-.14.134-.21.295-.21.478 0 .205.102.396.282.532.175.135.408.2.67.2.26 0 .484-.065.645-.2.16-.136.243-.328.243-.532 0-.19-.083-.36-.245-.487-.162-.127-.39-.2-.666-.247zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  PostgreSQL:   "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  Figma:        "M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4C1.792 4 0 5.792 0 8s1.792 4 4 4h4V4zm4 0v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4zm4 16c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v4c0 2.208 1.792 4 4 4zM8 12c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z",
  Vercel:       "M24 22.525H0l12-21.05 12 21.05z",
  Docker:       "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z",
  "CI/CD":      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

const BENTO_DATA = [
  {
    id: "frontend",
    title: "Frontend",
    desc: "Architecting responsive, accessible, and highly interactive user interfaces.",
    color: "#a8ff3e",
    icon: "🖥",
    techs: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    layout: "logo-grid", // shows big logo cards
    gridArea: "frontend",
  },
  {
    id: "backend",
    title: "Backend",
    desc: "Robust server-side logic and scalable API engineering.",
    color: "#ff9f3e",
    icon: "⚡",
    techs: [
      { name: "Node.js",   level: 90 },
      { name: "Java",      level: 75 },
      { name: "GraphQL",   level: 80 },
      { name: "REST APIs", level: 95 },
    ],
    layout: "progress", // shows progress bars
    gridArea: "backend",
  },
  {
    id: "database",
    title: "Data & Cloud",
    desc: "Scalable infrastructure and persistent storage.",
    color: "#be3eff",
    icon: "🗄",
    techs: [
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
    ],
    layout: "tags",
    gridArea: "database",
  },
  {
    id: "mobile",
    title: "Mobile",
    desc: "Cross-platform native experiences.",
    color: "#3effdc",
    icon: "📱",
    techs: [
      { name: "Flutter",      level: 85 },
      { name: "React Native", level: 80 },
    ],
    layout: "progress",
    gridArea: "mobile",
  },
  {
    id: "design",
    title: "Design",
    desc: "Pixel-perfect visuals and user experience.",
    color: "#ff3e8a",
    icon: "✦",
    techs: [
      { name: "Figma" },
      { name: "UI/UX" },
      { name: "Wireframing" },
    ],
    layout: "tags",
    gridArea: "design",
  },
  {
    id: "devops",
    title: "DevOps",
    desc: "Smooth deployments and automated workflows.",
    color: "#3e8aff",
    icon: "🚀",
    techs: [
      { name: "Vercel" },
      { name: "Docker" },
      { name: "CI/CD" },
    ],
    layout: "tags",
    gridArea: "devops",
  },
];

function TechLogoCard({ name, color }: { name: string; color: string }) {
  const path = TECH_ICONS[name];
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1rem 0.75rem",
        minWidth: "80px",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {path ? (
          <svg viewBox="0 0 24 24" width="28" height="28" fill={color} opacity={0.85}>
            <path d={path} />
          </svg>
        ) : (
          <span style={{ color, fontSize: 22, fontWeight: 700 }}>{name[0]}</span>
        )}
      </div>
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.03em" }}>
        {name}
      </span>
    </motion.div>
  );
}

function ProgressBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{name}</span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: color, opacity: level > 85 ? 1 : 0.45 }}
        />
      </div>
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ height: "100%", background: color, borderRadius: 99 }}
        />
      </div>
    </div>
  );
}

function TagList({ techs, color }: { techs: { name: string }[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 mt-auto">
      {techs.map((t) => (
        <span
          key={t.name}
          style={{
            background: color + "12",
            border: `1px solid ${color}25`,
            color: "rgba(255,255,255,0.55)",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 12,
            letterSpacing: "0.02em",
          }}
        >
          {t.name}
        </span>
      ))}
    </div>
  );
}

function BentoCard({ card, index }: { card: (typeof BENTO_DATA)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden flex flex-col p-5 sm:p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? card.color + "30" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 0 40px ${card.color}10` : "none",
        minHeight: card.layout === "logo-grid" ? 220 : card.layout === "progress" && card.techs.length > 3 ? 200 : 160,
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: card.color,
          opacity: hovered ? 0.06 : 0.03,
          filter: "blur(40px)",
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: card.color + "15",
            border: `1px solid ${card.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          <span style={{ color: card.color }}>{card.icon}</span>
        </div>
        <h3
          className="font-semibold text-white"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
        >
          {card.title}
        </h3>
      </div>

      {/* Desc */}
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.55, marginBottom: "1rem" }}>
        {card.desc}
      </p>

      {/* Content by layout type */}
      {card.layout === "logo-grid" && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {card.techs.map((t) => (
            <TechLogoCard key={t.name} name={t.name} color={card.color} />
          ))}
        </div>
      )}

      {card.layout === "progress" && (
        <div className="mt-auto">
          {card.techs.map((t) => (
            <ProgressBar key={t.name} name={t.name} level={(t as any).level ?? 80} color={card.color} />
          ))}
        </div>
      )}

      {card.layout === "tags" && (
        <TagList techs={card.techs} color={card.color} />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      id="skills"
      className="relative section-padding bg-[#080808] overflow-hidden"
    >
      {/* Ambient bg glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#a8ff3e]/4 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#be3eff]/4 blur-[150px] pointer-events-none" />

      <div className="container-main">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-6"
        >
          <span>Skills</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h2
            className="text-white font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Technical Arsenal
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/35 text-base leading-relaxed mb-14 max-w-lg"
        >
          A comprehensive breakdown of the tools, languages, and frameworks utilized to
          construct high-performance, scalable digital experiences.
        </motion.p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Frontend — wide left */}
          <div className="lg:col-start-1 lg:row-start-1">
            <BentoCard card={BENTO_DATA[0]} index={0} />
          </div>

          {/* Backend — tall right (spans 2 rows) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <BentoCard card={BENTO_DATA[1]} index={1} />
          </div>

          {/* Data & Cloud — wide left row 2 */}
          <div className="lg:col-start-1 lg:row-start-2">
            <BentoCard card={BENTO_DATA[2]} index={2} />
          </div>

          {/* Mobile — right row 3 */}
          <div className="lg:col-start-2 lg:row-start-3">
            <BentoCard card={BENTO_DATA[3]} index={3} />
          </div>

          {/* Design & DevOps — left row 3 */}
          <div className="lg:col-start-1 lg:row-start-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BentoCard card={BENTO_DATA[4]} index={4} />
            <BentoCard card={BENTO_DATA[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}