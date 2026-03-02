import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Research Assistant & Deep Report Generator
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Transform simple text prompts into comprehensive, structured markdown reports. Automatically generate interactive mind maps, data visualizations, and deep insights to accelerate your workflow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors no-underline text-base"
          >
            Start researching
          </Link>
        </motion.div>
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
