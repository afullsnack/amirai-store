"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export const ProductCard: React.FC<{
  imageUrl: string;
  name?: string;
  price: number;
}> = ({ imageUrl, name, price }) => {
  return (
    <Card>
      <CardContent className="!p-0">
        <div className="relative min-h-56">
          <Image
            src={imageUrl}
            alt={name ?? "Product name"}
            fill
            objectFit="contain"
            objectPosition="center"
            className="object-contain w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="grid items-start place-items-start">
        <span className="text-lg font-normal">{name ?? "Product name"}</span>
        <span className="text-lg font-light">${price}</span>
      </CardFooter>
    </Card>
  );
};
