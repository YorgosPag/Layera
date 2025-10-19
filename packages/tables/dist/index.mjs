// src/components/DataTable/DataTable.tsx
import { useState } from "react";
import {
  TABLE_VARIANTS,
  TABLE_DENSITIES,
  SORT_DIRECTIONS as SORT_DIRECTIONS2
} from "@layera/constants";
import { useLayeraTranslation as useLayeraTranslation5 } from "@layera/i18n";

// src/components/DataTable/TableHeader.tsx
import { SORT_DIRECTIONS } from "@layera/constants";
import { useLayeraTranslation } from "@layera/i18n";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const { t } = useLayeraTranslation();
  const handleCheckboxChange = (e) => {
    onSelectAll(e.target.checked);
  };
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) {
      return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon", children: [
        /* @__PURE__ */ jsx("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor", opacity: "0.3" }),
        /* @__PURE__ */ jsx("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor", opacity: "0.3" })
      ] });
    }
    if (sortDirection === SORT_DIRECTIONS.ASC) {
      return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon layera-table-header__sort-icon--active", children: [
        /* @__PURE__ */ jsx("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor", opacity: "0.3" })
      ] });
    }
    if (sortDirection === SORT_DIRECTIONS.DESC) {
      return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "layera-table-header__sort-icon layera-table-header__sort-icon--active", children: [
        /* @__PURE__ */ jsx("path", { d: "M6 2L9 5H3L6 2Z", fill: "currentColor", opacity: "0.3" }),
        /* @__PURE__ */ jsx("path", { d: "M6 10L3 7H9L6 10Z", fill: "currentColor" })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsx("thead", { className: "layera-table-header", children: /* @__PURE__ */ jsxs("tr", { className: "layera-table-header__row", children: [
    selectable && /* @__PURE__ */ jsx("th", { className: "layera-table-header__cell layera-table-header__cell--checkbox", children: /* @__PURE__ */ jsx(
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
      return /* @__PURE__ */ jsx(
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
          children: /* @__PURE__ */ jsx("div", { className: "layera-table-header__content", children: column.headerRender ? column.headerRender() : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "layera-table-header__title", children: resolvedTitle }),
            column.sortable && getSortIcon(column.key)
          ] }) })
        },
        column.key
      );
    })
  ] }) });
};

