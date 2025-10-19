import { useLayeraTranslation } from '@layera/i18n';
import { CheckIcon, AlertTriangleIcon, MoreIcon, ShareIcon, LayersIcon } from '@layera/icons';
import { LanguageSwitcher } from '@layera/i18n';

function App() {
  const { t } = useLayeraTranslation();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: 'var(--layera-bg-info)', marginBottom: '0.5rem', margin: 0 }}>🗺️ {t('title')}</h1>
        <LanguageSwitcher />
      </div>

      <p style={{ color: 'var(--layera-text-secondary)', marginBottom: '2rem' }}>{t('subtitle')}</p>

      <div style={{
        backgroundColor: 'var(--layera-bg-secondary)',
        border: '1px solid var(--layera-border-primary)',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '2rem 0',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ color: 'var(--layera-text-primary)', marginBottom: '1rem' }}><CheckIcon size="xs" theme="success" /> {t('statusCheck')}</h3>
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
          backgroundColor: 'var(--layera-bg-success)',
          color: 'var(--layera-text-on-success)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3><MoreIcon size="sm" theme="success" /> ΕΠΙΤΥΧΙΑ!</h3>
          <p>Enterprise Micro-Modules Architecture Working!</p>
        </div>

        <a
          href="http://localhost:3001"
          target="_blank"
          style={{
            color: 'var(--layera-bg-info)',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            border: '2px solid var(--layera-bg-info)',
            borderRadius: '6px',
            display: 'inline-block',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--layera-bg-info)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--layera-bg-info)';
          }}
        >
          {t('navigateToLayeraId')}
        </a>
      </div>

      <div style={{ marginTop: '2rem', color: 'var(--layera-text-secondary)', fontSize: '0.875rem' }}>
        <p><LayersIcon size="sm" theme="info" /> {t('modularMicroservice')}</p>
        <p><ShareIcon size="sm" theme="info" /> {t('crossAppNavigation')}</p>
        <p><LayersIcon size="sm" theme="info" /> Created 7 Micro-Modules Successfully</p>
        <p><AlertTriangleIcon size="sm" theme="warning" /> Ready for PHASE 2 Implementation</p>
      </div>
    </div>
  )
}

export default App