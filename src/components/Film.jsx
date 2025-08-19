import MEDIA from "../data/media";
import { motion as Motion } from "framer-motion";
import useExclusiveMedia from "../hooks/useExclusiveMedia"; 

export default function Film() {
  const videoRef = useExclusiveMedia(); // ✅ assign hook result to ref

  return (
    <section id="film" className="py-20 px-6 text-center bg-gray-50 dark:bg-black">
      <Motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        Find Your Way Film
      </Motion.h2>
      <Motion.video
        ref={videoRef} // ✅ attach hook ref here
        controls
        poster={MEDIA.thumbnail}
        className="w-full max-w-3xl mx-auto rounded-xl shadow-lg 
                   bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <source src={MEDIA.herovlog} type="video/mp4" />
      </Motion.video>
    </section>
  );
}
