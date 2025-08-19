import { useEffect, useRef } from "react";

export default function useExclusiveMedia() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function pauseOthers() {
      document.querySelectorAll("audio, video").forEach((media) => {
        if (media !== el) {
          media.pause();
        }
      });
    }

    el.addEventListener("play", pauseOthers);
    return () => el.removeEventListener("play", pauseOthers);
  }, []);

  return ref;
}
