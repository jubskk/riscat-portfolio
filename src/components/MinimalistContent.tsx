"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

export function MinimalistContent() {
  const { t } = useLanguage();
  
  const services = [
    t('service1'),
    t('service2'),
    t('service3'),
    t('service4'),
    t('service5')
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
      {/* Headline & Manifesto */}
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
            {t('manifesto1')}<br />
            <span className="text-white/40 italic">{t('manifesto2')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-md ml-auto md:mr-12"
        >
          <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed">
            {t('manifestoSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Services List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8 pt-12 border-t border-white/5"
      >
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-12">{t('expertise')}</h3>
          <div className="flex flex-col gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex items-baseline gap-4 border-b border-white/5 pb-6 last:border-0"
              >
              <span className="text-[10px] font-mono text-white/20">0{index + 1}</span>
              <span className="text-2xl md:text-4xl font-light tracking-tight text-white/80 group-hover:text-white transition-colors duration-500">
                {service}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
