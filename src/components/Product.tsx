import { Container } from "@/components/craft";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Ruler, Slash } from "lucide-react";
import React, { Suspense } from "react";
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
import { RenderRelatedProducts } from "./RelatedProducts";
import { groq, PortableText } from "next-sanity";
import { ProductGallery } from "./product/gallery";

const getSingleProduct = async (slug: string) => {
  console.log(slug, ":::Slug");
  const query = groq`
    *[_type == "product" && slug.current match $slug][0]{
      _id,
      "urls": asset[].asset->url,
      "slug": slug.current,
      name,
      price,
      description,
      "sizes": sizes[]{
        count,
        "size": size->{
          name,
          "slug": slug.current
        }
      },
      "categories": categories[]->{name, slug}
    }
  `;
  const item = await client.fetch(query, { slug });

  console.log(item?.sizes, ":::item sizes");
  return item;
};

export const RenderProduct: React.FC<{ slug: string }> = async ({ slug }) => {
  // TODO: fetch product details based on slug

  const item = await getSingleProduct(slug);

  return (
    <>
      <ProductGallery urls={item?.urls} />

      <Container className="w-full place-content-start justify-items-start grid items-start justify-start">
        <ProductControls {...item} />
      </Container>

      <Container className="w-full md:col-span-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <PortableText
                value={item?.description}
                listNestingMode="html"
                components={{
                  list: {
                    bullet: ({ children }) => (
                      <ul className="mt-xl ml-auto list-disc pl-4">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="mt-lg">{children}</ol>
                    ),

                    // Ex. 2: rendering custom lists
                    checkmarks: ({ children }) => (
                      <ol className="m-auto text-lg">{children}</ol>
                    ),
                  },
                  listItem: {
                    // Ex. 1: customizing common list types
                    bullet: ({ children }) => (
                      <li
                        className="list-disc"
                        style={{ listStyleType: "disc" }}
                      >
                        {children}
                      </li>
                    ),

                    // Ex. 2: rendering custom list items
                    checkmarks: ({ children }) => <li>✅ {children}</li>,
                  },
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Additional information</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  Sizes:{" "}
                  {item?.sizes
                    ?.map((value: any) => value?.size?.name)
                    .join(", ")}
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Shipping and returns</AccordionTrigger>
            <AccordionContent>
              See our shipping and returns policy
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>

      {/* Related products section*/}
      <Container>
        <Suspense fallback={"Loading...."}>
          <RenderRelatedProducts
            categories={item?.categories.map(
              (item: { name: string }) => item?.name,
            )}
          />
        </Suspense>
      </Container>
    </>
  );
};

const ProductControls: React.FC<{ [field: string]: any }> = ({
  name,
  price,
  sizes,
  description,
  categories,
  _id,
  urls,
}) => {
  return (
    <Container className="flex flex-col items-start justify-start gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${categories[0]?.name}`}>
              {categories[0]?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <b>{name}</b>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-semibold">{name}</h1>
      <h3 className="text-xl font-semibold md:text-3xl md:font-normal">
        <small>Price:</small> <br />${price ?? "300"}
      </h3>
      <SizeForm
        sizes={
          sizes?.map((value: any) => value?.size?.name) ?? [
            "small",
            "medium",
            "large",
          ]
        }
        defaultSelect={sizes[0] ?? "small"}
        price={price}
        description={description}
        id={_id}
        url={urls[0]}
        name={name}
      />

      <Link
        href={"/#size-guide"}
        className="flex gap-2 items-center justify-center"
      >
        <Ruler className="size-4" />
        Size guide
      </Link>
    </Container>
  );
};
