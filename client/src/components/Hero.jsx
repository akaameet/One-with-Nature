import MEDIA from "../data/media";
import { motion as Motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="nature" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={MEDIA.heroVideo} type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center bg-black/40">
        <Motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          Become One With Nature
        </Motion.h1>
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-4 text-lg max-w-xl"
        >
          Discover harmony through music, video, and the beauty of the earth.
        </Motion.p>
      </div>
    </section>
  );
}
