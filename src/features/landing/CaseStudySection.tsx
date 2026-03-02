import { motion } from "motion/react";

interface IsoPillarProps {
  height: number;
  color: string;
  maxH?: number;
  label: string;
  subLabel: string;
  delay: number;
}

const IsoPillar = ({
  height,
  color,
  maxH = 200,
  label,
  subLabel,
  delay,
}: IsoPillarProps) => {
  return (
    <motion.div
      className="flex flex-col items-center relative z-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
    >
      <div className="absolute -top-20 text-center w-full">
        <span
          className="text-5xl lg:text-6xl font-black tracking-tighter"
          style={{ color: "#FFF", textShadow: `0 4px 24px ${color}80` }}
        >
          {label}
        </span>
      </div>

      <svg
        width="140"
        height={maxH + 70}
        viewBox={`0 0 120 ${maxH + 70}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible mt-2"
      >
        <path
          d={`M60 ${maxH + 45} L110 ${maxH + 15} L60 ${maxH - 15} L10 ${maxH + 15} Z`}
          fill="black"
          fillOpacity="0.4"
          filter="blur(8px)"
        />
        <path
          d={`M0 ${maxH - height} L60 ${maxH - height + 35} L60 ${maxH + 35} L0 ${maxH} Z`}
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d={`M60 ${maxH - height + 35} L120 ${maxH - height} L120 ${maxH} L60 ${maxH + 35} Z`}
          fill={color}
          fillOpacity="0.8"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d={`M60 ${maxH - height - 35} L120 ${maxH - height} L60 ${maxH - height + 35} L0 ${maxH - height} Z`}
          fill={color}
          fillOpacity="1"
          stroke="#fff"
          strokeWidth="2"
          strokeOpacity="0.9"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-6 text-center max-w-[160px]">
        <span className="text-gray-200 text-base font-semibold capitalize">
          {subLabel}
        </span>
      </div>
    </motion.div>
  );
};

export function CaseStudySection() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-black border-t border-white/5">
      {/* Optional radiant blur in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Text Content Area */}
          <div className="lg:col-span-5 relative z-20">
            <motion.div
              className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Case Study
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              How teams use SlickResearch
            </motion.h2>

            <motion.div
              className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <svg
                className="absolute top-6 left-6 w-8 h-8 text-blue-500/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 relative z-10 mt-6 font-medium">
                SlickResearch turns hours of reading into instant, visual
                reports. I get structured markdown, interactive mind maps, and
                deep insights from a single prompt. It's completely transformed
                how I analyze complex topics.
              </blockquote>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Academic Researcher
                  </p>
                  <p className="text-blue-400 text-sm font-medium">
                    Independent Analyst
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Isometric Graph Area */}
          <div className="lg:col-span-7">
            <motion.div
              className="relative rounded-[40px] border border-white/10 bg-white/[0.02] overflow-hidden min-h-[500px] flex items-end justify-center pb-20 pt-32"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Isometric Grid Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_100%)] z-10 pointer-events-none" />
                <svg
                  className="absolute inset-0 w-full h-full opacity-40 text-blue-500/20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="iso-grid"
                    width="120"
                    height="69.28"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(0, 34.64)"
                  >
                    <path
                      d="M60 0 L120 34.64 L60 69.28 L0 34.64 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#iso-grid)" />
                </svg>
              </div>

              {/* Pillars */}
              <div className="relative z-20 flex flex-row items-end justify-center gap-12 sm:gap-16 lg:gap-24">
                <IsoPillar
                  height={120}
                  color="#3B82F6"
                  maxH={200}
                  label="1"
                  subLabel="unified workflow"
                  delay={0.4}
                />
                <IsoPillar
                  height={220}
                  color="#8B5CF6"
                  maxH={200}
                  label="10x"
                  subLabel="faster analysis"
                  delay={0.6}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
