/*
  Warnings:

  - Added the required column `sensorTypeId` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sensor" ADD COLUMN     "sensorTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_sensorTypeId_fkey" FOREIGN KEY ("sensorTypeId") REFERENCES "SensorType"("sensorTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
