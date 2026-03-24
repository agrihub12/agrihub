export type UserRole = "farmer" | "buyer";

export type User = {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  photoURL?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Listing = {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation?: string;
  productName: string;
  category: string;
  description: string;
  imageUrl?: string;
  priceInKobo: number;
  quantity: number;
  unit: string;
  status: "active" | "sold" | "inactive" | "pending" | "paid";
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  listingId: string;
  buyerId: string;
  farmerId: string;
  quantity: number;
  status: "pending" | "accepted" | "fulfilled" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  createdAt: string;
};

export type CreditScore = {
  userId: string;
  score: number;
  factors: Record<string, number>;
  updatedAt: string;
};
