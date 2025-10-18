import { useTranslation } from 'react-i18next';
import { PuzzleIcon, LinkIcon, FolderIcon, ZapIcon, CheckIcon, PartyIcon } from './components/icons/LayeraIcons';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '0.5rem', margin: 0 }}>🗺️ {t('title')}</h1>
        <LanguageSwitcher />
      </div>

      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{t('subtitle')}</p>

      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '2rem 0',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}><CheckIcon size="xs" theme="success" /> {t('statusCheck')}</h3>
        <div style={{ textAlign: 'left' }}>
          <p><CheckIcon size="xs" theme="success" /> {t('port')}: 3010</p>
          <p><CheckIcon size="xs" theme="success" /> {t('reactReady')}</p>
          <p><CheckIcon size="xs" theme="success" /> {t('typescriptStrict')}</p>
          <p><CheckIcon size="xs" theme="success" /> {t('independentApp')}</p>
          <p><CheckIcon size="xs" theme="success" /> {t('enterpriseArchitecture')}</p>
          <p><CheckIcon size="xs" theme="success" /> Working Micro-Modules: 7</p>
          <p><CheckIcon size="xs" theme="success" /> Dependencies Fixed</p>
        </div>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <div style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3><PartyIcon size="sm" theme="success" /> ΕΠΙΤΥΧΙΑ!</h3>
          <p>Enterprise Micro-Modules Architecture Working!</p>
        </div>

        <a
          href="http://localhost:3001"
          target="_blank"
          style={{
            color: '#2563eb',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            border: '2px solid #2563eb',
            borderRadius: '6px',
            display: 'inline-block',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2563eb';
          }}
        >
          {t('navigateToLayeraId')}
        </a>
      </div>

      <div style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.875rem' }}>
        <p><PuzzleIcon size="sm" theme="info" /> {t('modularMicroservice')}</p>
        <p><LinkIcon size="sm" theme="info" /> {t('crossAppNavigation')}</p>
        <p><FolderIcon size="sm" theme="info" /> Created 7 Micro-Modules Successfully</p>
        <p><ZapIcon size="sm" theme="warning" /> Ready for PHASE 2 Implementation</p>
      </div>
    </div>
  )
}

export default App