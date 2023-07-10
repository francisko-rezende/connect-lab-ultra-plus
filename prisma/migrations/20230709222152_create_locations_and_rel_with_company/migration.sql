-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "locationName" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;
