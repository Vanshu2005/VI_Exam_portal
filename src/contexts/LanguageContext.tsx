import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appTitle: 'Voice Exam Access',
    selectLanguage: 'Select Language',
    english: 'English',
    hindi: 'Hindi',
    startExam: 'Start Exam',
    nextQuestion: 'Next Question',
    previousQuestion: 'Previous Question',
    submitAnswer: 'Submit Answer',
    finishExam: 'Finish Exam',
    question: 'Question',
    of: 'of',
    yourAnswer: 'Your Answer',
    speakAnswer: 'Speak to answer',
    listening: 'Listening...',
    pressSpace: 'Press Space to speak',
    navigation: 'Navigation',
    arrowUp: 'Press Up Arrow to hear the question again',
    arrowDown: 'Press Down Arrow to move to next section',
    arrowLeft: 'Press Left Arrow for previous question',
    arrowRight: 'Press Right Arrow for next question',
    examComplete: 'Exam Complete!',
    thankyou: 'Thank you for completing the exam',
    voiceInstructions: 'Use arrow keys to navigate. Press Space to speak your answer.',
    navigatingUp: 'Navigating up - Reading question',
    navigatingDown: 'Navigating down - Moving to options',
    navigatingLeft: 'Navigating left - Previous question',
    navigatingRight: 'Navigating right - Next question',
  },
  hi: {
    appTitle: 'आवाज परीक्षा प्रणाली',
    selectLanguage: 'भाषा चुनें',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    startExam: 'परीक्षा शुरू करें',
    nextQuestion: 'अगला प्रश्न',
    previousQuestion: 'पिछला प्रश्न',
    submitAnswer: 'उत्तर जमा करें',
    finishExam: 'परीक्षा समाप्त करें',
    question: 'प्रश्न',
    of: 'का',
    yourAnswer: 'आपका उत्तर',
    speakAnswer: 'उत्तर बोलें',
    listening: 'सुन रहे हैं...',
    pressSpace: 'बोलने के लिए स्पेस दबाएं',
    navigation: 'नेविगेशन',
    arrowUp: 'प्रश्न फिर से सुनने के लिए ऊपर तीर दबाएं',
    arrowDown: 'अगले भाग में जाने के लिए नीचे तीर दबाएं',
    arrowLeft: 'पिछले प्रश्न के लिए बाएं तीर दबाएं',
    arrowRight: 'अगले प्रश्न के लिए दाएं तीर दबाएं',
    examComplete: 'परीक्षा पूर्ण!',
    thankyou: 'परीक्षा पूरी करने के लिए धन्यवाद',
    voiceInstructions: 'नेविगेट करने के लिए तीर कुंजियों का उपयोग करें। अपना उत्तर बोलने के लिए स्पेस दबाएं।',
    navigatingUp: 'ऊपर जा रहे हैं - प्रश्न पढ़ रहे हैं',
    navigatingDown: 'नीचे जा रहे हैं - विकल्पों पर जा रहे हैं',
    navigatingLeft: 'बाईं ओर जा रहे हैं - पिछला प्रश्न',
    navigatingRight: 'दाईं ओर जा रहे हैं - अगला प्रश्न',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
