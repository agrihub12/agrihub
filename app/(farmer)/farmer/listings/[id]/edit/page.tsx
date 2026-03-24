"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useListing } from "@/features/marketplace/hooks/useListing";
import { EditListingForm } from "@/features/listings/components/EditListingForm";
import { Spinner } from "@/shared/components/Spinner";

export default function EditListingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const listingId = params?.id ?? "";
  const { data: listing, isLoading, isError } = useListing(listingId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center gap-4">
        <Link
          href="/farmer/listings"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border-2 border-border/50 text-muted transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Edit Listing
          </h1>
          <p className="text-muted font-medium">
            Update your product information and save changes.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12">
          <Spinner />
        </div>
      ) : null}

      {isError || !listing ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-600">Unable to load this listing.</p>
        </div>
      ) : null}

      {listing ? (
        <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm sm:p-8">
          <EditListingForm
            listing={listing}
            onSuccess={() => router.push("/farmer/listings?updated=1")}
          />
        </div>
      ) : null}
    </div>
  );
}
