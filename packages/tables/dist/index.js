"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BULK_ACTIONS: () => import_constants4.BULK_ACTIONS,
  COLUMN_TYPES: () => import_constants4.COLUMN_TYPES,
  DataTable: () => DataTable,
  EXPORT_FORMATS: () => import_constants4.EXPORT_FORMATS,
  FILTER_TYPES: () => import_constants4.FILTER_TYPES,
  LAYERA_TABLES_VERSION: () => LAYERA_TABLES_VERSION,
  PAGINATION_SIZES: () => import_constants4.PAGINATION_SIZES,
  SORT_DIRECTIONS: () => import_constants4.SORT_DIRECTIONS,
  TABLE_COLUMN_WIDTHS: () => import_constants4.TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES: () => import_constants4.TABLE_DENSITIES,
  TABLE_VARIANTS: () => import_constants4.TABLE_VARIANTS,
  TableBody: () => TableBody,
  TableHeader: () => TableHeader,
  TablePagination: () => TablePagination,
  TableToolbar: () => TableToolbar
});
module.exports = __toCommonJS(index_exports);

// src/components/DataTable/DataTable.tsx
var import_react2 = require("react");
var import_constants3 = require("@layera/constants");
var import_i18n5 = require("@layera/i18n");

// src/components/DataTable/TableHeader.tsx
var import_constants = require("@layera/constants");
var import_i18n = require("@layera/i18n");
var import_jsx_runtime = require("react/jsx-runtime");
var TableHeader = ({
  columns,
  selectable,
  allSelected,
  someSelected,
  onSelectAll,
  sortBy,
  sortDirection,
  onSort
}) => {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const handleCheckboxChange = (e) => {
    onSelectAll(e.target.checked);
  };
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor", opacity: "0.3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor", opacity: "0.3" })
      ] });
    }
    if (sortDirection === import_constants.SORT_DIRECTIONS.ASC) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon layera-table-header__sort-icon--active", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor", opacity: "0.3" })
      ] });
    }
    if (sortDirection === import_constants.SORT_DIRECTIONS.DESC) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon layera-table-header__sort-icon--active", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor", opacity: "0.3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor" })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "layera-table-header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "layera-table-header__row", children: [
    selectable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "layera-table-header__cell layera-table-header__cell--checkbox", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        type: "checkbox",
        checked: allSelected,
        ref: (input) => {
          if (input) input.indeterminate = someSelected;
        },
        onChange: handleCheckboxChange,
        "aria-label": allSelected ? t("tables.selectNone") : t("tables.selectAll"),
        className: "layera-table-header__checkbox"
      }
    ) }),
    columns.map((column) => {
      const resolvedTitle = column.titleKey ? t(column.titleKey) : column.title;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "th",
        {
          className: [
            "layera-table-header__cell",
            column.sortable && "layera-table-header__cell--sortable",
            column.align && `layera-table-header__cell--${column.align}`,
            column.fixed && `layera-table-header__cell--fixed-${column.fixed}`
          ].filter(Boolean).join(" "),
          style: {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
          },
          onClick: column.sortable ? () => onSort(column.key) : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-table-header__content", children: column.headerRender ? column.headerRender() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "layera-table-header__title", children: resolvedTitle }),
            column.sortable && getSortIcon(column.key)
          ] }) })
        },
        column.key
      );
    })
  ] }) });
};

