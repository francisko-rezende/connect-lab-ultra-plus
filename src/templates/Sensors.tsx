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
import { Search } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { GetSensorsOutputItem } from "@/types/GetSensorsOutputItem";

export function Sensors() {
  const router = useRouter();
  const locationId = (router.query.locationId as string | undefined) || "";

  const sensorsQuery = trpc.getSensors.useQuery(
    { locationId: parseInt(locationId) },
    { enabled: !!locationId }
  );

  const sensors = sensorsQuery.data || [];

  const locationColumns = useMemo<ColumnDef<GetSensorsOutputItem>[]>(
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
        id: "sensorTypeId",
      },
      {
        accessorKey: "sensorId",
        header: "ID",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "sensorName",
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
            <LinkSensorDialog
              sensorData={info.row.original}
              trigger={
                <button>
                  <Edit className="transition-opacity hover:opacity-60" />
                  <span className="sr-only">Editar</span>
                </button>
              }
            />
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
            <Search className="absolute h-5 w-5  text-slate-400" />
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
