"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Nocturnal Echoes",
    category: "Short Film / Color Grade",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
  },
  {
    title: "Urban Pulse",
    category: "Commercial / Fast Cut",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "The Silent Watcher",
    category: "Documentary / Storytelling",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
  },
  {
    title: "Neon Dreams",
    category: "Music Video / Visual FX",
    thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
];

export function PortfolioGrid() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">Selected Works</h2>
        <div className="h-px w-12 bg-muted-foreground/20" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group cursor-none"
          >
            <div className="relative aspect-video overflow-hidden bg-zinc-900 rounded-sm">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-light tracking-tight mb-2">{project.title}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.category}</p>
              </div>
              <motion.div 
                className="h-px w-0 bg-white group-hover:w-12 transition-all duration-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
