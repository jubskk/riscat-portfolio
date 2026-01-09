"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">{t('philosophy')}</h2>
          <div className="h-px w-12 bg-muted-foreground/20" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <p className="text-2xl font-light leading-relaxed tracking-tight text-zinc-300">
            {t('aboutText1')}
          </p>
          <p className="text-zinc-500 font-light leading-relaxed">
            {t('aboutText2')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
