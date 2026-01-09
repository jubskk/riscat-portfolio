"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface Translations {
  [key: string]: {
    en: string;
    pt: string;
  };
}

const translations: Translations = {
  concept: { en: 'Concept', pt: 'Conceito' },
  studio: { en: 'Studio', pt: 'Estúdio' },
  contact: { en: 'Contact', pt: 'Contato' },
  heroSubtitle: { en: 'Creative Editing & Storytelling', pt: 'Edição Criativa & Storytelling' },
  philosophy: { en: 'The Philosophy', pt: 'A Filosofia' },
  aboutText1: { 
    en: 'Every frame is a decision. Every cut is a heartbeat. I specialize in crafting cinematic narratives that resonate on a deeper level.',
    pt: 'Cada frame é uma decisão. Cada corte é um batimento cardíaco. Sou especialista em criar narrativas cinematográficas que ressoam em um nível profundo.'
  },
    aboutText2: {
      en: 'With over 6 years of experience in editing, I am an expert in Adobe After Effects, Premiere, and CapCut. I also have solid knowledge in 3D modeling with Blender, delivering projects with a high level of professionalism and creativity.',
      pt: 'Com mais de 6 anos de experiência em edição, sou especialista em Adobe After Effects, Premiere e CapCut. Também possuo sólidos conhecimentos em modelagem 3D no Blender, entregando projetos com alto nível de profissionalismo e criatividade.'
    },
  getInTouch: { en: 'Get In Touch', pt: 'Entre em Contato' },
  startAProject: { en: 'Start a Project', pt: 'Começar um Projeto' },
  letsTalkCinema: { en: 'Let\'s talk cinema', pt: 'Vamos falar de cinema' },
  expertise: { en: 'Expertise', pt: 'Especialidade' },
  manifesto1: { en: 'I don\'t just edit videos.', pt: 'Eu não apenas edito vídeos.' },
  manifesto2: { en: 'I design rhythm, emotion and attention.', pt: 'Eu projeto ritmo, emoção e atenção.' },
  manifestoSubtitle: { 
    en: 'Short-form edits, storytelling and pacing crafted for retention and impact.', 
    pt: 'Edições curtas, storytelling e ritmo criados para retenção e impacto.' 
  },
  service1: { en: 'Short-form edits', pt: 'Edições curtas' },
  service2: { en: 'TikTok & Reels storytelling', pt: 'Storytelling para TikTok & Reels' },
  service3: { en: 'YouTube pacing', pt: 'Ritmo para YouTube' },
  service4: { en: 'Motion accents', pt: 'Acentos de motion' },
  service5: { en: 'Color grading', pt: 'Coloração (Color grading)' },
  meow: { en: 'meaw', pt: 'miau' },
  footerRights: { en: '© {year} riscat', pt: '© {year} riscat' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[key]?.[language] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
