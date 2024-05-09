"use client";
import React, { HTMLProps, useState, useEffect } from "react";
import {
  ColumnDef,
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type TableAction = {
  name: string;
  type: "component" | "handler";
  props?: any;
  element: React.JSX.Element | any;
  styles: string;
  icon: any;
};

export type BulkDataOperation = {
  operations: (TableAction | ConditionalTableAction | any)[];
};

export type ConditionalTableAction = {
  conditionKey: string;
  conditionValue: string;
  actions: TableAction[];
};

type TableConfigType<C, D> = {
  source: string;
  loading: boolean;
  columns: C[] | [] | any;
  data: D[] | [];
  actions?: TableAction[];
  conditionalTableAction?: ConditionalTableAction[];
  enableRowSelection?: boolean;
  bulkDataOperations?: BulkDataOperation;
};

/**
 * Action for each rows
 * @param row
 * @param actions
 * @returns
 */

const getActions = (row: any, actions: TableAction[]) => {
  return (
    <td className="px-6 py-3">
      <div className="flex flex-row justify-end items-center gap-2">
        {actions.map((action: TableAction, index) =>
          action.type === "handler" ? (
            <button
              key={index}
              className={action.styles}
              onClick={() => action.element(row)}
            >
              {action.icon ? action.icon : action.name}
            </button>
          ) : (
            <action.element key={index} {...row} {...action.props} />
          )
        )}
      </div>
    </td>
  );
};
const getConditionalActions = (
  row: any,
  conditionalTableActions: ConditionalTableAction[]
) => {
  return (
    <td className="px-6 py-3">
      <div className="flex flex-row justify-end items-center gap-2">
        {conditionalTableActions.map(
          (condition: ConditionalTableAction, index) =>
            row[condition.conditionKey] === condition.conditionValue &&
            condition.actions.map((action: TableAction, idx: number) =>
              action.type === "handler" ? (
                <button
                  key={index}
                  className={action.styles}
                  onClick={() => action.element(row)}
                >
                  {action.icon ? action.icon : action.name}
                </button>
              ) : (
                <action.element key={index} {...row} {...action.props} />
              )
            )
        )}
      </div>
    </td>
  );
};
const showBulkDataOperations = (
  bulkDataOperations: any,
  selectedIds: [] | string[]
): any => {
  if (selectedIds.length === 0) return;

  if (bulkDataOperations) {
    return bulkDataOperations.operations.map((op: any, index: number) => {
      if (op.hasOwnProperty("actions")) {
        return <span key={index}>No Actions</span>;
      } else {
        return (
          <button
            key={index}
            className={`flex flex-row justify-start items-center gap-2 ${op.styles}`}
            onClick={() => op.element(selectedIds)}
          >
            {op.icon} {op.name}
          </button>
        );
      }
    });
  } else {
    return <span>No Actions</span>;
  }
};

const DataTable = <C, D>({
  columns,
  data,
  actions = [],
  source,
  loading,
  conditionalTableAction = [],
  enableRowSelection = false,
  bulkDataOperations,
}: TableConfigType<C, D>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowSelectionIds, setRowSelectionIds] = React.useState<string[]>([]);

  const [datacolumns] = React.useState<any>(() => [...columns]);

  const [columnVisibility, setColumnVisibility] = React.useState({});
  const table = useReactTable({
    columns: columns as ColumnDef<D, any>[],
    data,
    state: {
      rowSelection,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,
  });

  if (enableRowSelection) {
    columns.unshift({
      id: "select",
      header: ({ table }: any) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: any) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    });
  }
  useEffect(() => {
    return function cleanup() {
      setRowSelection([]);
    };
  }, [data]);

  const getSelectedRowsId = (): string[] | [] => {
    let ids: string[] = [];
    if (Object.entries(rowSelection).length > 0) {
      const selectedRows = table.getSelectedRowModel().flatRows;

      selectedRows.forEach((row: Row<any>) => {
        ids.push(row.original["_id"]);
      });
    }
    return ids;
  };

  useEffect(() => {
    setRowSelectionIds(getSelectedRowsId());
  }, [rowSelection]);

  return (
    <>
      <div className=" w-full">
        <div className="grid grid-cols-5  my-3">
          <div className="col-span-1">
            <ColumnSelector table={table} columns={datacolumns} />
          </div>
          <div className="col-span-4">
            {Object.entries(rowSelection).length > 0 && (
              <div className="flex flex-row flex-wrap justify-end items-center gap-2">
                {showBulkDataOperations(bulkDataOperations, rowSelectionIds)}
              </div>
            )}
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 columns-sm whitespace-nowrap"
                    scope="col"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                {actions.length > 0 ||
                (conditionalTableAction &&
                  conditionalTableAction?.length > 0) ? (
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span>Actions</span>
                  </th>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  colSpan={10}
                >
                  Loading ...
                </td>
              </tr>
            )}
            {!loading && data && data.length === 0 && (
              <tr>
                <td
                  className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  colSpan={10}
                >
                  No records found
                </td>
              </tr>
            )}

            {table.getRowModel().rows.map((row: any, index: number) => (
              <tr
                key={row.id}
                className="bg-gray-100 border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 columns-sm whitespace-nowrap truncate"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {actions.length > 0
                  ? getActions(row.original, actions)
                  : conditionalTableAction && conditionalTableAction?.length > 0
                  ? getConditionalActions(row.original, conditionalTableAction)
                  : ""}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION
      <div className="h-2" />
      {data && data.length > 0 && (
        <div className="flex items-center gap-2 w-full">
          <button
            className="border rounded p-1 h-8 w-8 grid place-content-center"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 h-8 w-8 grid place-content-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1 h-8 w-8 grid place-content-center"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 h-8 w-8 grid place-content-center"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div className="text-sm">Page</div>
            <strong className="text-lg">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-sm">| Go to page:</span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 text-sm"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border p-1 rounded text-sm"
          >
            {[10, 20, 30, 40, 50, 100, 150, 200].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )} */}
    </>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

type ColumnSelectorType = {
  table: any;
  columns: any;
};

const ColumnSelector = ({ table, columns }: ColumnSelectorType) => {
  const [open, setOpen] = useState<boolean>(false);

  if (!columns) return;

  return (
    <div className="w-full relative">
      <div className=" p-2 border-2 border-gray-200 dark:border-gray-800 bg-[#ffffff] dark:bg-[#1F2937]">
        <button
          className="w-full  flex flex-row justify-between items-center rounded-sm"
          onClick={() => setOpen(!open)}
        >
          <span className="font-semibold text-xs dark:text-[#ffffff] text-[#000000]">
            Columns Selector
          </span>

          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
        <div className=" shadow-sm">
          <div
            className={`${
              open ? "block" : "hidden"
            } dark:bg-[#1F2937] bg-[#ffffff] `}
          >
            {table.getAllLeafColumns().map((column: any, index: number) => {
              if (column.id !== "select") {
                return (
                  <div
                    key={column.id}
                    className="p-2 border-2 border-gray-200  dark:border-gray-800"
                  >
                    <label className="w-full">
                      <input
                        {...{
                          type: "checkbox",
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />
                      {columns?.map((col: any) => {
                        if (col.id === column.id) {
                          return col.header();
                        }
                      })}
                    </label>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
