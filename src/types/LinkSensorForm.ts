import { schemas } from "@/lib/zod/schemas";
import * as z from "zod";

export type LinkSensorForm = z.infer<typeof schemas.linkSensor>;
