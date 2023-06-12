import { schemas } from "@/lib/zod/schemas";
import * as z from "zod";

export type EditProfileForm = z.infer<typeof schemas.editProfile>;
