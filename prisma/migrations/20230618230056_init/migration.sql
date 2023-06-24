-- CreateTable
CREATE TABLE "Company" (
    "companyId" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);
