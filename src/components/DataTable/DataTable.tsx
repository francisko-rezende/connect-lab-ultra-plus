import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setSearchedTerm,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      globalFilter: searchedTerm,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="relative flex items-center">
        <svg
          className="absolute"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11"
            cy="11.5"
            r="6.5"
            stroke="#9395A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.519 16.485 19.043 20"
            stroke="#9395A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          className="max-w-[350px] flex-1 rounded border-none pl-8"
          type="search"
          placeholder="Digite para filtrar os dados pelo nome..."
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="">
        <table className=" w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-b-2 border-gray-300" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="py-5 font-medium" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="border-b-2 border-gray-300 last-of-type:border-none"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-5 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
