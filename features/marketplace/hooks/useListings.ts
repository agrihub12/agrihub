"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveListings } from "@/features/marketplace/api/listings";
import { logger } from "@/lib/logger";

type ListingFilters = {
  search?: string;
  category?: string;
};

export const useListings = (filters: ListingFilters) => {
  return useQuery({
    queryKey: ["listings", filters],
    queryFn: async () => {
      logger.info("marketplace/useListings", "Running listings query", { filters });
      return getActiveListings(filters);
    },
  });
};
