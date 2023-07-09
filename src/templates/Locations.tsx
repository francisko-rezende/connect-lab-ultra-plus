import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { CreateLocationDialog } from "@/components/CreateLocationDialog";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  installedSensorsNumber: number;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Campo de Milho",
    latitude: -20.4435,
    longitude: -54.6478,
    installedSensorsNumber: 5,
  },
  {
    id: 2,
    name: "Vineyard",
    latitude: 41.9028,
    longitude: 12.4964,
    installedSensorsNumber: 8,
  },
  {
    id: 3,
    name: "Wheat Field",
    latitude: 47.3769,
    longitude: 8.5417,
    installedSensorsNumber: 3,
  },
  {
    id: 4,
    name: "Orchard",
    latitude: 33.8563,
    longitude: -118.2206,
    installedSensorsNumber: 6,
  },
  {
    id: 5,
    name: "Rice Paddy",
    latitude: 34.6937,
    longitude: 135.5023,
    installedSensorsNumber: 4,
  },
];

export function Locations() {
  const columns = useMemo<ColumnDef<Location>[]>(
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
      },
      {
        accessorKey: "latitude",
        header: "Latitude",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "longitude",
        header: "Longitude",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "installedSensorsNumber",
        header: "Sensores",
      },
      {
        id: "edit",
        header: "Editar",
        cell: (info) => {
          return (
            <button onClick={() => alert(JSON.stringify(info.row.original))}>
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
    data: locations,
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
    <>
      <SectionTitle>Locais</SectionTitle>
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
            <CreateLocationDialog
              trigger={<Button variant={"primary"}>Novo Local</Button>}
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
      {/* <DataTable columns={columns} data={locations} /> */}
    </>
  );
}
