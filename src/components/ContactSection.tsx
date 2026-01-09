"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-64 px-6 max-w-7xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-xs uppercase tracking-[0.8em] text-muted-foreground mb-12">{t('startAProject')}</h2>
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=riscateditor@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center mb-24"
        >
          <span className="text-4xl md:text-6xl font-extralight tracking-tighter transition-colors group-hover:text-zinc-400">
            {t('letsTalkCinema')}
          </span>
          <motion.div 
            className="absolute -bottom-4 left-0 right-0 h-px bg-white origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          />
        </a>
      </motion.div>
    </section>
  );
}
