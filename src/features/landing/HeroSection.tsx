import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArchitectureIllustration } from "./ArchitectureIllustration";

export function HeroSection() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-10 overflow-hidden px-4 sm:px-6 min-h-[90vh] flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Research Assistant & Deep Report Generator
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Transform simple text prompts into comprehensive, structured markdown
          reports. Automatically generate interactive mind maps, data
          visualizations, and deep insights to accelerate your workflow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition-all no-underline"
          >
            Start researching
          </Link>
        </motion.div>
      </div>

      <div className="w-full mt-8 flex-grow">
        <ArchitectureIllustration />
      </div>

      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,#000_60%,transparent_110%)] pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
