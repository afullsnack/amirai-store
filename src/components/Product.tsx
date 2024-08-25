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

export const RenderProduct: React.FC<{ slug: string }> = async ({ slug }) => {
  // TODO: fetch product details based on slug

  await new Promise((resolve: any) => setTimeout(resolve, 1000));

  return (
    <>
      <Container className="grid gap-3">
        <MainImage
          url={"http://localhost:3000/logo.svg"}
          alt="Main product image"
          ratio={3 / 4}
          className="rounded-lg"
        />

        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 basis-1/4"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square bg-muted-foreground items-center justify-center p-6">
                        <Thumbnail
                          url={"http://localhost:3000/vercel.svg"}
                          alt="thumb nail"
                        />
                      </CardContent>
                    </Card>
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
        <ProductControls currentProd={slug} />
      </Container>

      <Container className="w-full md:col-span-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Additional information</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Shipping and returns</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </>
  );
};

const ProductControls: React.FC<{ currentProd: string }> = ({
  currentProd,
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
            <BreadcrumbLink href="/category">
              Category/collection Name
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <b>{currentProd}</b>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-semibold">{currentProd}</h1>
      <h3 className="text-xl font-semibold md:text-3xl md:font-normal">
        <small>Price:</small> <br />
        $300
      </h3>
      <SizeForm sizes={["small", "medium", "large"]} defaultSelect="small" />

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
  <Image
    src={url}
    alt={alt}
    width={24}
    height={24}
    className={cn("size-6", className)}
  />
);
