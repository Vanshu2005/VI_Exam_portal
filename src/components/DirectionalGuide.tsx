import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const DirectionalGuide: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card className="p-6 bg-card/50 border-2">
      <h3 className="text-lg font-semibold mb-4 text-center">{t('navigation')}</h3>
      <div className="grid grid-cols-1 gap-3 text-sm">
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <ArrowUp className="w-6 h-6 text-primary flex-shrink-0" />
          <span>{t('arrowUp')}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <ArrowDown className="w-6 h-6 text-primary flex-shrink-0" />
          <span>{t('arrowDown')}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-primary flex-shrink-0" />
          <span>{t('arrowLeft')}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" />
          <span>{t('arrowRight')}</span>
        </div>
      </div>
    </Card>
  );
};

export default DirectionalGuide;
