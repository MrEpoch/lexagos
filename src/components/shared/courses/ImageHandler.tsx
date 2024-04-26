"use client";
import Image from "next/image";
import React from "react";
import CustomField from "../CustomField";
import { Input } from "@/components/ui/input";

interface ImageHandlerProps {
  form: any;
  image: File | null;
  setImage: any;
  savedImage?: string;
}

export default function ImageHandler({
  form,
  image,
  setImage,
  savedImage,
}: ImageHandlerProps) {
  return (
    <>
      <CustomField
        control={form.control}
        name="image"
        render={({ field }) => (
          <Input
          role="action-input-field"
            type="file"
            className="w-full h-full"
            {...field}
            onChange={(e) => {
              e && e.target && e.target.files && setImage(e.target.files[0]);
            }}
          />
        )}
      />
      <div className="w-full flex justify-center">
        {image || savedImage ? (
          <Image
            src={image ? URL.createObjectURL(image) : (savedImage as string)}
            alt="uploaded image"
            className="sm:w-[375px] max-h-[300px] min-h-[300px] h-full w-[300px] max-[375px]:w-full rounded-xl object-cover"
            width={500}
            height={500}
          />
        ) : (
          <div className="sm:w-[375px] max-h-[300px] min-h-[300px] h-full w-[300px] max-[375px]:w-full rounded-xl object-cover bg-card" />
        )}
      </div>
    </>
  );
}
