import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React from "react";
import { ProductCard } from "@/components/ProductCard";

const getProducts = async (filter?: string) => {
  if (filter && filter?.length) {
    const fitleredProducts = await client.fetch(
      `*[_type == "product" && categories[]->name match "${filter}"]{
        "urls": asset[].asset->url,
        "slug": slug.current,
        name,
        price
      }`,
    );
    console.log(fitleredProducts, ":::fetched roducts");

    return fitleredProducts;
  }
  const products = await client.fetch(
    `*[_type == "product"]{
      "urls": asset[].asset->url,
      "slug": slug.current,
      name,
      price
    }`,
  );
  console.log(products, ":::fetched roducts");
  return products;
};

export const CategoryHandler: React.FC<{
  filter?: string;
}> = async ({ filter }) => {
  const products: any[] = await getProducts(filter);
  console.log();

  return (
    <>
      {products.map((product: any, index: number) => (
        <Link key={index} href={`/product/${product.slug}`} className="h-full">
          <ProductCard
            name={product?.name}
            price={product?.price ?? 120}
            imageUrl={product?.urls[0] ?? "http://localhost:3000/logo.svg"}
          />
        </Link>
      ))}
    </>
  );
};
