import { Container } from "@/components/craft";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Ruler, Slash } from "lucide-react";
import React from "react";
import { SizeForm } from "./forms/product";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";
import { useCart } from "./cart/cart-context";
import { ProductCard } from "./ProductCard";

const getRelatedProducts = async (categories: string[]) => {
  console.log(categories, ":::Slug");
  const items = await client.fetch(
    `*[_type == "product" && (categories[]->name)[@ in $categories]]{
      _id,
      "urls": asset[].asset->url,
      "slug": slug.current,
      name,
      price,
      description,
      sizes,
      "categories": categories[]->{name, slug}
    }
    `,
    { categories },
  );

  console.log(items, ":::related items");
  return items;
};

export const RenderRelatedProducts: React.FC<{
  categories: string[];
}> = async ({ categories }) => {
  // TODO: fetch product details based on slug

  const items = await getRelatedProducts(categories);

  return (
    <>
      <Container className="flex gap-3">
        {items.map((item: any) => (
          <Link
            key={item?.slug}
            href={`/product/${item.slug}`}
            className="h-full"
          >
            <ProductCard
              name={item?.name}
              imageUrl={item?.urls[0]}
              price={item?.price}
            />
          </Link>
        ))}
      </Container>
    </>
  );
};
