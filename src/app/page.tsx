"use client";

import dynamic from "next/dynamic";
import { MinimalistContent } from "@/components/MinimalistContent";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { useLanguage } from "@/components/LanguageContext";

// Dynamic imports for client-side only components to avoid SSR issues
const ThreeCat = dynamic(() => import("@/components/ThreeCat").then(mod => mod.ThreeCat), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black/5 animate-pulse" />
});

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-8 md:px-12 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M4 11V14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14V11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M4 11L6 4L10 8H14L18 4L20 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1" />
            <circle cx="15.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1" />
            <path d="M10.5 13.5H13.5" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.6em] font-light">riscat</span>
        </div>
        
        <div className="flex items-center gap-8 md:gap-12 pointer-events-auto">
          <div className="hidden md:flex gap-8">
            <a href="#concept" className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-white transition-colors">{t('concept')}</a>
            <a href="#about" className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-white transition-colors">{t('studio')}</a>
            <a href="#contact" className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-white transition-colors">{t('contact')}</a>
          </div>
          
          <div className="flex gap-4 border-l border-white/10 pl-8">
            <button 
              onClick={() => setLanguage('pt')}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${language === 'pt' ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${language === 'en' ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-5xl z-10">
            <ThreeCat />
          </div>
          
          <div className="absolute bottom-24 left-0 right-0 text-center space-y-4 z-20">
            <h1 className="text-[10px] uppercase tracking-[1em] text-white/40 animate-pulse">
              {t('heroSubtitle')}
            </h1>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </section>

        {/* Minimalist Portfolio Section */}
        <div id="concept" className="bg-black">
          <MinimalistContent />
        </div>

        {/* About Section */}
        <div id="about" className="bg-black">
          <AboutSection />
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-black">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-black">
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {t('footerRights', { year: new Date().getFullYear() })}
        </span>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Instagram", url: "https://www.instagram.com/riscatt/" },
            { name: "Gmail", url: "https://mail.google.com/mail/?view=cm&fs=1&to=riscateditor@gmail.com" },
            { name: "WhatsApp", url: "https://wa.me/5547984163724?text=Bom%20dia" },
            { name: "Discord", url: "https://discord.com/users/526722827924013088" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-white transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
