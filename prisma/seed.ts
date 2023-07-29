import { prisma } from "../src/lib/prisma/prismaClient";
import { Prisma } from "@prisma/client";

const sensorTypes: Prisma.SensorTypeCreateInput[] = [
  {
    sensorTypeName: "Sensor de Umidade do Solo",
    sensorType: "umidade_do_solo",
    minRange: 0,
    maxRange: 100,
    barcode: "123456789",
    batch: "ABC123",
  },
  {
    sensorTypeName: "Sensor de Umidade",
    sensorType: "umidade",
    minRange: 0,
    maxRange: 100,
    barcode: "456789123",
    batch: "GHI789",
  },
  {
    sensorTypeName: "Sensor de Temperatura",
    sensorType: "temperatura",
    minRange: -50,
    maxRange: 50,
    barcode: "987654321",
    batch: "DEF456",
  },
  {
    sensorTypeName: "Sensor de Temperatura do Solo",
    sensorType: "temperatura_do_solo",
    minRange: -50,
    maxRange: 50,
    barcode: "321654987",
    batch: "JKL012",
  },
];

async function main() {
  const sensors = await prisma.sensorType.findMany();
  const hasBeenSeeded = sensors.length === sensorTypes.length;
  if (hasBeenSeeded) return;

  await prisma.sensorType.createMany({
    data: sensorTypes,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
