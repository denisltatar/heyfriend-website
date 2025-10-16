"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Orb from "./Orb";

export default function IPhoneMockup() {
  const [isListening, setIsListening] = useState(false);
  return (
    <motion.div
      className="relative"
      initial={{ rotate: -20, y: 40 }}
      animate={{ 
        rotate: [5, 2, 5], 
        y: [40, 35, 40] 
      }}
      transition={{ 
        duration: 4, 
        ease: "easeInOut", 
        repeat: Infinity 
      }}
    >
      {/* iPhone Frame */}
      <div className="relative w-70 sm:w-80 h-[570px] sm:h-[600px] bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-amber-50 rounded-[2.5rem] overflow-hidden relative">
          {/* Screen Content */}
          <div className="absolute inset-0 flex items-start justify-center pt-30">
            <Orb />
          </div>
          
          {/* AI Response Bubble */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              className="absolute top-74 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-slate-200"
            >
              <p className="text-sm text-slate-700 leading-relaxed">
                {"I hear you, that can be a difficult situation. Here's how I can help..."}
              </p>
            </motion.div>
          )}
          
          {/* Mic Button */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            {/* Large pulsing ring around mic - Desktop only */}
<motion.div
  className="hidden md:hidden lg:hidden xl:block absolute inset-0 w-20 h-20 rounded-full border-2 border-amber-400/30 -m-3"
  animate={{ 
    scale: [1, 1.3, 1],
    opacity: [0.3, 0.1, 0.3]
  }}
  transition={{ 
    duration: 3, 
    ease: "easeInOut", 
    repeat: Infinity 
  }}
/>

{/* Medium pulsing ring - Desktop only */}
<motion.div
  className="hidden md:hidden lg:hidden xl:block absolute inset-0 w-16 h-16 rounded-full border-2 border-amber-400/40 -m-1"
  animate={{ 
    scale: [1, 1.15, 1],
    opacity: [0.4, 0.2, 0.4]
  }}
  transition={{ 
    duration: 2, 
    ease: "easeInOut", 
    repeat: Infinity,
    delay: 0.5
  }}
/>

            
            <motion.button
              className="relative w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-lg border-2 border-amber-600/50 flex items-center justify-center hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsListening(!isListening)}
            >
              <svg 
                className="w-8 h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </motion.button>
          </div>
          
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-slate-900 rounded-full"></div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full"></div>
        </div>
      </div>
      

      
      {/* Subtle Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-black/10 rounded-full blur-sm"></div>
    </motion.div>
  );
} 