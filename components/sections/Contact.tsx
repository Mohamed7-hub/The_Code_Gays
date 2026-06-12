"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const BUDGET_OPTIONS = [
  "Less than $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000+",
  "Let's discuss",
];

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "0.85rem 1rem",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  color: "rgba(255,255,255,0.35)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "0.6rem",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", budget: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const borderColor = (field: string) =>
    focused === field ? "rgba(168,255,62,0.5)" : "rgba(255,255,255,0.08)";

  return (
    <section
      id="contact"
      className="relative bg-[#080808] overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#a8ff3e]/5 blur-[120px] pointer-events-none" />

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
          <span>Get in touch</span>
        </motion.div>

        {/* Two column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: "4rem" }}
        >

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Headline */}
            <h2
              className="font-semibold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                marginBottom: "1.5rem",
              }}
            >
              <span className="text-white">Let&apos;s build </span>
              <span style={{ fontFamily: "Magenta", color: "#a8ff3e", fontWeight: 400 }}>
                something
              </span>
              <br />
              <span className="text-white">great </span>
              <span
                style={{
                  fontFamily: "Magenta",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(168,255,62,0.45)",
                  fontWeight: 400,
                }}
              >
                together.
              </span>
            </h2>

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 16,
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                maxWidth: "28rem",
              }}
            >
              Have a project in mind? We&apos;d love to hear about it.
              Drop us a message and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {[
                { label: "Email",        value: SITE.email,              icon: "✉" },
                { label: "Location",     value: SITE.location,           icon: "⊙" },
                { label: "Availability", value: "Open for new projects", icon: "◉" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "1rem 1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                      {item.label}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div className="w-2 h-2 rounded-full bg-[#a8ff3e] animate-pulse" />
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Response time: usually within 24 hours
              </p>
            </div>
          </motion.div>

          {/* ── Right column — form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "2.25rem",
            }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  minHeight: 400,
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(168,255,62,0.1)",
                    border: "1px solid rgba(168,255,62,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#a8ff3e",
                    marginBottom: "0.5rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="text-white font-semibold"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{ color: "#a8ff3e", fontSize: 13, marginTop: "0.5rem", background: "none", border: "none", cursor: "pointer" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Name + Email row */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ gap: "1rem", marginBottom: "1.25rem" }}
                >
                  <div>
                    <label style={LABEL_STYLE}>Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Sadam"
                      style={{ ...INPUT_STYLE, borderColor: borderColor("name") }}
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="you@email.com"
                      style={{ ...INPUT_STYLE, borderColor: borderColor("email") }}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={LABEL_STYLE}>Budget</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {BUDGET_OPTIONS.map((option) => {
                      const selected = form.budget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setForm({ ...form, budget: option })}
                          style={{
                            padding: "0.5rem 1rem",
                            borderRadius: 99,
                            fontSize: 13,
                            fontWeight: selected ? 600 : 400,
                            border: `1px solid ${selected ? "#a8ff3e" : "rgba(255,255,255,0.12)"}`,
                            background: selected ? "#a8ff3e" : "transparent",
                            color: selected ? "#000" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={LABEL_STYLE}>Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your project..."
                    style={{
                      ...INPUT_STYLE,
                      borderColor: borderColor("message"),
                      resize: "none",
                      display: "block",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "1.1rem",
                    background: "#a8ff3e",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 12,
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                    transition: "background 0.2s, transform 0.15s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#8fd42e"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#a8ff3e"; }}
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message →"
                  )}
                </button>

                {status === "error" && (
                  <p style={{ color: "#f87171", fontSize: 12, textAlign: "center", marginTop: "0.75rem" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            © 2025 {SITE.name}. Built with Next.js & ❤️ in {SITE.location}.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#a8ff3e] animate-pulse" />
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
              Available for new projects
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}