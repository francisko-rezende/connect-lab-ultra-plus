-- CreateTable
CREATE TABLE "SensorType" (
    "sensorTypeId" SERIAL NOT NULL,
    "sensorTypeName" TEXT NOT NULL,
    "sensorType" TEXT NOT NULL,
    "minRange" INTEGER NOT NULL,
    "maxRange" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "batch" TEXT NOT NULL,

    CONSTRAINT "SensorType_pkey" PRIMARY KEY ("sensorTypeId")
);
