import { useRouter } from "next/router";
import { SetStateAction, useEffect } from "react";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/routers/_app";
type RouterOutput = inferRouterOutputs<AppRouter>;
type GetLocationsOutput = RouterOutput["getLocations"];
type UseLoadSelectedLocationFromQueryProps = {
  locationsData?: GetLocationsOutput;
  setSelectedLocationId: (value: SetStateAction<number>) => void;
};

export function useLoadSelectedLocationFromQuery({
  locationsData,
  setSelectedLocationId,
}: UseLoadSelectedLocationFromQueryProps) {
  const router = useRouter();
  const queryLocationId = router.query.locationId;

  useEffect(() => {
    const hasQueryLocationId = !!queryLocationId;
    const hasLocationsData = !!locationsData;

    if (hasQueryLocationId && hasLocationsData) {
      const isSelectedLocation = ({ id }: { id: number }) =>
        id === Number(queryLocationId);

      const selectedLocation = locationsData.find(isSelectedLocation);
      const selectedLocationId = selectedLocation?.id || 0;

      setSelectedLocationId(selectedLocationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryLocationId, locationsData]);
}
