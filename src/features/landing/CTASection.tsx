import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Sparkles,
  GitGraph,
  FileType,
} from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#09090b] shadow-2xl flex flex-col lg:flex-row">
          {/* Top and Bottom gradient borders */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/50 to-cyan-500/0 z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-400/50 to-blue-500/0 z-20"></div>

          {/* Left background noise overlay */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[45%] opacity-[0.25] mix-blend-overlay z-0 pointer-events-none"
            style={{
              backgroundImage: "url('/noise.webp')",
              backgroundSize: "128px 128px",
              backgroundRepeat: "repeat",
            }}
          ></div>

          {/* Left Content */}
          <div className="lg:w-[45%] p-10 sm:p-12 lg:p-20 flex flex-col items-start justify-center text-left relative z-10 shrink-0">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to accelerate your research?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Generate deep insights, mind maps, and structured reports in
              seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/app"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 no-underline text-base md:text-lg group shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                Start researching now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Abstract App UI */}
          <div className="lg:flex-1 relative min-h-[400px] lg:min-h-full bg-white z-10 overflow-hidden flex items-center justify-center p-8 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[120%] lg:-right-4 flex items-center justify-center lg:justify-end">
              {/* Main App Window Illustration */}
              <motion.div
                className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[480px] aspect-[4/3] bg-zinc-50 rounded-2xl shadow-2xl border border-zinc-200/60 overflow-hidden flex flex-col z-10"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              >
                {/* Safari/Browser Header */}
                <div className="h-10 bg-white border-b border-zinc-200/60 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mx-auto h-5 w-48 bg-zinc-100 rounded flex items-center justify-center">
                    <span className="text-[9px] text-zinc-400 font-medium">
                      research.slickspender.com
                    </span>
                  </div>
                  <div className="w-10"></div> {/* Spacer for balance */}
                </div>

                {/* App Interface Body */}
                <div className="flex-1 p-4 md:p-5 flex gap-4 md:gap-5 relative bg-white">
                  {/* Sidebar */}
                  <div className="w-1/3 flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-50/80 border border-blue-100/50 text-blue-600">
                      <Sparkles className="w-4 h-4" />
                      <div className="h-1.5 flex-1 rounded-full bg-blue-200/80"></div>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50 border border-zinc-100/80 text-zinc-400">
                      <GitGraph className="w-4 h-4" />
                      <div className="h-1.5 w-16 rounded-full bg-zinc-200"></div>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50 border border-zinc-100/80 text-zinc-400">
                      <FileType className="w-4 h-4" />
                      <div className="h-1.5 w-12 rounded-full bg-zinc-200"></div>
                    </div>
                  </div>

                  {/* Main Chat/Editor Area */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="h-4 w-32 rounded bg-zinc-800"></div>
                    <div className="space-y-1.5 mt-1 border-l-2 border-zinc-100 pl-3">
                      <div className="h-2 w-full rounded-full bg-zinc-100"></div>
                      <div className="h-2 w-[90%] rounded-full bg-zinc-100"></div>
                      <div className="h-2 w-[80%] rounded-full bg-zinc-100"></div>
                      <div className="h-2 w-[95%] rounded-full bg-zinc-100"></div>
                    </div>

                    <div className="mt-auto pt-2">
                      <div className="flex gap-2 items-center p-2 rounded-lg bg-zinc-50 border border-zinc-200/60 shadow-sm">
                        <div className="h-2 w-24 rounded-full bg-zinc-300 ml-1"></div>
                        <div className="ml-auto w-6 h-6 rounded bg-blue-600 flex items-center justify-center shrink-0">
                          <BrainCircuit className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 1 - Knowledge Graph */}
              <motion.div
                className="absolute z-20 left-4 md:-left-6 lg:-left-12 top-8 lg:top-1/4 bg-white p-3 md:p-4 rounded-xl border border-zinc-200/50 shadow-xl flex items-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <GitGraph className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="h-2.5 w-20 md:w-24 bg-zinc-800 rounded-full mb-1.5 md:mb-2"></div>
                  <div className="h-1.5 md:h-2 w-12 md:w-16 bg-zinc-300 rounded-full"></div>
                </div>
              </motion.div>

              {/* Floating Element 2 - Generated Report */}
              <motion.div
                className="absolute z-20 -right-2 md:right-4 lg:-left-4 bottom-4 md:bottom-8 lg:bottom-1/4 bg-white p-3 md:p-4 rounded-xl border border-zinc-200/50 shadow-xl flex items-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="h-2.5 w-24 md:w-32 bg-zinc-800 rounded-full mb-1.5 md:mb-2"></div>
                  <div className="h-1.5 md:h-2 w-16 md:w-20 bg-zinc-300 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
