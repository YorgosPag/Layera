# 🆔 Layera ID - Layout Migration Plan

## 📋 Current State Analysis

### Existing Layout Structure
```tsx
// apps/layera-id/src/App.jsx - CURRENT
function App() {
  return (
    <div className="app">
      <Dashboard />  {/* Custom dashboard layout */}
      {/* Or various pages with different layouts */}
      <Account />
      <Settings />
      <AdminRoles />
    </div>
  );
}
```

### Current Pages & Their Layouts
1. **Dashboard**: Custom grid layout με cards
2. **Account**: Form-based layout με profile sections
3. **Settings**: Tab-based layout με categories
4. **AdminRoles**: Table-based layout με management actions
5. **Data**: Data visualization layout

### Identified Issues
- ❌ Κάθε page έχει διαφορετική header approach
- ❌ Ασυνεπή sidebar navigation
- ❌ Διαφορετικά container patterns
- ❌ Custom spacing/padding σε κάθε page
- ❌ No responsive strategy

## 🎯 Target Layout Structure

### New Unified Structure
```tsx
// apps/layera-id/src/App.jsx - TARGET
import { AppShell, LayeraHeader } from '@layera/layout';
import { IdNavigation } from './components/IdNavigation';

function App() {
  return (
    <AppShell
      layout="dashboard"
      header={
        <LayeraHeader
          title="Layera ID"
          subtitle="Enterprise Identity Management"
          actions={<IdHeaderActions />}
          variant="standard"
        />
      }
      sidebar={<IdNavigation />}
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminRoles />} />
      </Routes>
    </AppShell>
  );
}
```

## 🏗️ Required Components

### 1. ID Navigation Sidebar
```tsx
// apps/layera-id/src/components/IdNavigation.tsx
import { NavigationSidebar, NavItem } from '@layera/layout';

export const IdNavigation: React.FC = () => {
  return (
    <NavigationSidebar>
      <NavItem
        icon={<DashboardIcon />}
        label="Dashboard"
        to="/dashboard"
        badge={3}  // Notifications count
      />
      <NavItem
        icon={<UserIcon />}
        label="Account"
        to="/account"
      />
      <NavItem
        icon={<SettingsIcon />}
        label="Settings"
        to="/settings"
      />
      <NavSection title="Administration">
        <NavItem
          icon={<UsersIcon />}
          label="User Management"
          to="/admin/users"
          permission="admin"
        />
        <NavItem
          icon={<RolesIcon />}
          label="Roles & Permissions"
          to="/admin/roles"
          permission="admin"
        />
      </NavSection>
    </NavigationSidebar>
  );
};
```

### 2. ID Header Actions
```tsx
// apps/layera-id/src/components/IdHeaderActions.tsx
export const IdHeaderActions: React.FC = () => {
  return (
    <HeaderActionsGroup>
      <NotificationBell />
      <ThemeToggle />
      <UserProfileMenu />
    </HeaderActionsGroup>
  );
};
```

### 3. Page Container Standardization
```tsx
// Όλες οι pages θα χρησιμοποιούν:
import { PageContainer, PageHeader } from '@layera/layout';

export const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your account activity"
        actions={<DashboardActions />}
      />
      <DashboardContent />
    </PageContainer>
  );
};
```

## 📄 Page-by-Page Migration

### 1. Dashboard Page
**Current**: Custom grid με hardcoded cards
**Target**: Standardized dashboard layout
```tsx
// apps/layera-id/src/pages/Dashboard.tsx
import { DashboardGrid, DashboardCard } from '@layera/cards';

export const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader title="Dashboard" />
      <DashboardGrid columns={{ xs: 1, md: 2, lg: 3 }}>
        <DashboardCard title="Recent Activity" variant="stats">
          <ActivityStats />
        </DashboardCard>
        <DashboardCard title="Account Status" variant="status">
          <AccountStatus />
        </DashboardCard>
        <DashboardCard title="Quick Actions" variant="actions">
          <QuickActions />
        </DashboardCard>
      </DashboardGrid>
    </PageContainer>
  );
};
```

### 2. Account Page
**Current**: Custom form layout
**Target**: Standardized form patterns
```tsx
// apps/layera-id/src/pages/Account.tsx
import { FormContainer, FormSection } from '@layera/patterns';

export const Account: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Account Settings"
        subtitle="Manage your profile and preferences"
      />
      <FormContainer>
        <FormSection title="Profile Information">
          <ProfileForm />
        </FormSection>
        <FormSection title="Security Settings">
          <SecurityForm />
        </FormSection>
        <FormSection title="Preferences">
          <PreferencesForm />
        </FormSection>
      </FormContainer>
    </PageContainer>
  );
};
```

### 3. Settings Page
**Current**: Custom tabs
**Target**: Standardized tab patterns
```tsx
// apps/layera-id/src/pages/Settings.tsx
import { TabContainer, TabPanel } from '@layera/patterns';

export const Settings: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader title="Settings" />
      <TabContainer>
        <TabPanel label="General" icon={<GeneralIcon />}>
          <GeneralSettings />
        </TabPanel>
        <TabPanel label="Privacy" icon={<PrivacyIcon />}>
          <PrivacySettings />
        </TabPanel>
        <TabPanel label="Notifications" icon={<NotificationIcon />}>
          <NotificationSettings />
        </TabPanel>
      </TabContainer>
    </PageContainer>
  );
};
```