// src/components/DataTable/TableBody.tsx
import { useLayeraTranslation as useLayeraTranslation2 } from "@layera/i18n";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const { t } = useLayeraTranslation2();
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
    return /* @__PURE__ */ jsx2("tbody", { className: "layera-table-body", children: /* @__PURE__ */ jsx2("tr", { className: "layera-table-body__empty-row", children: /* @__PURE__ */ jsx2(
      "td",
      {
        colSpan: columns.length + (selectable ? 1 : 0),
        className: "layera-table-body__empty-cell",
        children: emptyState || /* @__PURE__ */ jsxs2("div", { className: "layera-table-body__empty-state", children: [
          /* @__PURE__ */ jsx2("div", { className: "layera-table-body__empty-icon", children: /* @__PURE__ */ jsxs2("svg", { width: "48", height: "48", viewBox: "0 0 48 48", fill: "none", children: [
            /* @__PURE__ */ jsx2(
              "path",
              {
                d: "M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z",
                stroke: "currentColor",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ jsx2(
              "path",
              {
                d: "M14 18H34M14 24H26M14 30H30",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx2("p", { className: "layera-table-body__empty-title", children: t("tables.noData.title") }),
          /* @__PURE__ */ jsx2("p", { className: "layera-table-body__empty-description", children: t("tables.noData.description") })
        ] })
      }
    ) }) });
  }
  return /* @__PURE__ */ jsx2("tbody", { className: "layera-table-body", children: data.map((row, index) => {
    const rowKey = getRowKey(row, index);
    const isSelected = selectedRows.includes(rowKey);
    return /* @__PURE__ */ jsxs2(
      "tr",
      {
        className: [
          "layera-table-body__row",
          isSelected && "layera-table-body__row--selected",
          onRowClick && "layera-table-body__row--clickable"
        ].filter(Boolean).join(" "),
        onClick: onRowClick ? (e) => handleRowClick(row, index, e) : void 0,
        children: [
          selectable && /* @__PURE__ */ jsx2("td", { className: "layera-table-body__cell layera-table-body__cell--checkbox", children: /* @__PURE__ */ jsx2(
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
            return /* @__PURE__ */ jsx2(
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
                children: /* @__PURE__ */ jsx2("div", { className: "layera-table-body__content", children: cellContent })
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
import React from "react";
import { PAGINATION_SIZES } from "@layera/constants";
import { useLayeraTranslation as useLayeraTranslation3 } from "@layera/i18n";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var TablePagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange
}) => {
  const { t } = useLayeraTranslation3();
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
  return /* @__PURE__ */ jsxs3("div", { className: "layera-table-pagination", children: [
    /* @__PURE__ */ jsxs3("div", { className: "layera-table-pagination__info", children: [
      /* @__PURE__ */ jsx3("span", { className: "layera-table-pagination__results", children: t("tables.pagination.showing", {
        start: startIndex,
        end: endIndex,
        total
      }) }),
      /* @__PURE__ */ jsxs3("div", { className: "layera-table-pagination__page-size", children: [
        /* @__PURE__ */ jsxs3("label", { htmlFor: "page-size", className: "layera-table-pagination__page-size-label", children: [
          t("tables.pagination.itemsPerPage"),
          ":"
        ] }),
        /* @__PURE__ */ jsx3(
          "select",
          {
            id: "page-size",
            value: pageSize,
            onChange: handlePageSizeChange,
            className: "layera-table-pagination__page-size-select",
            children: Object.values(PAGINATION_SIZES).map((size) => /* @__PURE__ */ jsx3("option", { value: size, children: size }, size))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "layera-table-pagination__controls", children: [
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: handlePrevious,
          disabled: page <= 1,
          className: "layera-table-pagination__button",
          "aria-label": t("tables.pagination.previous"),
          children: /* @__PURE__ */ jsx3("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx3(
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
      /* @__PURE__ */ jsx3("div", { className: "layera-table-pagination__pages", children: getPageNumbers().map((pageNum, index) => /* @__PURE__ */ jsx3(React.Fragment, { children: typeof pageNum === "number" ? /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: () => onPageChange(pageNum),
          className: [
            "layera-table-pagination__page",
            pageNum === page && "layera-table-pagination__page--active"
          ].filter(Boolean).join(" "),
          children: pageNum
        }
      ) : /* @__PURE__ */ jsx3("span", { className: "layera-table-pagination__ellipsis", children: pageNum }) }, index)) }),
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: handleNext,
          disabled: page >= totalPages,
          className: "layera-table-pagination__button",
          "aria-label": t("tables.pagination.next"),
          children: /* @__PURE__ */ jsx3("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx3(
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
import { useLayeraTranslation as useLayeraTranslation4 } from "@layera/i18n";
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var TableToolbar = ({
  searchable,
  searchValue,
  onSearch,
  selectedCount,
  totalCount,
  bulkActions,
  toolbar
}) => {
  const { t } = useLayeraTranslation4();
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  const hasSelection = selectedCount > 0;
  return /* @__PURE__ */ jsx4("div", { className: "layera-table-toolbar", children: /* @__PURE__ */ jsx4("div", { className: "layera-table-toolbar__primary", children: hasSelection ? /* @__PURE__ */ jsxs4("div", { className: "layera-table-toolbar__selection", children: [
    /* @__PURE__ */ jsx4("span", { className: "layera-table-toolbar__selection-text", children: t("tables.selectedCount", { count: selectedCount, total: totalCount }) }),
    bulkActions && /* @__PURE__ */ jsx4("div", { className: "layera-table-toolbar__bulk-actions", children: bulkActions })
  ] }) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
    searchable && /* @__PURE__ */ jsxs4("div", { className: "layera-table-toolbar__search", children: [
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "text",
          value: searchValue,
          onChange: handleSearchChange,
          placeholder: t("tables.search.placeholder"),
          className: "layera-table-toolbar__search-input"
        }
      ),
      /* @__PURE__ */ jsx4("div", { className: "layera-table-toolbar__search-icon", children: /* @__PURE__ */ jsxs4("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [
        /* @__PURE__ */ jsx4(
          "path",
          {
            d: "M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx4(
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
    toolbar && /* @__PURE__ */ jsx4("div", { className: "layera-table-toolbar__actions", children: toolbar })
  ] }) }) });
};

// src/components/DataTable/DataTable.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var DataTable = ({
  data,
  columns,
  loading = false,
  variant = TABLE_VARIANTS.DEFAULT,
  density = TABLE_DENSITIES.NORMAL,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortBy,
  sortDirection = SORT_DIRECTIONS2.NONE,
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
  const { t } = useLayeraTranslation5();
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
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
    let newDirection = SORT_DIRECTIONS2.ASC;
    if (sortBy === key) {
      if (sortDirection === SORT_DIRECTIONS2.ASC) {
        newDirection = SORT_DIRECTIONS2.DESC;
      } else if (sortDirection === SORT_DIRECTIONS2.DESC) {
        newDirection = SORT_DIRECTIONS2.NONE;
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
  return /* @__PURE__ */ jsxs5("div", { className: tableClasses, children: [
    (searchable || toolbar || bulkActions) && /* @__PURE__ */ jsx5(
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
    /* @__PURE__ */ jsxs5("div", { className: "layera-data-table__container", children: [
      /* @__PURE__ */ jsxs5("table", { className: "layera-data-table__table", children: [
        /* @__PURE__ */ jsx5(
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
        /* @__PURE__ */ jsx5(
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
      loading && /* @__PURE__ */ jsx5("div", { className: "layera-data-table__loading-overlay", children: /* @__PURE__ */ jsx5("div", { className: "layera-data-table__loading-spinner", children: /* @__PURE__ */ jsx5("div", { className: "layera-spinner" }) }) })
    ] }),
    pagination && /* @__PURE__ */ jsx5(
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
import {
  TABLE_VARIANTS as TABLE_VARIANTS2,
  TABLE_DENSITIES as TABLE_DENSITIES2,
  SORT_DIRECTIONS as SORT_DIRECTIONS3,
  FILTER_TYPES,
  COLUMN_TYPES,
  PAGINATION_SIZES as PAGINATION_SIZES3,
  BULK_ACTIONS,
  EXPORT_FORMATS,
  TABLE_COLUMN_WIDTHS
} from "@layera/constants";
var LAYERA_TABLES_VERSION = "1.0.0";
export {
  BULK_ACTIONS,
  COLUMN_TYPES,
  DataTable,
  EXPORT_FORMATS,
  FILTER_TYPES,
  LAYERA_TABLES_VERSION,
  PAGINATION_SIZES3 as PAGINATION_SIZES,
  SORT_DIRECTIONS3 as SORT_DIRECTIONS,
  TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES2 as TABLE_DENSITIES,
  TABLE_VARIANTS2 as TABLE_VARIANTS,
  TableBody,
  TableHeader,
  TablePagination,
  TableToolbar
};
