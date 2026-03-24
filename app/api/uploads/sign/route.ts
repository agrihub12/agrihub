import { NextResponse } from "next/server";
import {
  getCloudinaryApiKey,
  getCloudinaryCloudName,
  signCloudinaryUpload,
} from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { folder?: string };
    const timestamp = String(Math.floor(Date.now() / 1000));
    const folder = body.folder || "listings/general";
    const cloudName = getCloudinaryCloudName();
    const apiKey = getCloudinaryApiKey();

    if (!cloudName || !apiKey) {
      return NextResponse.json(
        { error: "Cloudinary is not configured." },
        { status: 500 },
      );
    }

    const signature = signCloudinaryUpload({ timestamp, folder });

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      cloudName,
      apiKey,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to create upload signature." },
      { status: 500 },
    );
  }
}
