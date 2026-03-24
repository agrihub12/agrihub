"use client";

import { ProductCard } from "@/features/marketplace/components/ProductCard";
import type { Listing } from "@/shared/types";

export const ProductGrid = ({ listings }: { listings: Listing[] }) => {
  if (!listings.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600">
        No listings match your search/filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ProductCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};
