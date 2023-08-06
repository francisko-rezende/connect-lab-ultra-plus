import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { LocationDialog } from "@/components/LocationDialog";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { GetLocationsOutputItem } from "@/types/GetLocationsOutputItem";
import { trpc } from "@/utils/trpc";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export function Locations() {
  const columns = useMemo<ColumnDef<GetLocationsOutputItem>[]>(
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
            <LocationDialog
              locationData={info.row.original}
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

  const utils = trpc.useContext();

  const deleteLocationsMutation = trpc.deleteLocations.useMutation({
    onSuccess: () => {
      table.resetRowSelection();
      utils.getLocations.invalidate();
    },
  });

  const locationsQuery = trpc.getLocations.useQuery();
  const { data: locations } = locationsQuery;

  const [searchedTerm, setSearchedTerm] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: locations || [],
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
            <Button
              disabled={!Object.entries(rowSelection).length}
              onClick={() => {
                const idsToDelete = table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.id);

                toast.promise(
                  deleteLocationsMutation.mutateAsync(idsToDelete),
                  {
                    loading: "Processando...",
                    success: "Conta criada!",
                    error: (error) => {
                      return error.message;
                    },
                  },
                  {
                    style: {
                      minWidth: "250px",
                    },
                    success: {
                      duration: 5000,
                      icon: "✅",
                    },
                    error: {
                      duration: 5000,
                      icon: "❌",
                    },
                  }
                );
              }}
              variant={"noBorder"}
            >
              Excluir
            </Button>
            <LocationDialog
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
