import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center gap-4 group/music">
      {hasWindow && (
        <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=YOJsKatW-Ts"
            playing={!isMuted}
            muted={isMuted}
            volume={volume}
            loop={true}
            config={{
              youtube: {
                playerVars: { 
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  iv_load_policy: 3,
                  modestbranding: 1
                }
              }
            }}
          />
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-500"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          <div className="relative flex items-center justify-center w-8 h-8 border border-white/10 rounded-full hover:border-white/30 transition-colors">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5" strokeWidth={1.5} />
            ) : volume < 0.5 ? (
              <Volume1 className="w-3.5 h-3.5" strokeWidth={1.5} />
            ) : (
              <Volume2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
            {!isMuted && volume > 0 && (
              <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20" />
            )}
          </div>
        </button>

        <div className="flex items-center gap-3 overflow-hidden w-0 group-hover/music:w-32 transition-all duration-500 ease-in-out opacity-0 group-hover/music:opacity-100">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-24 h-5"
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
          >
            <Slider.Track className="bg-white/10 relative grow rounded-full h-[2px]">
              <Slider.Range className="absolute bg-white/40 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-2.5 h-2.5 bg-white rounded-full hover:scale-125 transition-transform focus:outline-none"
              aria-label="Volume"
            />
          </Slider.Root>
          <span className="text-[9px] font-mono text-white/40 min-w-[25px]">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>

      <span className="hidden md:block text-[10px] uppercase tracking-[0.4em] text-white/20 group-hover/music:text-white/40 transition-colors">
        {isMuted || volume === 0 ? "Mudo" : "Música"}
      </span>
    </div>
  );
}
