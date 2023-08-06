import * as z from "zod";
import { authedProcedure, procedure, router } from "../trpc";
import { schemas } from "@/lib/zod/schemas";
import { prisma } from "@/lib/prisma/prismaClient";
import * as bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { trpcSchemas } from "@/lib/zod/trpcSchemas";

export const appRouter = router({
  signUp: procedure.input(schemas.signUp).mutation(async (opts) => {
    const { input } = opts;
    const { cnpj, companyName, password, email, phone, responsible } = input;

    const hasCNPJBeenUsed = await prisma.company.findFirst({ where: { cnpj } });

    if (hasCNPJBeenUsed) {
      throw new TRPCError({
        code: "CONFLICT",
        message:
          "Conflict: CNPJ must be unique but already exists in the database.",
      });
    }

    const hasEmailBeenUsed = await prisma.company.findFirst({
      where: { email },
    });

    if (hasEmailBeenUsed) {
      throw new TRPCError({
        code: "CONFLICT",
        message:
          "Conflict: Email must be unique but already exists in the database.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCompanyData = {
      cnpj,
      companyName,
      password: hashedPassword,
      email,
      phone,
      responsible,
      salt,
    };

    const newCompany = await prisma.company.create({ data: newCompanyData });

    return newCompany;
  }),
  updateCompany: authedProcedure
    .input(schemas.editProfile)
    .mutation(async ({ ctx, input }) => {
      const companyData = await prisma.company.findFirst({
        where: {
          email: ctx.session?.user?.email!,
        },
      });

      if (!!input.password) {
        const newPasswordHashed = await bcrypt.hash(
          input.password,
          companyData!.salt
        );

        const { cnpj, companyName, responsible, email, phone } =
          await prisma.company.update({
            where: { email: ctx.session?.user?.email! },
            data: {
              password: newPasswordHashed,
              phone: input.phone,
            },
          });
        return { cnpj, companyName, responsible, email, phone };
      }

      await prisma.company.update({
        where: { email: ctx.session?.user?.email! },
        data: {
          phone: input.phone,
        },
      });
    }),
  me: authedProcedure.query(async ({ ctx }) => {
    const companyData = await prisma.company.findFirst({
      where: {
        email: ctx.session?.user?.email!,
      },
    });

    const loggedInCompany = {
      companyName: companyData!.companyName,
      cnpj: companyData!.cnpj,
      responsible: companyData!.responsible,
      email: companyData!.email,
      phone: companyData!.phone,
    };

    return loggedInCompany;
  }),
  sensorTypes: authedProcedure.query(() => {
    return prisma.sensorType.findMany();
  }),
  getSensors: authedProcedure
    .input(trpcSchemas.getSensors)
    .query(async ({ input, ctx }) => {
      const company = await prisma.company.findFirst({
        where: { email: ctx.session?.user?.email! },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bad request: Logged in company not found.",
        });
      }

      const { locationId } = input;
      const { email } = company;

      const dbSensors = await prisma.sensor.findMany({
        where: {
          location: { locationId, company: { email } },
        },
      });

      const formatDate = (date: Date) =>
        new Intl.DateTimeFormat("pt-BR").format(date);

      const sensors = dbSensors.map(
        ({
          sensorId,
          sensorName,
          createdAt,
          macAddress,
          status,
          sensorTypeId,
        }) => ({
          sensorTypeId,
          sensorId,
          sensorName,
          createdAt: formatDate(createdAt),
          macAddress: macAddress,
          status: status,
        })
      );

      return sensors;
    }),
  linkSensor: authedProcedure
    .input(trpcSchemas.linkSensor)
    .mutation(async ({ input, ctx }) => {
      const company = await prisma.company.findFirst({
        where: { email: ctx.session?.user?.email! },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bad request: Logged in company not found.",
        });
      }

      const { sensorData, locationId } = input;

      const newLinkedSensorData = {
        ...sensorData,
        locationId,
        sensorTypeId: Number(sensorData.sensorTypeId),
        status: sensorData.status === "true" ? true : false,
      };
      const newLinkedSensor = await prisma.sensor.create({
        data: newLinkedSensorData,
      });
      return newLinkedSensor;
    }),
  getLocations: authedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.session?.user?.email;

    if (!userEmail) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized: session is invalid or has expired",
      });
    }

    const dbLocations = await prisma.location.findMany({
      where: { company: { email: userEmail } },
      include: {
        _count: {
          select: { sensors: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const locations = dbLocations.map((dbLocation) => ({
      id: dbLocation.locationId,
      installedSensorsNumber: dbLocation._count.sensors,
      latitude: Number(dbLocation.latitude),
      longitude: Number(dbLocation.longitude),
      name: dbLocation.locationName,
    }));

    return locations;
  }),
  deleteLocations: authedProcedure
    .input(z.array(z.number()))
    .mutation(async ({ input, ctx }) => {
      const userEmail = ctx.session?.user?.email;

      if (!userEmail) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized: session is invalid or has expired",
        });
      }

      try {
        await prisma.location.deleteMany({
          where: {
            company: {
              email: userEmail,
            },
            locationId: {
              in: input,
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Não é possível deletar locais que têm dispositivos vinculados.",
            });
          }
        }
      }
    }),
  updateLocation: authedProcedure
    .input(trpcSchemas.updateLocation)
    .mutation(async ({ input, ctx }) => {
      const company = await prisma.company.findFirst({
        where: { email: ctx.session?.user?.email! },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bad request: Logged in company not found.",
        });
      }

      const updatedLocation = {
        locationName: input.locationName,
        latitude: parseFloat(input.latitude),
        longitude: parseFloat(input.longitude),
      };

      await prisma.location.update({
        where: {
          locationId: input.locationId,
        },
        data: {
          ...updatedLocation,
        },
      });
    }),
  createLocation: authedProcedure
    .input(schemas.createLocation)
    .mutation(async ({ input, ctx }) => {
      const company = await prisma.company.findFirst({
        where: { email: ctx.session?.user?.email! },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bad request: Logged in company not found.",
        });
      }

      const newLocationData = {
        ...input,
        companyId: company.companyId,
        latitude: parseFloat(input.latitude),
        longitude: parseFloat(input.longitude),
      };

      const newLocation = prisma.location.create({ data: newLocationData });

      return newLocation;
    }),
});

export type AppRouter = typeof appRouter;
