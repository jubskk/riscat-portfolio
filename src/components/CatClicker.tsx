"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player/youtube";

export function CatClicker() {
  const [showPaw, setShowPaw] = useState(false);
  const [isPlayingMiau, setIsPlayingMiau] = useState(false);
  const [pawPosition, setPawPosition] = useState({ x: 0, y: 0 });
  
  // Using refs for logic that shouldn't trigger re-renders or be reset by re-renders
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const soundPlayingRef = useRef(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore clicks on UI elements (like buttons or sliders)
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('input')) {
        return;
      }

      const now = Date.now();
      
      // Consecutive clicks: must be within 500ms of each other
      if (now - lastClickTimeRef.current > 500) {
        clickCountRef.current = 1;
      } else {
        clickCountRef.current += 1;
      }
      
      lastClickTimeRef.current = now;

      if (clickCountRef.current === 3) {
        clickCountRef.current = 0; // Reset after trigger
        
        setPawPosition({ x: e.clientX, y: e.clientY });
        setShowPaw(true);

        // Play miau only if not already playing
        if (!soundPlayingRef.current) {
          setIsPlayingMiau(true);
          soundPlayingRef.current = true;
        }

        // Hide paw after animation
        setTimeout(() => setShowPaw(false), 1000);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleSoundEnd = () => {
    setIsPlayingMiau(false);
    soundPlayingRef.current = false;
  };

  return (
    <>
      <AnimatePresence>
        {showPaw && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 20 }}
            style={{
              position: "fixed",
              top: pawPosition.y - 40,
              left: pawPosition.x - 40,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="white"
              className="drop-shadow-lg"
            >
              <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M7,5C5.89,5 5,5.89 5,7C5,8.11 5.89,9 7,9C8.11,9 9,8.11 9,7C9,5.89 8.11,5 7,5M17,5C15.89,5 15,5.89 15,7C15,8.11 15.89,9 17,9C18.11,9 19,8.11 19,7C19,5.89 18.11,5 17,5M12,8C9.79,8 8,9.79 8,12C8,14.21 9.79,16 12,16C14.21,16 16,14.21 16,12C16,9.79 14.21,8 12,8Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed -top-[1000px] left-0 pointer-events-none opacity-0">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=WsTb8HYZd-U"
          playing={isPlayingMiau}
          onEnded={handleSoundEnd}
          onError={handleSoundEnd}
          width="64px"
          height="64px"
          config={{
            playerVars: { 
              autoplay: 1, 
              controls: 0,
              origin: typeof window !== 'undefined' ? window.location.origin : ''
            }
          }}
        />
      </div>
    </>
  );
}
