"use client";

import { useQuery } from "@tanstack/react-query";
import { getFarmerListings } from "@/features/listings/api/listings";
import { logger } from "@/lib/logger";

export const useFarmerListings = (farmerId?: string) => {
  return useQuery({
    queryKey: ["listings", farmerId],
    enabled: Boolean(farmerId),
    queryFn: async () => {
      if (!farmerId) {
        logger.debug(
          "listings/useFarmerListings",
          "Skipping farmer listings query due to missing farmerId",
        );
        return [];
      }
      logger.info("listings/useFarmerListings", "Running farmer listings query", {
        farmerId,
      });
      return getFarmerListings(farmerId);
    },
    retry: 1,
  });
};
