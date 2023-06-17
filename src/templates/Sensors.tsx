import { Checkbox } from "@/components/Checkbox/Checkbox";
import { DataTable } from "@/components/DataTable/DataTable";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

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
          return info.getValue() ? (
            <span className="font-semibold text-green-600">Ativo</span>
          ) : (
            <span className="font-semibold text-red-500">Inativo</span>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <SectionTitle>Locations</SectionTitle>
      <DataTable columns={locationColumns} data={sensors} />
    </>
  );
}
