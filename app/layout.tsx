import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thecodeguys — Full Stack Development Studio",
  description:
    "Sadam & Copra. A two-person full stack studio building modern web apps, mobile apps, and APIs.",
  keywords: ["full stack", "web development", "mobile apps", "React", "Next.js", "Flutter", "Uganda"],
  authors: [{ name: "Thecodeguys" }],
  openGraph: {
    title: "Thecodeguys",
    description: "Full Stack Development Studio — Sadam & Copra",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}