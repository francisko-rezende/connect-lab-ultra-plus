import * as z from "zod";
import { schemas } from "./schemas";

const idNumberSchema = z.number();

export const trpcSchemas = {
  updateSensor: z.object({
    sensorData: schemas.linkSensor,
    sensorId: idNumberSchema,
  }),
  updateLocation: schemas.createLocation.extend({ locationId: idNumberSchema }),
  getSensors: z.object({ locationId: idNumberSchema }),
  linkSensor: z.object({
    sensorData: schemas.linkSensor,
    locationId: idNumberSchema,
  }),
};
