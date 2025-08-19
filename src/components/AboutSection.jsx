import { motion as Motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          About
        </Motion.h2>
        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          Nature is more than scenery—it’s a way of life. Our mission is to
          inspire deeper connections through immersive media experiences.
        </Motion.p>
      </div>
    </section>
  );
}
