import { schemas } from "@/lib/zod/schemas";
import * as z from "zod";

export type SignUpForm = z.infer<typeof schemas.signUp>;
