"use client";

import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

export function BackgroundMusic() {
  const [volume, setVolume] = useState(0.2);
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    setMounted(true);
    
    // Auto-play workaround: start playing after first user interaction
    const handleFirstInteraction = () => {
      setIsPlaying(true);
      // Ensure volume is set correctly after interaction
      if (playerRef.current) {
        playerRef.current.getInternalPlayer()?.setVolume(volume * 100);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [volume]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-white/5 backdrop-blur-sm p-2 rounded-full border border-white/10 group">
      <div className="overflow-hidden w-0 group-hover:w-24 transition-all duration-300 ease-in-out flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>
      
      <button
        onClick={() => setMuted(!muted)}
        className="text-white/60 hover:text-white transition-colors p-1"
      >
        {muted || volume === 0 ? (
          <VolumeX size={14} />
        ) : volume < 0.5 ? (
          <Volume1 size={14} />
        ) : (
          <Volume2 size={14} />
        )}
      </button>

      <div className="fixed -top-[1000px] left-0 pointer-events-none opacity-0">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=YOJsKatW-Ts"
          playing={isPlaying}
          loop={true}
          volume={volume}
          muted={muted}
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
    </div>
  );
}
