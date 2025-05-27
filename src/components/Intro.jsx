import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';


const Intro = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000), // After 3s, show paragraph
      setTimeout(() => setStep(2), 6000), // After 6s, fade out
      setTimeout(() => onFinish(), 7000), // Fully transition at 7s
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // increase speed here (e.g., +5 is faster)
      });
    }, 100); // controls speed of updates

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="flex items-center justify-center w-full h-screen bg-black">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h1
            key="title"
            className="font-mono text-white text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to LooksMapping
          </motion.h1>
        )}

        {step === 1 && (
          <motion.p
            key="loading"
            className="text-sm mt-4 text-cyan-300 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Loading your experience...
          
          <motion.span
          key="progress"
          className="block text-sm mt-2 text-cyan-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {progress}%
        </motion.span>
        </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;
