"use client";

import { useCart } from "@/components/cart/cart-context";
import { CategoryHandler } from "@/components/CategoryHandler";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { Container, Main, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { ChevronDown, Filter, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CategoriesPage({
  params,
}: {
  params: { page: string | string[] };
}) {
  const { cart } = useCart();
  const router = useRouter();
  const [page, sub] = params?.page;

  console.log(page, sub, ":::sub lists", cart);

  useEffect(() => {
    console.log("INside aftermount");
    if (!cart.items.length && page === "checkout") {
      alert("You do not have any items in cart, add an item to proceed");
      router.replace("/category");
    }
  }, []);

  if (page.includes("category")) {
    if (sub === "women") {
      return (
        <Main>
          <Section>
            <Container>
              <div className="flex space-x-2 items-center justify-center min-h-72">
                <h1 className="text-5xl border-b text-center border-orange-500/70 pb-3 text-wrap">
                  Amirai woman is rebranding and will be back soon
                </h1>
              </div>
            </Container>
          </Section>
        </Main>
      );
    } else if (sub === "kids") {
      // Filter between categories and sub-catogory
      return (
        <Main>
          <Section>
            <Container>
              <Dialog>
                <DialogTrigger>
                  <Button className="flex space-x-2" onClick={() => {}}>
                    <Filter className="size-3" />
                    <span>Filter</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex w-full flex-col">
                    <h1>Filters</h1>
                  </div>
                </DialogContent>
              </Dialog>
            </Container>
            <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Suspense
                fallback={
                  <>
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                  </>
                }
              >
                <CategoryHandler filter={sub} />
              </Suspense>
            </Container>
          </Section>
        </Main>
      );
    } else {
      // Return all categories
      return (
        <Main>
          <Section>
            <Container>
              <Dialog>
                <DialogTrigger>
                  <Button className="flex space-x-2" onClick={() => {}}>
                    <Filter className="size-3" />
                    <span>Filter</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex w-full flex-col">
                    <h1>Filters</h1>
                  </div>
                </DialogContent>
              </Dialog>
            </Container>
            <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Suspense
                fallback={
                  <>
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                    <Skeleton className="min-w-9 min-h-64" />
                  </>
                }
              >
                <CategoryHandler filter={sub} />
              </Suspense>
            </Container>
            <Container>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </Container>
          </Section>
        </Main>
      );
    }
  } else if (page.includes("checkout")) {
    return (
      <Main>
        <Section className="">
          <Collapsible className="md:hidden grid">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between bg-muted-foreground/20 px-5">
                <Button variant={"link"} className="flex items-center gap-3">
                  <ShoppingCart className="size-3" /> {"Show order summary"}{" "}
                  <ChevronDown className="size-3" />
                </Button>
                <span className="tet-lg font-bold text-balance text-black">
                  ${cart.totalAmount}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Suspense>
                <div className="px-6">
                  {cart.items.map((item, _) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 my-3"
                    >
                      <Image
                        src={item.featuredImage.url}
                        alt={item.featuredImage.altText}
                        width={50}
                        height={50}
                        className="object-cover h-8 w-8 overflow-clip"
                      />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty:{item.quantity} Size:{item.selectedSize}
                        </p>
                      </div>
                      <div className="ml-auto font-medium flex items-center gap-4">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </CollapsibleContent>
          </Collapsible>
          <Container className="grid md:grid-cols-2 place-items-center gap-2">
            <div className="md:col-span-1 w-full flex flex-col items-center justify-center">
              <CheckoutStepper checkoutId={sub ?? "asocansdvbaosdvo"} />
            </div>
            <div className="hidden md:flex">
              <Suspense>
                <div>
                  {cart.items.map((item, _) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 my-3"
                    >
                      <Image
                        src={item.featuredImage.url}
                        alt={item.featuredImage.altText}
                        width={50}
                        height={50}
                        className="object-cover h-8 w-8 overflow-clip"
                      />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty:{item.quantity} Size:{item.selectedSize}
                        </p>
                      </div>
                      <div className="ml-auto font-medium flex items-center gap-4">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </div>
          </Container>
        </Section>
      </Main>
    );
  } else {
    return notFound();
  }
}
