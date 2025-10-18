import { useTranslation } from 'react-i18next';
import { GlobalIcon } from './icons/LayeraIcons';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'el' ? 'en' : 'el';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#2563eb';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#3b82f6';
      }}
    >
      <GlobalIcon size="sm" theme="neutral" />
      {t('languageSwitch')} ({i18n.language.toUpperCase()})
    </button>
  );
};

export default LanguageSwitcher;