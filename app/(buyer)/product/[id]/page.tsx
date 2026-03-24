"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useListing } from "@/features/marketplace/hooks/useListing";
import { formatNaira } from "@/lib/format";
import { Button } from "@/shared/components/Button";
import { Spinner } from "@/shared/components/Spinner";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { data: listing, isLoading, isError } = useListing(id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Spinner className="h-8 w-8" />
      </main>
    );
  }

  if (isError || !listing) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-sm text-red-600">Listing not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2">
      <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100 sm:h-96">
        {listing.imageUrl ? (
          <Image
            src={listing.imageUrl}
            alt={listing.productName}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-slate-500">{listing.category}</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {listing.productName}
        </h1>
        <p className="text-sm text-slate-600">{listing.description}</p>
        <p className="text-sm text-slate-700">
          Seller: <span className="font-semibold">{listing.farmerName}</span> (
          {listing.farmerLocation || "Nigeria"})
        </p>
        <p className="text-sm text-slate-700">
          Quantity:{" "}
          <span className="font-semibold">
            {listing.quantity} {listing.unit}
          </span>
        </p>
        <p className="text-2xl font-bold text-green-700">
          {formatNaira(listing.priceInKobo)} / {listing.unit}
        </p>
        <Button className="w-full sm:w-auto">Buy Now</Button>
      </div>
    </main>
  );
}
