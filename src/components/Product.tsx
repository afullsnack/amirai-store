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
import { PortableText } from "next-sanity";

const getSingleProduct = async (slug: string) => {
  console.log(slug, ":::Slug");
  const item = await client.fetch(
    `*[_type == "product" && slug.current match "${slug}"][0]{
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
  );

  console.log(item, ":::single item");
  return item;
};

export const RenderProduct: React.FC<{ slug: string }> = async ({ slug }) => {
  // TODO: fetch product details based on slug

  const item = await getSingleProduct(slug);

  return (
    <>
      <Container className="grid gap-3">
        <MainImage
          url={item?.urls[0] ?? "http://localhost:3000/logo.svg"}
          alt="Main product image"
          ratio={3 / 4}
          className="rounded-lg"
        />

        <div>
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent className="w-full">
              {item?.urls.slice(1).map((url: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 basis-1/4"
                >
                  <div className="flex aspect-square p-1 bg-muted-foreground rounded-md">
                    <Thumbnail
                      url={url ?? "http://localhost:3000/vercel.svg"}
                      alt="Thumbnail"
                      className="w-full rounded-sm"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Container>

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
                <li>Sizes: {item?.sizes?.join(", ")}</li>
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
        sizes={sizes ?? ["small", "medium", "large"]}
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

const MainImage: React.FC<{
  url: string;
  ratio: number;
  sizes?: string;
  className?: string;
  alt: string;
}> = ({ url, ratio, sizes, className, alt }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Image
        src={url}
        alt={alt}
        width={300}
        height={40}
        sizes={sizes}
        className={cn("", className)}
        priority={true}
        loading="eager"
        quality={65}
        style={{
          aspectRatio: ratio,
          width: "100%",
          height: "auto",
        }}
      />
    </DialogTrigger>
    <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
      <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
        <Image
          src={url}
          fill
          alt={alt || ""}
          className="h-full w-full object-contain"
        />
      </div>
    </DialogContent>
  </Dialog>
);

const Thumbnail: React.FC<{
  url: string;
  className?: string;
  alt: string;
}> = ({ url, className, alt }) => (
  <img
    src={url}
    alt={alt}
    // priority={true}
    // loading="eager"
    // quality={35}
    // fill
    width={"100%"}
    height={"100%"}
    className={cn("object-cover w-full h-full", className)}
  />
);
