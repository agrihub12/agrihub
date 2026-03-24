import { v2 as cloudinary } from "cloudinary";

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
  cloudinary.config({ cloudinary_url: cloudinaryUrl });
}

export const getCloudinaryApiKey = () => process.env.CLOUDINARY_API_KEY || "";

export const getCloudinaryCloudName = () => {
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  }

  if (!cloudinaryUrl) {
    return "";
  }

  const parsed = new URL(cloudinaryUrl);
  return parsed.hostname;
};

export const signCloudinaryUpload = (params: Record<string, string>) => {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error("CLOUDINARY_API_SECRET is not configured.");
  }

  return cloudinary.utils.api_sign_request(params, apiSecret);
};
