import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { LinkSensorDialog } from "@/components/LinkSensorDialog";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit } from "lucide-react";

type Sensor = {
  id: number;
  name: string;
  createdAt: string;
  macAddress: string;
  status: boolean;
};

const sensors: Sensor[] = [
  {
    id: 1,
    name: "Umidade de Solo",
    createdAt: "15/03/2023",
    macAddress: "00:1B:44:11:3A:B1",
    status: true,
  },
  {
    id: 2,
    name: "Temperature Sensor",
    createdAt: "20/04/2023",
    macAddress: "00:2D:AA:22:9C:E3",
    status: false,
  },
  {
    id: 3,
    name: "Air Quality Monitor",
    createdAt: "10/06/2023",
    macAddress: "00:7F:88:9F:45:12",
    status: true,
  },
  {
    id: 4,
    name: "Motion Detector",
    createdAt: "05/07/2023",
    macAddress: "00:F5:2B:8E:73:6F",
    status: true,
  },
];

export function Sensors() {
  const locationColumns = useMemo<ColumnDef<Sensor>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Selecionar linha"
          />
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name",
        header: "Nome",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "createdAt",
        header: "Data de Vinculação",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "macAddress",
        header: "Endreço MAC",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          return info.getValue<boolean>() ? (
            <span className="font-semibold text-green-600">Ativo</span>
          ) : (
            <span className="font-semibold text-red-500">Inativo</span>
          );
        },
      },
      {
        id: "edit",
        header: "Editar",
        cell: (info) => {
          return (
            <button onClick={() => alert(info.row.original.id)}>
              <Edit className="transition-opacity hover:opacity-60" />
              <span className="sr-only">Editar</span>
            </button>
          );
        },
      },
    ],
    []
  );

  const [searchedTerm, setSearchedTerm] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: sensors,
    columns: locationColumns,
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
    <>
      <SectionTitle>Sensores</SectionTitle>
      <div>
        <div className="mb-16 flex items-center justify-between">
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
          <div className="space-x-8">
            <Button variant={"noBorder"}>Excluir</Button>
            <LinkSensorDialog
              trigger={<Button variant={"primary"}>Novo Sensor</Button>}
            />
          </div>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
