import * as z from "zod";
import { schemas } from "./schemas";

export const trpcSchemas = {
  updateLocation: schemas.createLocation.extend({ locationId: z.number() }),
};
