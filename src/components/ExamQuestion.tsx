import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ttsService } from '@/utils/textToSpeech';
import { SpeechRecognitionService } from '@/utils/speechRecognition';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DirectionalGuide from './DirectionalGuide';

interface Question {
  id: number;
  question: string;
  questionHi: string;
}

interface ExamQuestionProps {
  questions: Question[];
  onComplete: (answers: Record<number, string>) => void;
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({ questions, onComplete }) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition] = useState(() => new SpeechRecognitionService());

  const currentQuestion = questions[currentQuestionIndex];
  const questionText = language === 'hi' ? currentQuestion.questionHi : currentQuestion.question;

  const speakQuestion = useCallback(() => {
    const fullText = `${t('question')} ${currentQuestionIndex + 1} ${t('of')} ${questions.length}. ${questionText}`;
    ttsService.speak(fullText, language);
  }, [currentQuestionIndex, questionText, language, t, questions.length]);

  useEffect(() => {
    speakQuestion();
  }, [speakQuestion]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        ttsService.speak(t('navigatingUp'), language);
        setTimeout(speakQuestion, 800);
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        ttsService.speak(t('navigatingDown'), language);
        break;
      
      case 'ArrowLeft':
        e.preventDefault();
        if (currentQuestionIndex > 0) {
          ttsService.speak(t('navigatingLeft'), language);
          setTimeout(() => setCurrentQuestionIndex(prev => prev - 1), 800);
        }
        break;
      
      case 'ArrowRight':
        e.preventDefault();
        if (currentQuestionIndex < questions.length - 1) {
          ttsService.speak(t('navigatingRight'), language);
          setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 800);
        }
        break;
      
      case ' ':
        e.preventDefault();
        if (!isListening) {
          startListening();
        }
        break;
    }
  }, [currentQuestionIndex, questions.length, isListening, language, t, speakQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const startListening = () => {
    if (!speechRecognition.isSupported()) {
      toast({
        title: 'Not Supported',
        description: 'Speech recognition is not supported in your browser',
        variant: 'destructive',
      });
      return;
    }

    setIsListening(true);
    ttsService.speak(t('listening'), language);

    speechRecognition.startListening(
      language,
      (transcript) => {
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: transcript,
        }));
        setIsListening(false);
        
        const confirmMessage = language === 'hi' 
          ? `आपका उत्तर दर्ज किया गया: ${transcript}` 
          : `Your answer recorded: ${transcript}`;
        ttsService.speak(confirmMessage, language);
        
        toast({
          title: t('submitAnswer'),
          description: transcript,
        });
      },
      (error) => {
        setIsListening(false);
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
      }
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const message = language === 'hi' 
        ? 'परीक्षा समाप्त। धन्यवाद।' 
        : 'Exam completed. Thank you.';
      ttsService.speak(message, language);
      setTimeout(() => onComplete(answers), 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
          </Badge>
          <Badge className="text-lg px-4 py-2">
            {language === 'hi' ? 'हिंदी' : 'English'}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 leading-relaxed">
                {questionText}
              </h2>

              {/* Answer Display */}
              <div className="mt-8 p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">{t('yourAnswer')}:</p>
                <p className="text-xl min-h-[3rem]">
                  {answers[currentQuestion.id] || (
                    <span className="text-muted-foreground italic">{t('speakAnswer')}</span>
                  )}
                </p>
              </div>

              {/* Voice Control */}
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="h-20 w-20 rounded-full"
                  onClick={startListening}
                  disabled={isListening}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8 animate-pulse" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                {isListening ? t('listening') : t('pressSpace')}
              </p>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex-1 text-lg h-14"
              >
                {t('previousQuestion')}
              </Button>
              <Button
                size="lg"
                onClick={handleNext}
                className="flex-1 text-lg h-14"
              >
                {currentQuestionIndex === questions.length - 1 
                  ? t('finishExam') 
                  : t('nextQuestion')}
              </Button>
            </div>
          </div>

          {/* Directional Guide */}
          <div className="lg:col-span-1">
            <DirectionalGuide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestion;
