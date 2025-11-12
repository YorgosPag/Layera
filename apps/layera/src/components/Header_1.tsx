import React from 'react';
import { LayeraHeader, HeaderActionsGroup } from '@layera/layout';
import { PlusIcon, UserIcon } from '@layera/icons';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { t } = useLayeraTranslation();

  return (
    <LayeraHeader
      title={t('app.name')}
      subtitle={t('app.subtitle')}
      variant="rich"
      className="layera-header--fixed"
      logo={
        <button
          className="layera-typography"
          type="button"
          aria-label="Layera Logo"
        >
          L
        </button>
      }
      navigation={
        <HeaderActionsGroup>
          <button
            onClick={onOpenModal}
            className="layera-typography"
            type="button"
            aria-label="Επιλογή κατηγορίας"
          >
            <PlusIcon size="md" />
          </button>
        </HeaderActionsGroup>
      }
      actions={
        <HeaderActionsGroup>
          <LanguageSwitcher variant="compact" />
          <ThemeSwitcher
            variant="icon"
            size="md"
            aria-label={t('buttons.changeTheme')}
          />
          <button
            className="layera-typography"
            type="button"
            aria-label={t('auth.loginRegister')}
          >
            <UserIcon size="lg" />
          </button>
        </HeaderActionsGroup>
      }
    />
  );
};