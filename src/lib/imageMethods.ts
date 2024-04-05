"use server";
import DataURIParser from "datauri/parser";
import { redirect } from "next/navigation";
import path from "path";

export async function toBase64(data: FormData) {
  const img = data.get("image") as any;
  if (!img) {
    redirect("/actions?error=no-image-provided");
  }
  const parser = new DataURIParser();
  return JSON.stringify(
    parser.format(path.extname(img.name).toString(), await img.arrayBuffer()),
  );
}
