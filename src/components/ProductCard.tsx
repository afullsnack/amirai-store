"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const ProductCard: React.FC<{
  imageUrl: string;
  name?: string;
  price: number;
}> = ({ imageUrl, name, price }) => {
  return (
    <Card className="h-full">
      <CardContent className="!p-0 !overflow-clip rounded-t-lg">
        <div className="relative min-h-72 w-full overflow-hidden">
          <Image
            src={urlFor(imageUrl).width(2000).auto("format").url()}
            alt={name ?? "Product name"}
            fill
            objectFit="cover"
            objectPosition="center"
            className="object-cover w-full"
            quality={40}
            priority={true}
            loading="eager"
          />
        </div>
      </CardContent>
      <CardFooter className="grid items-start place-items-start mt-4">
        <span className="text-lg font-semibold">{name ?? "Product name"}</span>
        <span className="text-lg font-light">${price}</span>
      </CardFooter>
    </Card>
  );
};
