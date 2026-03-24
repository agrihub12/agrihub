"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateListingForm } from "@/features/listings/components/CreateListingForm";

export default function NewListingPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-black text-foreground tracking-tight">Create Listing</h1>
          <p className="text-muted font-medium">Add a new product to the AgriHub marketplace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm sm:p-8">
            <CreateListingForm
              onSuccess={() => router.push("/farmer/listings?created=1")}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-border/50 bg-primary/5 p-6 border-dashed">
            <h3 className="text-lg font-bold text-primary mb-2">Listing Tips</h3>
            <ul className="space-y-3 text-sm font-medium text-muted">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Use high-quality photos of your actual produce.
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Be precise with weight and unit measurements.
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Mention the harvest date in your description.
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Fair pricing helps you sell faster.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Preview</h3>
            <div className="flex aspect-square items-center justify-center rounded-xl bg-surface border-2 border-border border-dashed text-muted font-bold p-8 text-center text-sm">
              Your product preview will appear here as you fill the form.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
