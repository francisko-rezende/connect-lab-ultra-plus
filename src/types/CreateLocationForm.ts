import { schemas } from "@/lib/zod/schemas";
import * as z from "zod";

export type CreateLocationForm = z.infer<typeof schemas.createLocation>;
