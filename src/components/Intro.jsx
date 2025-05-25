import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';


const Intro = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000), // After 3s, show paragraph
      setTimeout(() => setStep(2), 6000), // After 6s, fade out
      setTimeout(() => onFinish(), 7000), // Fully transition at 7s
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

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
            className="text-sm mt-4 text-gray-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Loading your experience...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;
