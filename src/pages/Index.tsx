import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import ExamQuestion from '@/components/ExamQuestion';
import ExamComplete from '@/components/ExamComplete';

// Sample exam questions
const examQuestions = [
  {
    id: 1,
    question: 'What is the capital of India?',
    questionHi: 'भारत की राजधानी क्या है?',
  },
  {
    id: 2,
    question: 'Who wrote the Indian National Anthem?',
    questionHi: 'भारतीय राष्ट्रगान किसने लिखा था?',
  },
  {
    id: 3,
    question: 'What is the largest planet in our solar system?',
    questionHi: 'हमारे सौर मंडल का सबसे बड़ा ग्रह कौन सा है?',
  },
  {
    id: 4,
    question: 'How many states are there in India?',
    questionHi: 'भारत में कितने राज्य हैं?',
  },
  {
    id: 5,
    question: 'What is the national bird of India?',
    questionHi: 'भारत का राष्ट्रीय पक्षी क्या है?',
  },
];

type ExamStage = 'language' | 'exam' | 'complete';

const Index = () => {
  const [stage, setStage] = useState<ExamStage>('language');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleLanguageSelected = () => {
    setTimeout(() => {
      setStage('exam');
    }, 1500);
  };

  const handleExamComplete = (examAnswers: Record<number, string>) => {
    setAnswers(examAnswers);
    setStage('complete');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        {stage === 'language' && (
          <LanguageSelector onLanguageSelected={handleLanguageSelected} />
        )}
        
        {stage === 'exam' && (
          <ExamQuestion 
            questions={examQuestions} 
            onComplete={handleExamComplete}
          />
        )}
        
        {stage === 'complete' && (
          <ExamComplete answers={answers} />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
