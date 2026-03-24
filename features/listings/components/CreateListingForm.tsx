"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useCreateListing } from "@/features/listings/hooks/useCreateListing";
import { toKobo } from "@/lib/format";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ImageUploader } from "@/features/listings/components/ImageUploader";

const CATEGORIES = ["Grains", "Poultry", "Vegetables", "Fruits", "Other"];

type Props = {
  onSuccess?: () => void;
};

export const CreateListingForm = ({ onSuccess }: Props) => {
  const { user } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const createListing = useCreateListing(user?.uid);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("kg");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reset = () => {
    setProductName("");
    setCategory(CATEGORIES[0]);
    setQuantity(1);
    setUnit("kg");
    setPrice(0);
    setDescription("");
    setImageUrl("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!user) {
      setError("You must be logged in.");
      return;
    }
    try {
      await createListing.mutateAsync({
        farmerId: user.uid,
        farmerName: currentUser?.name ?? user.displayName ?? "Farmer",
        farmerLocation: currentUser?.location ?? "",
        productName,
        category,
        quantity,
        unit,
        priceInKobo: toKobo(price),
        description,
        imageUrl,
      });
      setSuccess("Listing created successfully.");
      reset();
      onSuccess?.();
    } catch {
      setError("Unable to create listing.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="productName"
        label="Product name"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">Category</label>
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
          id="quantity"
          label="Quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
        />
        <Input
          id="unit"
          label="Unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          required
        />
      </div>

      <Input
        id="price"
        label="Price (Naira)"
        type="number"
        min={0}
        value={price}
        onChange={(event) => setPrice(Number(event.target.value))}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-24 w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
          required
        />
      </div>

      <ImageUploader uid={user?.uid ?? "unknown"} onUploaded={setImageUrl} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <Button type="submit" className="w-full" disabled={createListing.isPending}>
        {createListing.isPending ? "Creating..." : "Create listing"}
      </Button>
    </form>
  );
};
