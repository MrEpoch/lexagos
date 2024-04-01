import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";
import cloudinary from "./cloudinary";
import DataURIParser from "datauri/parser";
import path from "path";
import { Redis } from "ioredis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = ({ searchParams, key, value }: any) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

export async function createImage(img: any) {
  try {
    const parser = new DataURIParser();
    const base64Image = parser.format(
      path.extname(img.name).toString(),
      await img.arrayBuffer(),
    );
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(
      base64Image.content as string,
      { resource_type: "image" },
    );
    return uploadedImageResponse;
  } catch (error) {
    throw new Error("Failed to create image: " + error);
  }
}

export async function rateLimiter(
  client: Redis,
  ip: string,
  limit: number,
  duration: number,
) {
  const key = `rate_limit:${ip}`;
  let currentCount = await client.get(key);
  let count = parseInt(currentCount as string, 10) || 0;

  if (count === limit) {
    return {
      limit,
      remaining: limit - count,
      success: false
    }
  }

  client.incr(key);
  client.expire(key, duration);
  
  return { 
    limit,
    remaining: limit - (count + 1),
    success: true
  };
}
