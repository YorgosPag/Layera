import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayeraTranslation } from '@layera/tolgee';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { Box } from '@layera/layout';
// Προσωρινά απλά εικονίδια αντί για @layera/icons που χτυπάνε

interface PageItem {
  key: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

/**
 * QuickActions - Κοινό component για γρήγορες ενέργειες navigation
 * Περιλαμβάνει όλες τις κύριες σελίδες της εφαρμογής
 */
const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLayeraTranslation();

  // Λίστα όλων των διαθέσιμων σελίδων
  const pages: PageItem[] = [
    {
      key: 'dashboard',
      title: t('navigation.backToDashboard'),
      path: '/dashboard',
      icon: <Box fontSize="xl" fontWeight="bold">👤</Box>
    },
    {
      key: 'account',
      title: t('navigation.account'),
      path: '/account',
      icon: <Box fontSize="xl" fontWeight="bold">👤</Box>
    },
    {
      key: 'settings',
      title: t('navigation.settings'),
      path: '/settings',
      icon: <Box fontSize="xl" fontWeight="bold">⚙️</Box>
    },
    {
      key: 'data',
      title: t('navigation.data'),
      path: '/data',
      icon: <Box fontSize="xl" fontWeight="bold">⚙️</Box>
    }
  ];

  // Φιλτράρισμα για να μην εμφανίζεται η τρέχουσα σελίδα
  const availablePages = pages.filter(page => location.pathname !== page.path);

  return (
    <DashboardSection title={t('dashboard.quickActions.title')}>
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
};

export default QuickActions;