// src/components/DataTable/TableBody.tsx
var import_i18n2 = require("@layera/i18n");
var import_jsx_runtime2 = require("react/jsx-runtime");
var TableBody = ({
  data,
  columns,
  loading,
  selectable,
  selectedRows,
  onRowSelect,
  onRowClick,
  getRowKey,
  emptyState
}) => {
  const { t } = (0, import_i18n2.useLayeraTranslation)();
  const handleRowCheckboxChange = (rowKey, checked) => {
    onRowSelect(rowKey, checked);
  };
  const handleRowClick = (row, index, event) => {
    if (event.target.closest("input, button, a")) {
      return;
    }
    onRowClick?.(row, index);
  };
  if (!loading && data.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { className: "layera-table-body", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { className: "layera-table-body__empty-row", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "td",
      {
        colSpan: columns.length + (selectable ? 1 : 0),
        className: "layera-table-body__empty-cell",
        children: emptyState || /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-table-body__empty-state", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-table-body__empty-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: "48", height: "48", viewBox: "0 0 48 48", fill: "none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "path",
              {
                d: "M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z",
                stroke: "currentColor",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "path",
              {
                d: "M14 18H34M14 24H26M14 30H30",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "layera-table-body__empty-title", children: t("tables.noData.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "layera-table-body__empty-description", children: t("tables.noData.description") })
        ] })
      }
    ) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { className: "layera-table-body", children: data.map((row, index) => {
    const rowKey = getRowKey(row, index);
    const isSelected = selectedRows.includes(rowKey);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "tr",
      {
        className: [
          "layera-table-body__row",
          isSelected && "layera-table-body__row--selected",
          onRowClick && "layera-table-body__row--clickable"
        ].filter(Boolean).join(" "),
        onClick: onRowClick ? (e) => handleRowClick(row, index, e) : void 0,
        children: [
          selectable && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "layera-table-body__cell layera-table-body__cell--checkbox", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              type: "checkbox",
              checked: isSelected,
              onChange: (e) => handleRowCheckboxChange(rowKey, e.target.checked),
              "aria-label": t("tables.selectRow", { index: index + 1 }),
              className: "layera-table-body__checkbox"
            }
          ) }),
          columns.map((column) => {
            const value = row[column.key];
            const cellContent = column.render ? column.render(value, row, index) : String(value || "");
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "td",
              {
                className: [
                  "layera-table-body__cell",
                  column.align && `layera-table-body__cell--${column.align}`,
                  column.fixed && `layera-table-body__cell--fixed-${column.fixed}`
                ].filter(Boolean).join(" "),
                style: {
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-table-body__content", children: cellContent })
              },
              column.key
            );
          })
        ]
      },
      rowKey
    );
  }) });
};

// src/components/DataTable/TablePagination.tsx
var import_react = __toESM(require("react"));
var import_constants2 = require("@layera/constants");
var import_i18n3 = require("@layera/i18n");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TablePagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange
}) => {
  const { t } = (0, import_i18n3.useLayeraTranslation)();
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);
  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, page - 2);
      const end = Math.min(totalPages, page + 2);
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };
  if (total === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-table-pagination", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-table-pagination__info", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "layera-table-pagination__results", children: t("tables.pagination.showing", {
        start: startIndex,
        end: endIndex,
        total
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-table-pagination__page-size", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { htmlFor: "page-size", className: "layera-table-pagination__page-size-label", children: [
          t("tables.pagination.itemsPerPage"),
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "select",
          {
            id: "page-size",
            value: pageSize,
            onChange: handlePageSizeChange,
            className: "layera-table-pagination__page-size-select",
            children: Object.values(import_constants2.PAGINATION_SIZES).map((size) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: size, children: size }, size))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-table-pagination__controls", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: handlePrevious,
          disabled: page <= 1,
          className: "layera-table-pagination__button",
          "aria-label": t("tables.pagination.previous"),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              d: "M10 12L6 8L10 4",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-table-pagination__pages", children: getPageNumbers().map((pageNum, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react.default.Fragment, { children: typeof pageNum === "number" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: () => onPageChange(pageNum),
          className: [
            "layera-table-pagination__page",
            pageNum === page && "layera-table-pagination__page--active"
          ].filter(Boolean).join(" "),
          children: pageNum
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "layera-table-pagination__ellipsis", children: pageNum }) }, index)) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: handleNext,
          disabled: page >= totalPages,
          className: "layera-table-pagination__button",
          "aria-label": t("tables.pagination.next"),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              d: "M6 4L10 8L6 12",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      )
    ] })
  ] });
};

// src/components/DataTable/TableToolbar.tsx
var import_i18n4 = require("@layera/i18n");
var import_jsx_runtime4 = require("react/jsx-runtime");
var TableToolbar = ({
  searchable,
  searchValue,
  onSearch,
  selectedCount,
  totalCount,
  bulkActions,
  toolbar
}) => {
  const { t } = (0, import_i18n4.useLayeraTranslation)();
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  const hasSelection = selectedCount > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-table-toolbar", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-table-toolbar__primary", children: hasSelection ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "layera-table-toolbar__selection", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "layera-table-toolbar__selection-text", children: t("tables.selectedCount", { count: selectedCount, total: totalCount }) }),
    bulkActions && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-table-toolbar__bulk-actions", children: bulkActions })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    searchable && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "layera-table-toolbar__search", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          value: searchValue,
          onChange: handleSearchChange,
          placeholder: t("tables.search.placeholder"),
          className: "layera-table-toolbar__search-input"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-table-toolbar__search-icon", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "path",
          {
            d: "M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "path",
          {
            d: "M14 14L11.1 11.1",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    toolbar && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-table-toolbar__actions", children: toolbar })
  ] }) }) });
};

