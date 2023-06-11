import { schemas } from "@/lib/zod/schemas";
import * as z from "zod";

export type SignInForm = z.infer<typeof schemas.signIn>;
