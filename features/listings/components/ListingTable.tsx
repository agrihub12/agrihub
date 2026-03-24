"use client";

import Image from "next/image";
import Link from "next/link";
import { deleteListing, updateListingStatus } from "@/features/listings/api/listings";
import { formatNaira } from "@/lib/format";
import { Badge } from "@/shared/components/Badge";
import { Button } from "@/shared/components/Button";
import type { Listing } from "@/shared/types";

type Props = {
  listings: Listing[];
  onChanged?: () => void;
};

export const ListingTable = ({ listings, onChanged }: Props) => {
  const handleToggle = async (listing: Listing) => {
    const nextStatus = listing.status === "active" ? "inactive" : "active";
    await updateListingStatus(listing.id, nextStatus);
    onChanged?.();
  };

  const handleDelete = async (id: string) => {
    await deleteListing(id);
    onChanged?.();
  };

  if (!listings.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center text-sm font-bold text-muted bg-surface/50">
        No listings yet. Create your first listing.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="grid grid-cols-1 gap-4 rounded-[20px] border-2 border-border/50 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:grid-cols-[100px_1fr]"
        >
          <div className="h-[100px] w-[100px] overflow-hidden rounded-[16px] bg-surface relative">
            {listing.imageUrl ? (
              <Image
                src={listing.imageUrl}
                alt={listing.productName}
                width={72}
                height={72}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className="text-lg font-black text-foreground tracking-tight">{listing.productName}</h3>
                <Badge status={listing.status} />
              </div>
              <p className="text-xs font-bold text-muted">
                {listing.category} • {listing.quantity} {listing.unit} •{" "}
                <span className="text-primary">{formatNaira(listing.priceInKobo)}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void handleToggle(listing)}>
                {listing.status === "active" ? "Deactivate" : "Activate"}
              </Button>
              <Link
                href={`/farmer/listings/${listing.id}/edit`}
                className="inline-flex items-center justify-center rounded-xl bg-surface px-5 py-3 text-sm font-bold text-foreground transition-all hover:border-primary/50 hover:shadow-sm border-2 border-border/50"
              >
                Edit
              </Link>
              <Button variant="ghost" onClick={() => void handleDelete(listing.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
