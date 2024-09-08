import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React from "react";
import { ProductCard } from "@/components/ProductCard";
import { groq } from "next-sanity";

const getProducts = async (filter?: string) => {
  const params = {
    // Filter posts to only include published ones
    filter: "defined(publishedAt) && publishedAt < now()",

    // Sort posts by published date in descending order
    order: "-publishedAt",

    // Limit the number of posts returned
    limit: 10,

    // Expand the author reference to include their name
    // expand: 'author',
    // expandQuery: groq`
    //   author->{
    //     name
    //   }
    // `
  };

  if (filter && filter?.length) {
    const fitleredProducts = await client.fetch(
      `*[_type == "product" && categories[]->name match "${filter}"]{
        "urls": asset[].asset->url,
        "slug": slug.current,
        name,
        price
      }`,
      params,
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
    params,
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
