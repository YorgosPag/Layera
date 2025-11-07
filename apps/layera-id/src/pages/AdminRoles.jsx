import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSetRole, callRefreshMfaClaim } from "../lib/functions";
import { useAuth } from "../contexts/AuthContext";
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Box } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { FormField, FormSection, FormActions, Input, Select } from '@layera/forms';
import { USER_ROLES, FORM_TYPES, FORM_SIZES, SPACING_SCALE, getCardInfoColor, getCardInfoBorder } from '@layera/constants';
import { Alert } from '@layera/notifications';
import QuickActions from '../components/QuickActions';

export default function AdminRoles() {
  const { claims } = useAuth();
  const { user, signOut } = useAuthContext();
  const { t } = useLayeraTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("private");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    } else {
      console.error('Logout error:', result.error);
    }
  };

  // Check admin access
  if (claims?.role !== "admin") {
    return (
      <AppShell
        layout="fullscreen"
        header={
          <LayeraHeader
            title={t('app.name')}
            subtitle={t('app.subtitle')}
            variant="standard"
          />
        }
      >
        <PageContainer maxWidth="full" padding="none">
          <Box padding="lg">
            <DashboardSection
              title={t('errors.authError')}
              icon={<span>🚫</span>}
            >
              <DashboardCard
                title={t('errors.adminRequired.title')}
                variant="error"
              >
                <p>{t('errors.adminRequired.description')}</p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/dashboard')}
                  marginTop="md"
                >
                  ← {t('navigation.backToDashboard')}
                </Button>
              </DashboardCard>
            </DashboardSection>
          </Box>
        </PageContainer>
      </AppShell>
    );
  }

  const roleOptions = [
    { value: "private", label: t('roles.private') },
    { value: "broker", label: t('roles.broker') },
    { value: "builder", label: t('roles.builder') },
    { value: "admin", label: t('roles.admin') }
  ];

  async function onSetRole() {
    if (!email.trim()) {
      setMsg(t('admin.errors.enterEmail'));
      setMsgType("error");
      return;
    }

    setLoading(true);
    setMsg(t('common.processing'));
    setMsgType("info");

    try {
      const res = await callSetRole({ email, role });
      setMsg(t('admin.success.roleSet', { uid: res.uid, role: t(`roles.${role}`) }));
      setMsgType("success");
    } catch (e) {
      setMsg(t('admin.errors.roleSetFailed', { error: e?.message || e }));
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  }

  async function onRefreshMfa() {
    if (!email.trim()) {
      setMsg(t('admin.errors.enterEmail'));
      setMsgType("error");
      return;
    }

    setLoading(true);
    setMsg(t('admin.checking2FA'));
    setMsgType("info");

    try {
      const res = await callRefreshMfaClaim({ email });
      const status = res.mfa ? t('status.active') : t('status.inactive');
      setMsg(t('admin.success.mfaRefreshed', { uid: res.uid, status }));
      setMsgType("success");
    } catch (e) {
      setMsg(t('admin.errors.mfaRefreshFailed', { error: e?.message || e }));
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  }

  const headerActions = (
    <HeaderActionsGroup>
      <LanguageSwitcher variant="toggle" showFlags={true} />
      <ThemeSwitcher
        variant="icon"
        size="md"
        labels={{
          light: t('settings.items.theme.light'),
          dark: t('settings.items.theme.dark'),
          system: t('settings.items.theme.system')
        }}
      />
      {user && (
        <>
          <UserAvatar
            user={user}
            size="medium"
            onClick={() => navigate('/account')}
          />
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            {t('navigation.logout')}
          </Button>
        </>
      )}
    </HeaderActionsGroup>
  );

  return (
    <AppShell
      layout="fullscreen"
      header={
        <LayeraHeader
          title={t('app.name')}
          subtitle={t('app.subtitle')}
          variant="standard"
          actions={headerActions}
        />
      }
    >
      <PageContainer maxWidth="full" padding="none">
        <Box padding="lg">
          <PageHeader
            title={t('admin.roleManagement.title')}
            subtitle={t('admin.roleManagement.subtitle')}
          />
        </Box>

        {/* Role Management Form */}
        <Box padding="lg">
          <DashboardSection
            title={t('admin.roleManagement.form.title')}
            icon={<span>👤</span>}
          >
            <DashboardCard style={{
              backgroundColor: getCardInfoColor(), // 🔴 SST: Card color από μοναδική πηγή αλήθειας
              border: `3px solid ${getCardInfoBorder()}` // 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας #b929c6
            }}>
              <FormSection>
                <FormField
                  labelKey="forms.labels.email"
                  hintKey="admin.roleManagement.form.emailHint"
                  required
                >
                  <Input
                    type={FORM_TYPES.EMAIL}
                    size={FORM_SIZES.MEDIUM}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholderKey="forms.placeholders.email"
                    disabled={loading}
                    fullWidth
                    autoComplete="email"
                  />
                </FormField>

                <FormField
                  labelKey="forms.labels.role"
                  hintKey="admin.roleManagement.form.roleHint"
                  required
                >
                  <Select
                    options={roleOptions}
                    value={role}
                    onChange={setRole}
                    placeholderKey="forms.placeholders.selectRole"
                    size={FORM_SIZES.MEDIUM}
                    disabled={loading}
                    fullWidth
                  />
                </FormField>

                <FormActions>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onSetRole}
                    disabled={loading}
                    loading={loading}
                    loadingText={t('common.processing')}
                  >
                    {t('admin.actions.setRole')}
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={onRefreshMfa}
                    disabled={loading}
                    loading={loading}
                    loadingText={t('common.processing')}
                  >
                    {t('admin.actions.refreshMfa')}
                  </Button>
                </FormActions>
              </FormSection>
            </DashboardCard>
          </DashboardSection>
        </Box>

        {/* Status Messages */}
        {msg && (
          <Box padding="lg">
            <Alert
              type={msgType === 'error' ? 'error' : msgType === 'success' ? 'success' : 'info'}
              message={msg}
              onClose={() => setMsg("")}
              closable
            />
          </Box>
        )}

        {/* Information Section */}
        <Box padding="lg">
          <DashboardSection
            title={t('admin.roleManagement.info.title')}
            icon={<span>ℹ️</span>}
          >
            <DashboardCard style={{
              backgroundColor: getCardInfoColor(), // 🔴 SST: Card color από μοναδική πηγή αλήθειας
              border: `3px solid ${getCardInfoBorder()}` // 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας #b929c6
            }}>
              <Box as="ul" margin="0" paddingLeft="xl">
                <li>{t('admin.roleManagement.info.adminOnly')}</li>
                <li>{t('admin.roleManagement.info.clientRestrictions')}</li>
                <li>{t('admin.roleManagement.info.mfaRefresh')}</li>
              </Box>
            </DashboardCard>
          </DashboardSection>
        </Box>

        {/* Quick Actions */}
        <Box padding="lg">
          <QuickActions />
        </Box>
      </PageContainer>
    </AppShell>
  );
}