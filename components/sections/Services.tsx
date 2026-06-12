"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      className="relative bg-[#080808] overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#a8ff3e]/4 blur-[130px] pointer-events-none" />

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
          <span>What we do</span>
        </motion.div>

        {/* Heading row */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between"
          style={{ gap: "1.5rem", marginBottom: "4rem" }}
        >
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
            <span className="text-white">Our </span>
            <span style={{ fontFamily: "Magenta", color: "#a8ff3e", fontWeight: 400 }}>
              services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm max-w-xs leading-relaxed lg:text-right"
          >
            End-to-end development — from idea to deployed product.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {SERVICES.map((service, i) => {
            const isOpen = activeIndex === i;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className="w-full text-left group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.75rem 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    gap: "1.5rem",
                  }}
                >
                  {/* Left side */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1 }}>

                    {/* Number */}
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.2)",
                        width: 28,
                        flexShrink: 0,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isOpen ? "rgba(168,255,62,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isOpen ? "rgba(168,255,62,0.25)" : "rgba(255,255,255,0.08)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                        transition: "background 0.3s, border-color 0.3s",
                      }}
                    >
                      {service.icon}
                    </div>

                    {/* Title */}
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 500,
                        color: isOpen ? "#fff" : "rgba(255,255,255,0.7)",
                        transition: "color 0.3s",
                      }}
                    >
                      {service.title}
                    </span>
                  </div>

                  {/* Right — +/× button */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: `1px solid ${isOpen ? "rgba(168,255,62,0.4)" : "rgba(255,255,255,0.12)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#a8ff3e" : "rgba(255,255,255,0.4)",
                      fontSize: 18,
                      flexShrink: 0,
                      transition: "border-color 0.3s, color 0.3s",
                    }}
                  >
                    +
                  </motion.div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingBottom: "1.75rem", paddingLeft: "calc(28px + 36px + 3rem)" }}>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.45)",
                            fontSize: 14,
                            lineHeight: 1.75,
                            maxWidth: "36rem",
                            marginBottom: "1rem",
                          }}
                        >
                          {service.description}
                        </p>
                        <motion.a
                          href="#contact"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            color: "#a8ff3e",
                            fontSize: 13,
                            fontWeight: 500,
                            textDecoration: "none",
                          }}
                        >
                          Get in touch →
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative overflow-hidden"
          style={{
            marginTop: "5rem",
            borderRadius: 16,
            border: "1px solid rgba(168,255,62,0.15)",
            background: "rgba(168,255,62,0.04)",
            padding: "2.5rem 3rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 300,
              height: 100,
              background: "rgba(168,255,62,0.08)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div>
            <h3
              className="text-white font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                marginBottom: "0.5rem",
              }}
            >
              Have a project in mind?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
              We&apos;re open to new work — let&apos;s build something great together.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.9rem 2rem",
              background: "#a8ff3e",
              color: "#000",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 99,
              textDecoration: "none",
              flexShrink: 0,
              transition: "background 0.2s, transform 0.15s",
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
            Start a project →
          </a>
        </motion.div>

      </div>
    </section>
  );
}