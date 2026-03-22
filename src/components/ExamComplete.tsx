import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ttsService } from '@/utils/textToSpeech';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ExamCompleteProps {
  answers: Record<number, string>;
}

const ExamComplete: React.FC<ExamCompleteProps> = ({ answers }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const message = `${t('examComplete')} ${t('thankyou')}`;
    ttsService.speak(message, language);
  }, [language, t]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-6 bg-success/10 rounded-full">
            <CheckCircle className="w-24 h-24 text-success" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-success">{t('examComplete')}</h1>
          <p className="text-2xl text-muted-foreground">{t('thankyou')}</p>
        </div>

        <div className="pt-8 space-y-4">
          <p className="text-xl font-semibold">
            {language === 'hi' 
              ? `कुल उत्तर दिए गए: ${Object.keys(answers).length}` 
              : `Total Answers Submitted: ${Object.keys(answers).length}`}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ExamComplete;
