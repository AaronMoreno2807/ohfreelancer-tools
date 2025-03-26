
import { useState } from 'react';
import { Check, Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-oh-muted-text hover:text-oh-text transition-colors"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 mr-1.5" />
        <span className="hidden sm:inline">{selectedLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 overflow-hidden animate-scale">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`
                  flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors
                  ${language.code === selectedLanguage.code ? 'bg-oh-accent/10 text-oh-accent' : 'text-oh-text hover:bg-oh-border/50'}
                `}
                onClick={() => selectLanguage(language)}
              >
                {language.name}
                {language.code === selectedLanguage.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
