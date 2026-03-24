"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { seedDemoListings } from "@/features/listings/api/listings";
import { useFarmerListings } from "@/features/listings/hooks/useFarmerListings";
import Link from "next/link";
import { Plus, LayoutList } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { ListingTable } from "@/features/listings/components/ListingTable";
import { Spinner } from "@/shared/components/Spinner";

export default function FarmerListingsPage() {
  const { user } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const { data: listings = [], isLoading, isError, error } = useFarmerListings(user?.uid);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);

  const refresh = () => {
    if (user?.uid) {
      queryClient.invalidateQueries({ queryKey: ["listings", user.uid] });
    }
    queryClient.invalidateQueries({ queryKey: ["listings"] });
  };

  const handleSeed = async () => {
    if (!user) {
      setSeedMessage("Please sign in first.");
      return;
    }
    setSeedMessage("");
    setSeeding(true);
    try {
      await seedDemoListings({
        farmerId: user.uid,
        farmerName: currentUser?.name ?? user.displayName ?? "Farmer",
        farmerLocation: currentUser?.location ?? "",
      });
      refresh();
      setSeedMessage("Seed completed: 10 demo listings added.");
    } catch (seedError) {
      setSeedMessage(
        seedError instanceof Error ? seedError.message : "Seed failed. Please try again.",
      );
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    setCreated(params.get("created") === "1");
    setUpdated(params.get("updated") === "1");
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <LayoutList className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground sm:text-3xl tracking-tight">
              My Listings
            </h1>
            <p className="text-sm font-medium text-muted">
              Create and manage produce listings for buyers.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => void handleSeed()} disabled={seeding}>
            {seeding ? "Seeding..." : "Debug: Seed 10 Products"}
          </Button>
          <Link
            href="/farmer/listings/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="h-4 w-4" />
            Create New Listing
          </Link>
        </div>
      </div>

      {isLoading ? <div className="py-12"><Spinner /></div> : null}
      {created ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-700">
            Listing created successfully.
          </p>
        </div>
      ) : null}
      {updated ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-700">
            Listing updated successfully.
          </p>
        </div>
      ) : null}
      {seedMessage ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-700">{seedMessage}</p>
        </div>
      ) : null}
      {isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-600">Unable to load listings. Try again.</p>
          <p className="mt-1 text-xs text-red-500">
            {error instanceof Error ? error.message : "Unexpected query error."}
          </p>
        </div>
      ) : null}
      {!isLoading ? <ListingTable listings={listings} onChanged={refresh} /> : null}
    </div>
  );
}
