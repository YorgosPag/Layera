import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayeraTranslation } from '@layera/i18n';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { UserIcon, SettingsIcon, FolderIcon, ChartIcon } from '@layera/icons';

/**
 * QuickActions - Κοινό component για γρήγορες ενέργειες navigation
 * Περιλαμβάνει όλες τις κύριες σελίδες της εφαρμογής
 */
export default function QuickActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLayeraTranslation();

  // Λίστα όλων των διαθέσιμων σελίδων
  const pages = [
    {
      key: 'dashboard',
      title: t('navigation.backToDashboard'),
      path: '/dashboard',
      icon: <ChartIcon size="lg" theme="neutral" />
    },
    {
      key: 'account',
      title: t('navigation.account'),
      path: '/account',
      icon: <UserIcon size="lg" theme="neutral" />
    },
    {
      key: 'settings',
      title: t('navigation.settings'),
      path: '/settings',
      icon: <SettingsIcon size="lg" theme="neutral" />
    },
    {
      key: 'data',
      title: t('navigation.data'),
      path: '/data',
      icon: <FolderIcon size="lg" theme="neutral" />
    }
  ];

  // Φιλτράρισμα για να μην εμφανίζεται η τρέχουσα σελίδα
  const availablePages = pages.filter(page => location.pathname !== page.path);

  return (
    <DashboardSection title={t('dashboard:quickActions.title')}>
      <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 4 }}>
        {availablePages.map(page => (
          <DashboardCard
            key={page.key}
            title={page.title}
            variant="actions"
            clickable
            onClick={() => navigate(page.path)}
          >
            {page.icon}
          </DashboardCard>
        ))}
      </DashboardGrid>
    </DashboardSection>
  );
}