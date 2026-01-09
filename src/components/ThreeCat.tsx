"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float } from "@react-three/drei";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

function CatHead() {
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Very subtle idle animation, no longer fighting with OrbitControls
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Head - Geometric feel */}
      <mesh scale={[1.2, 1, 1]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={isHovered ? 0.4 : 0.2} 
        />
      </mesh>
      
      {/* Left Ear */}
      <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, 0.4]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={isHovered ? 0.4 : 0.2} 
        />
      </mesh>

      {/* Right Ear */}
      <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, -0.4]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={isHovered ? 0.4 : 0.2} 
        />
      </mesh>

      {/* Glasses - Outline style */}
      <group position={[0, 0.1, 0.85]}>
        <mesh position={[-0.35, 0, 0]}>
          <ringGeometry args={[0.2, 0.22, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.8 : 0.5} />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <ringGeometry args={[0.2, 0.22, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.8 : 0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.8 : 0.5} />
        </mesh>
      </group>

      <mesh scale={[1.25, 1.05, 1.05]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

export function ThreeCat() {
  const { t } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const [showPaw, setShowPaw] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const lastClickTimeRef = useRef<number>(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    
    // Only count as consecutive if within 500ms
    if (timeSinceLastClick < 500) {
      const newCount = clickCount + 1;
      if (newCount >= 3) {
        if (!showPaw) { // One paw at a time
          setCursorPos({ x: e.clientX, y: e.clientY });
          setShowPaw(true);
          setTimeout(() => setShowPaw(false), 2000);
        }
        setClickCount(0);
      } else {
        setClickCount(newCount);
      }
    } else {
      setClickCount(1);
    }
    
    lastClickTimeRef.current = now;
  }, [clickCount, showPaw]);

  return (
    <div 
      className="h-[600px] w-full relative cursor-grab active:cursor-grabbing touch-none select-none"
      onClick={handleClick}
    >
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <CatHead />
          </Float>

          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.8}
            makeDefault
          />
        </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/20" />

      <AnimatePresence>
        {showPaw && (
          <motion.div
            key="paw-interaction"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -50, transition: { duration: 0.5 } }}
            style={{
              position: 'fixed',
              left: cursorPos.x - 60,
              top: cursorPos.y - 120,
              zIndex: 100,
              pointerEvents: 'none',
            }}
            className="flex flex-col items-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] uppercase tracking-[1em] font-light text-white mb-6"
            >
              {t('meow')}
            </motion.span>
            
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M35 70C35 60 40 55 50 55C60 55 65 60 65 70C65 80 60 85 50 85C40 85 35 80 35 70Z" 
                stroke="white" 
                strokeWidth="0.5" 
                className="opacity-40"
              />
              <circle cx="30" cy="50" r="6" stroke="white" strokeWidth="0.5" className="opacity-30" />
              <circle cx="43" cy="40" r="7" stroke="white" strokeWidth="0.5" className="opacity-40" />
              <circle cx="57" cy="40" r="7" stroke="white" strokeWidth="0.5" className="opacity-40" />
              <circle cx="70" cy="50" r="6" stroke="white" strokeWidth="0.5" className="opacity-30" />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                d="M20 40 Q 50 10 80 40"
                stroke="white"
                strokeWidth="0.5"
                className="opacity-20"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
