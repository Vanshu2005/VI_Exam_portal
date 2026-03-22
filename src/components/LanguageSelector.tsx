import { Language, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { ttsService } from '@/utils/textToSpeech';
import { useEffect } from 'react';

interface LanguageSelectorProps {
  onLanguageSelected: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelected }) => {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Announce the language selection screen
    setTimeout(() => {
      ttsService.speak('Welcome to Voice Exam Access. Please select your language.', 'en');
    }, 500);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    const message = lang === 'hi' 
      ? 'हिंदी भाषा चुनी गई। परीक्षा शुरू करने के लिए तैयार हैं।' 
      : 'English language selected. Ready to start the exam.';
    ttsService.speak(message, lang, onLanguageSelected);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Languages className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">{t('selectLanguage')}</h1>
          <p className="text-xl text-muted-foreground">
            Choose your preferred language for the exam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            size="lg"
            className="h-32 text-2xl font-semibold"
            onClick={() => handleLanguageSelect('en')}
            onFocus={() => ttsService.speak('English', 'en')}
          >
            <div className="space-y-2">
              <div className="text-4xl">🇬🇧</div>
              <div>English</div>
            </div>
          </Button>

          <Button
            size="lg"
            className="h-32 text-2xl font-semibold"
            onClick={() => handleLanguageSelect('hi')}
            onFocus={() => ttsService.speak('हिंदी', 'hi')}
          >
            <div className="space-y-2">
              <div className="text-4xl">🇮🇳</div>
              <div>हिंदी</div>
            </div>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Use Tab key to navigate between options</p>
          <p>Press Enter or Space to select</p>
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelector;
