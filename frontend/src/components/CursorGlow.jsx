import { useEffect, useRef } from "react";

export const CursorGlow = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let gx = 0, gy = 0, tx = 0, ty = 0, raf;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`;
    };
    const loop = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${gx - 150}px, ${gy - 150}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};
