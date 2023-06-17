import { Checkbox } from "@/components/Checkbox/Checkbox";
import { DataTable } from "@/components/DataTable/DataTable";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

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
    ],
    []
  );

  return (
    <>
      <SectionTitle>Locations</SectionTitle>
      <DataTable columns={columns} data={locations} />
    </>
  );
}
