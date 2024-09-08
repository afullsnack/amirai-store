"use client";
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
import { parseAsInteger, useQueryState } from "nuqs";
import { Container } from "@/components/craft";
import { urlFor } from "@/sanity/lib/image";

export const ProductGallery: React.FC<{
  urls: string[];
}> = ({ urls }) => {
  // Query param to track image slide to show
  const [imgSlide, setImgSlide] = useQueryState(
    "imgSlide",
    parseAsInteger.withDefault(0),
  );

  return (
    <Container className="grid gap-3">
      <MainImage
        url={urls[imgSlide] ?? "http://localhost:3000/logo.svg"}
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
            {urls.map((url: string, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 basis-1/4 hover:cursor-pointer"
                onClick={() => setImgSlide(index)}
              >
                <div
                  className={cn("flex aspect-square p-1  rounded-md", {
                    "bg-muted-foreground": index === imgSlide,
                  })}
                >
                  <Thumbnail
                    url={
                      urlFor(url).width(200).height(200).format("webp").url() ??
                      "http://localhost:3000/vercel.svg"
                    }
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
        // quality={65}
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
