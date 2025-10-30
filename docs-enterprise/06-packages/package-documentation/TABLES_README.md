# @layera/tables

Enterprise data table components with sorting, filtering, pagination, and bulk actions.

## 🚀 Installation

```bash
npm install @layera/tables
```

## 📦 Components

### DataTable
The main table component with full enterprise features.

```tsx
import { DataTable } from '@layera/tables';
import { USER_ROLES, TABLE_COLUMN_WIDTHS, FILTER_TYPES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';
import { EditIcon, DeleteIcon } from '@layera/icons';

const { t } = useLayeraTranslation();

const columns = [
  {
    key: 'name',
    title: t('tables.headers.name'),
    sortable: true,
    width: TABLE_COLUMN_WIDTHS.STANDARD
  },
  {
    key: 'email',
    title: t('tables.headers.email'),
    sortable: true,
    filterable: true
  },
  {
    key: 'role',
    title: t('tables.headers.role'),
    render: (value) => <RoleBadge role={value} />,
    filterable: true,
    filterType: FILTER_TYPES.SELECT,
    filterOptions: Object.values(USER_ROLES).map(role => ({
      value: role,
      label: t(`roles.${role}`)
    }))
  },
  {
    key: 'actions',
    title: t('tables.headers.actions'),
    render: (value, row) => (
      <ActionMenu>
        <ActionItem
          onClick={() => editUser(row.id)}
          icon={<EditIcon />}
        >
          {t('actions.edit')}
        </ActionItem>
        <ActionItem
          onClick={() => deleteUser(row.id)}
          icon={<DeleteIcon />}
          variant="danger"
        >
          {t('actions.delete')}
        </ActionItem>
      </ActionMenu>
    )
  }
];

<DataTable
  data={users}
  columns={columns}
  sortable
  filterable
  selectable
  pagination={{
    pageSize: 20,
    showSizeSelector: true
  }}
  onRowSelect={handleRowSelect}
  onBulkAction={handleBulkAction}
/>
```

### Table Building Blocks
Lower-level components for custom table implementations.

```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@layera/tables';

<Table>
  <TableHeader>
    <TableRow>
      <TableCell header>Name</TableCell>
      <TableCell header sortable onSort={handleSort}>
        Email
      </TableCell>
      <TableCell header>Actions</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id} selectable onSelect={handleSelect}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          <Button size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 🔍 Advanced Features

### Filtering
```tsx
// Built-in filter types
const columns = [
  {
    key: 'name',
    title: 'Name',
    filterable: true,
    filterType: 'text' // text, select, date, number
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    filterType: 'select',
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  }
];

// Custom filter component
const CustomFilter = ({ value, onChange }) => (
  <Input
    value={value}
    onChange={onChange}
    placeholder="Search users..."
  />
);

<DataTable
  columns={columns}
  filterComponent={CustomFilter}
  onFilterChange={handleFilterChange}
/>
```

### Bulk Actions
```tsx
const bulkActions = [
  {
    key: 'activate',
    label: 'Activate Users',
    icon: <CheckIcon />,
    action: activateUsers
  },
  {
    key: 'deactivate',
    label: 'Deactivate Users',
    icon: <XIcon />,
    action: deactivateUsers,
    variant: 'danger'
  },
  {
    key: 'export',
    label: 'Export Selected',
    icon: <DownloadIcon />,
    action: exportUsers
  }
];

<DataTable
  selectable
  bulkActions={bulkActions}
  onBulkAction={handleBulkAction}
/>
```

### Export Functionality
```tsx
import { useTableExport } from '@layera/tables';

const { exportToCsv, exportToExcel, exportToPdf } = useTableExport();

const handleExport = (format) => {
  const exportData = {
    data: filteredData,
    columns: visibleColumns,
    filename: 'users-export'
  };

  switch (format) {
    case 'csv':
      exportToCsv(exportData);
      break;
    case 'excel':
      exportToExcel(exportData);
      break;
    case 'pdf':
      exportToPdf(exportData);
      break;
  }
};
```

## 📱 Responsive Design

### Mobile Optimization
```tsx
<DataTable
  responsive={{
    breakpoint: 'md',
    stackedLayout: true,
    hideColumns: ['created_at', 'updated_at']
  }}
  mobileCard={(row) => (
    <MobileCard>
      <CardHeader>{row.name}</CardHeader>
      <CardContent>{row.email}</CardContent>
      <CardActions>
        <Button size="sm">Edit</Button>
      </CardActions>
    </MobileCard>
  )}
/>
```

## 🎯 Props Reference

### DataTable Props
```typescript
interface DataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  pagination?: PaginationConfig;
  bulkActions?: BulkAction[];
  responsive?: ResponsiveConfig;
  onRowSelect?: (selectedRows: any[]) => void;
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filters: FilterConfig) => void;
  onPageChange?: (page: number, pageSize: number) => void;
}

interface Column {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number';
  filterOptions?: Option[];
  render?: (value: any, row: any, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}
```

## 🎨 Styling

### CSS Custom Properties
```css
:root {
  --layera-table-border: var(--la-color-primary);
  --layera-table-header-bg: var(--la-color-primary);
  --layera-table-hover: var(--la-color-primary);
  --layera-table-selected: var(--la-color-primary);
  --layera-table-font-size: 0.875rem;
}
```

### Customization
```tsx
<DataTable
  className="la-component"
  rowClassName={(row, index) =>
    row.status === 'inactive' ? 'inactive-row' : ''
  }
  cellClassName={(value, column, row) =>
    column.key === 'email' && !row.emailVerified ? 'unverified-email' : ''
  }
/>
```

## ♿ Accessibility

- **ARIA labels** for all interactive elements
- **Keyboard navigation** with arrow keys
- **Screen reader** announcements for sorting and filtering
- **Focus management** for modal filters
- **High contrast** support

---

**Status**: 🚧 Planned (Not implemented yet)
**Priority**: High
**Dependencies**: @layera/layout, @layera/buttons, @layera/forms