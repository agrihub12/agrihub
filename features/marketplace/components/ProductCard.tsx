"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { Button } from "@/shared/components/Button";
import type { Listing } from "@/shared/types";

interface ProductCardProps {
  listing: Listing;
}

export function ProductCard({ listing }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 w-full bg-slate-100 sm:h-48">
        {listing.imageUrl ? (
          <Image
            src={listing.imageUrl}
            alt={listing.productName}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {listing.productName}
        </h3>
        <p className="text-xs font-medium uppercase text-slate-500">{listing.category}</p>
        <p className="flex items-center gap-1 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          {listing.farmerLocation || "Nigeria"} • {listing.farmerName}
        </p>
        <p className="text-sm text-slate-600">
          {listing.quantity} {listing.unit} available
        </p>
        <p className="text-lg font-bold text-green-700">
          {formatNaira(listing.priceInKobo)} / {listing.unit}
        </p>
        <Link href={`/product/${listing.id}`} className="mt-auto">
          <Button className="w-full">Buy Now</Button>
        </Link>
      </div>
    </article>
  );
}
