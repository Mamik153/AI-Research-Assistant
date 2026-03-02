import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Ready to accelerate your research?
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Generate deep insights, mind maps, and structured reports in seconds.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors no-underline text-base"
          >
            Start researching now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
