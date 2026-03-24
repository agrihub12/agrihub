"use client";

import { useState, type FormEvent } from "react";
import {
  updateListing,
  type UpdateListingInput,
} from "@/features/listings/api/listings";
import { toKobo } from "@/lib/format";
import { logger } from "@/lib/logger";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ImageUploader } from "@/features/listings/components/ImageUploader";
import type { Listing } from "@/shared/types";

const CATEGORIES = ["Grains", "Poultry", "Vegetables", "Fruits", "Other"];

type Props = {
  listing: Listing;
  onSuccess?: () => void;
};

export const EditListingForm = ({ listing, onSuccess }: Props) => {
  const [productName, setProductName] = useState(listing.productName);
  const [category, setCategory] = useState(listing.category);
  const [quantity, setQuantity] = useState(listing.quantity);
  const [unit, setUnit] = useState(listing.unit);
  const [price, setPrice] = useState(listing.priceInKobo / 100);
  const [description, setDescription] = useState(listing.description);
  const [imageUrl, setImageUrl] = useState(listing.imageUrl ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload: UpdateListingInput = {
        productName,
        category,
        quantity,
        unit,
        priceInKobo: toKobo(price),
        description,
        imageUrl,
      };
      await updateListing(listing.id, payload);
      logger.info("listings/EditListingForm", "Listing updated from edit form", {
        listingId: listing.id,
      });
      onSuccess?.();
    } catch (submitError) {
      logger.error("listings/EditListingForm", "Failed to update listing", submitError);
      setError("Unable to update listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id={`productName-${listing.id}`}
        label="Product name"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          Category
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id={`quantity-${listing.id}`}
          label="Quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
        />
        <Input
          id={`unit-${listing.id}`}
          label="Unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          required
        />
      </div>

      <Input
        id={`price-${listing.id}`}
        label="Price (Naira)"
        type="number"
        min={0}
        value={price}
        onChange={(event) => setPrice(Number(event.target.value))}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          Description
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-24 w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
          required
        />
      </div>

      <ImageUploader uid={listing.farmerId} onUploaded={setImageUrl} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? "Saving changes..." : "Save changes"}
      </Button>
    </form>
  );
};