### 4. Admin Roles Page
**Current**: Custom table layout
**Target**: Standardized data table
```tsx
// apps/layera-id/src/pages/AdminRoles.tsx
import { DataTable, TableActions } from '@layera/patterns';

export const AdminRoles: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Manage user roles and system permissions"
        actions={
          <TableActions>
            <Button variant="primary">Add Role</Button>
            <Button variant="secondary">Import</Button>
          </TableActions>
        }
      />
      <DataTable
        data={roles}
        columns={roleColumns}
        pagination
        search
        filter
      />
    </PageContainer>
  );
};
```

## 📱 Responsive Strategy

### Desktop (>1024px)
- Full sidebar navigation
- Multi-column dashboard
- Full-featured tables
- Rich header με όλα τα actions

### Tablet (768px-1024px)
- Collapsible sidebar
- 2-column dashboard
- Responsive tables με horizontal scroll
- Compact header

### Mobile (<768px)
- Bottom navigation
- Single column layout
- Mobile-optimized tables
- Minimal header με hamburger menu

## 🎨 Design System Integration

### Current CSS → Layout Tokens Migration
```css
/* REMOVE: Custom styles */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--la-space-6);
  padding: var(--la-space-md);
}

.card {
  background: white;
  border-radius: var(--la-radius-md);
  padding: var(--la-space-md);
  box-shadow: var(--la-shadow-sm);
}

/* REPLACE WITH: Layout tokens */
.layera-dashboard-grid {
  gap: var(--layera-space-lg);
  padding: var(--layera-space-lg);
}

.layera-card {
  padding: var(--layera-card-padding);
  border-radius: var(--layera-card-border-radius);
  box-shadow: var(--layera-card-shadow);
}
```

## 🔄 Migration Steps

### Phase 1: Infrastructure Setup
1. Install @layera/layout package
2. Create IdNavigation component
3. Create IdHeaderActions component
4. Setup routing structure

### Phase 2: Layout Shell
1. Wrap App με AppShell
2. Implement header and sidebar
3. Test navigation flow
4. Fix any routing issues

### Phase 3: Page Migration
1. **Dashboard** → DashboardGrid + DashboardCards
2. **Account** → FormContainer + FormSections
3. **Settings** → TabContainer + TabPanels
4. **AdminRoles** → DataTable patterns

### Phase 4: Cleanup & Polish
1. Remove custom CSS
2. Update component documentation
3. Add responsive testing
4. Performance optimization

## 🧪 Testing Strategy

### Functionality Tests
- [ ] Navigation between pages works
- [ ] User authentication flow
- [ ] Role-based access control
- [ ] Form submissions
- [ ] Data table operations

### Layout Tests
- [ ] Responsive breakpoints
- [ ] Sidebar collapse/expand
- [ ] Header actions functionality
- [ ] Tab navigation
- [ ] Card interactions

### Performance Tests
- [ ] Initial page load
- [ ] Navigation transitions
- [ ] Form rendering
- [ ] Table pagination

## 📚 Component Inventory

### Current Components που θα Migrated
```
apps/layera-id/src/components/
├── Auth.jsx           → Integrated με LayeraHeader
├── Dashboard.jsx      → DashboardGrid + Cards
├── MfaEnroll.jsx      → FormContainer pattern
├── MfaStatus.jsx      → InfoCard pattern
├── RoleBadge.jsx      → Badge component από @layera/patterns
└── Support.jsx        → FormContainer pattern
```

### Current Pages που θα Standardized
```
apps/layera-id/src/pages/
├── Account.jsx        → FormContainer + FormSections
├── AdminRoles.jsx     → DataTable + TableActions
├── Data.jsx           → DataVisualization patterns
└── Settings.jsx       → TabContainer + TabPanels
```

## ⚠️ Migration Risks

### 1. Authentication Flow
- **Risk**: Breaking existing auth logic
- **Mitigation**: Careful testing of auth states

### 2. Role-based Access
- **Risk**: Permission checking με new routing
- **Mitigation**: Maintain existing permission logic

### 3. Form State Management
- **Risk**: Form data loss κατά τη migration
- **Mitigation**: Gradual migration, backup existing functionality

### 4. CSS Conflicts
- **Risk**: Existing styles conflicting με layout system
- **Mitigation**: CSS modules ή scoped styling

## ✅ Success Metrics

- [ ] Consistent navigation across all pages
- [ ] Responsive behavior on all devices
- [ ] No functionality regressions
- [ ] Performance maintained or improved
- [ ] Code reduction >40%
- [ ] Developer experience improved

## 🚀 Future Enhancements

### Phase 2: Advanced Features
- Real-time notifications integration
- Advanced user management UI
- Role-based dashboard customization
- Multi-tenant support UI

### Phase 3: Integration Features
- SSO integration UI
- API management interface
- Advanced analytics dashboard
- User behavior tracking UI

---

**Αυτό το migration plan θα εκτελεστεί σταδιακά για να αποφευχθούν regressions.**