import { motion } from "motion/react";

export function CaseStudySection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          How teams use SlickResearch
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <blockquote className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-6">
            &ldquo;SlickResearch turns hours of reading into instant, visual reports. I get structured markdown, interactive mind maps, and deep insights from a single prompt. It's completely transformed how I analyze complex topics.&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="font-medium text-white">Academic Researcher</p>
              <p className="text-gray-500 text-sm">Independent Analyst</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6">
            <div>
              <p className="text-2xl font-bold text-white">10x</p>
              <p className="text-gray-500 text-sm">faster analysis</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-gray-500 text-sm">unified workflow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
