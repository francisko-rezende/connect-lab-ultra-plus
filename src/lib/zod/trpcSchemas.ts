import * as z from "zod";
import { schemas } from "./schemas";

const locationId = z.number();

export const trpcSchemas = {
  updateLocation: schemas.createLocation.extend({ locationId: z.number() }),
  getSensors: z.object({ locationId }),
  linkSensor: z.object({ sensorData: schemas.linkSensor, locationId }),
};
