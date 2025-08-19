import { useEffect, useRef } from "react";
import MEDIA from "../data/media";
import { motion as Motion } from "framer-motion";
import useExclusiveMedia from "../hooks/useExclusiveMedia";

export default function Soundscape() {
  const audioRef = useExclusiveMedia(); // ✅ shared exclusive ref
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const audioCtx = audioCtxRef.current;

    if (!analyserRef.current) {
      analyserRef.current = audioCtx.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    const analyser = analyserRef.current;

    if (!sourceRef.current && audioEl) {
      sourceRef.current = audioCtx.createMediaElementSource(audioEl);
      sourceRef.current.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDark ? "#111827" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let waveHeight =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 3;

      const waves = isDark
        ? [
            { color: "rgba(56,189,248,0.9)", speed: 0.002, amp: 1.0 },
            { color: "rgba(96,165,250,0.8)", speed: 0.0015, amp: 0.7 },
            { color: "rgba(129,140,248,0.7)", speed: 0.001, amp: 0.5 },
          ]
        : [
            { color: "rgba(37,99,235,0.6)", speed: 0.002, amp: 1.0 },
            { color: "rgba(59,130,246,0.5)", speed: 0.0015, amp: 0.7 },
            { color: "rgba(147,197,253,0.4)", speed: 0.001, amp: 0.5 },
          ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x += 10) {
          let y =
            canvas.height / 2 +
            Math.sin(x * 0.02 + Date.now() * wave.speed) *
              (waveHeight * wave.amp);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });
    }

    draw();

    return () => {
      if (sourceRef.current) sourceRef.current.disconnect();
      if (analyser) analyser.disconnect();
    };
  }, []);

  const handlePlay = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  return (
    <section
      id="sounds"
      className="py-20 px-6 bg-green-50 dark:bg-black text-center transition-colors duration-500"
    >
      <Motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        Escape into nature’s echoes
      </Motion.h2>

      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <audio
          ref={audioRef} // ✅ exclusive playback
          controls
          onPlay={handlePlay}
          className="mx-auto w-72 rounded-lg shadow-md
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-white"
        >
          <source src={MEDIA.audioMp3} type="audio/mp3" />
          <source src={MEDIA.audioOgg} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>

        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="mx-auto mt-6 rounded-xl shadow-lg transition-colors duration-500"
        />
      </Motion.div>
    </section>
  );
}
