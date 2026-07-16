import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "./Logo";

export const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 22 + 12;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(onDone, 420);
      }
      setProgress(p);
    }, 95);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      data-testid="premium-loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#0B1220" }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="loader-glow" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <LogoMark size={72} dark animated />
      </motion.div>
      <div className="mt-10 w-52 h-[2px] rounded-full bg-white/10 overflow-hidden relative z-10">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg,#2563EB,#60A5FA)",
            boxShadow: "0 0 16px rgba(37,99,235,0.8)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.25 }}
        />
      </div>
      <p className="mt-4 font-numbers text-xs tracking-[0.3em] text-slate-400 relative z-10">
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
};
