import type { AppRouter } from "@/server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
type RouterOutput = inferRouterOutputs<AppRouter>;

export type GetSensorsOutputItem = RouterOutput["getSensors"][0];
