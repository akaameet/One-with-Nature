import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import MEDIA from "../data/media";
import { motion as Motion } from "framer-motion";
import "../App.css";

export default function Gallery() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="gallery" className="py-20 px-6 text-center bg-white dark:bg-black">
      <Motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        Nature Gallery
      </Motion.h2>

      <div className="relative max-w-4xl mx-auto perspective-container group">
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Keyboard]}
          effect="coverflow"
          centeredSlides
          slidesPerView={3}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="w-full"
        >
          {MEDIA.gallery.map((item, i) => (
            <SwiperSlide key={i} className="slide-item">
              <img
                src={item.src}
                alt={item.alt || `Gallery ${i}`}
                className="slide-img rounded-xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                        flex justify-center gap-6 mt-6 absolute left-0 right-0 z-20">
          <button ref={prevRef} className="custom-prev custom-arrow" aria-label="Previous slide">
            ‹
          </button>
          <button ref={nextRef} className="custom-next custom-arrow" aria-label="Next slide">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
