"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  "in-progress": { label: "In Progress", color: "#ff9f3e", bg: "rgba(255,159,62,0.12)" },
  live:          { label: "Live",         color: "#a8ff3e", bg: "rgba(168,255,62,0.12)" },
  completed:     { label: "Completed",    color: "#3effdc", bg: "rgba(62,255,220,0.12)" },
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_STYLES[project.status] || STATUS_STYLES["in-progress"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(168,255,62,0.18)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 40px rgba(168,255,62,0.06)" : "none",
      }}
    >
      {/* Top green sweep line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "#a8ff3e",
          transformOrigin: "left",
        }}
      />

      {/* Hover glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(168,255,62,0.04) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
          borderRadius: 16,
        }}
      />

      {/* Card body */}
      <div
        style={{
          padding: "2.25rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header: number + status */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3.25rem",
              fontWeight: 700,
              lineHeight: 1,
              color: "rgba(255,255,255,0.07)",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 99,
              background: status.bg,
              color: status.color,
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: status.color,
                flexShrink: 0,
              }}
            />
            {status.label}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: hovered ? "#a8ff3e" : "#fff",
            marginBottom: "1rem",
            transition: "color 0.3s",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.75,
            marginBottom: "2rem",
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: "2rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 99,
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
            {project.year}
          </span>
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#a8ff3e",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            View project <span>→</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[#080808] overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#a8ff3e]/4 blur-[120px] pointer-events-none" />

      <div className="container-main">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
          style={{ marginBottom: "1.5rem" }}
        >
          <span>Our work</span>
        </motion.div>

        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between"
          style={{ gap: "1.5rem", marginBottom: "4rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-semibold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            <span className="text-white">Selected </span>
            <span style={{ fontFamily: "Magenta", color: "#a8ff3e", fontWeight: 400 }}>
              projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm max-w-xs leading-relaxed lg:text-right"
          >
            Real products we&apos;ve built or are currently building.
            Every project ships with purpose.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ gap: "1.5rem", marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/35 text-sm">
            More projects coming soon — we&apos;re always building.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "1rem 2rem",
              background: "#a8ff3e",
              color: "#000",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 99,
              transition: "background 0.2s, transform 0.15s",
              textDecoration: "none",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#8fd42e";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#a8ff3e";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            Start a project with us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}