// src/components/DataTable/DataTable.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var DataTable = ({
  data,
  columns,
  loading = false,
  variant = import_constants3.TABLE_VARIANTS.DEFAULT,
  density = import_constants3.TABLE_DENSITIES.NORMAL,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortBy,
  sortDirection = import_constants3.SORT_DIRECTIONS.NONE,
  onSort,
  pagination,
  searchable = false,
  searchValue = "",
  onSearch,
  bulkActions,
  toolbar,
  emptyState,
  className = "",
  rowKey = "id",
  onRowClick
}) => {
  const { t } = (0, import_i18n5.useLayeraTranslation)();
  const [internalSearchValue, setInternalSearchValue] = (0, import_react2.useState)(searchValue);
  const getRowKey = (row, index) => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    return String(row[rowKey] || index);
  };
  const handleSelectAll = (checked) => {
    if (!onSelectionChange) return;
    if (checked) {
      const allKeys = data.map((row, index) => getRowKey(row, index));
      onSelectionChange(allKeys);
    } else {
      onSelectionChange([]);
    }
  };
  const handleRowSelect = (rowKey2, checked) => {
    if (!onSelectionChange) return;
    const newSelection = checked ? [...selectedRows, rowKey2] : selectedRows.filter((key) => key !== rowKey2);
    onSelectionChange(newSelection);
  };
  const handleSort = (key) => {
    if (!onSort) return;
    let newDirection = import_constants3.SORT_DIRECTIONS.ASC;
    if (sortBy === key) {
      if (sortDirection === import_constants3.SORT_DIRECTIONS.ASC) {
        newDirection = import_constants3.SORT_DIRECTIONS.DESC;
      } else if (sortDirection === import_constants3.SORT_DIRECTIONS.DESC) {
        newDirection = import_constants3.SORT_DIRECTIONS.NONE;
      }
    }
    onSort(key, newDirection);
  };
  const handleSearch = (value) => {
    setInternalSearchValue(value);
    onSearch?.(value);
  };
  const tableClasses = [
    "layera-data-table",
    `layera-data-table--${variant}`,
    `layera-data-table--${density}`,
    loading && "layera-data-table--loading",
    className
  ].filter(Boolean).join(" ");
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: tableClasses, children: [
    (searchable || toolbar || bulkActions) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      TableToolbar,
      {
        searchable,
        searchValue: internalSearchValue,
        onSearch: handleSearch,
        selectedCount: selectedRows.length,
        totalCount: data.length,
        bulkActions,
        toolbar
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "layera-data-table__container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("table", { className: "layera-data-table__table", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          TableHeader,
          {
            columns,
            selectable,
            allSelected,
            someSelected,
            onSelectAll: handleSelectAll,
            sortBy,
            sortDirection,
            onSort: handleSort
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          TableBody,
          {
            data,
            columns,
            loading,
            selectable,
            selectedRows,
            onRowSelect: handleRowSelect,
            onRowClick,
            getRowKey,
            emptyState
          }
        )
      ] }),
      loading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "layera-data-table__loading-overlay", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "layera-data-table__loading-spinner", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "layera-spinner" }) }) })
    ] }),
    pagination && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      TablePagination,
      {
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onPageChange: pagination.onPageChange,
        onPageSizeChange: pagination.onPageSizeChange
      }
    )
  ] });
};

// src/index.ts
var import_constants4 = require("@layera/constants");
var LAYERA_TABLES_VERSION = "1.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BULK_ACTIONS,
  COLUMN_TYPES,
  DataTable,
  EXPORT_FORMATS,
  FILTER_TYPES,
  LAYERA_TABLES_VERSION,
  PAGINATION_SIZES,
  SORT_DIRECTIONS,
  TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES,
  TABLE_VARIANTS,
  TableBody,
  TableHeader,
  TablePagination,
  TableToolbar
});
