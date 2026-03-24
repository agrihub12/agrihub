"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createListing,
  type CreateListingInput,
} from "@/features/listings/api/listings";
import { logger } from "@/lib/logger";

export const useCreateListing = (farmerId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateListingInput) => {
      logger.info("listings/useCreateListing", "Submitting create listing mutation", {
        farmerId: data.farmerId,
        productName: data.productName,
      });
      const listingId = await createListing(data);
      logger.debug("listings/useCreateListing", "Create listing mutation resolved", { listingId });
      return listingId;
    },
    onSuccess: () => {
      logger.info("listings/useCreateListing", "Create listing success, invalidating caches", {
        farmerId,
      });
      if (farmerId) {
        queryClient.invalidateQueries({ queryKey: ["listings", farmerId] });
      }
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => {
      logger.error("listings/useCreateListing", "Create listing mutation failed", error);
    },
  });
};
