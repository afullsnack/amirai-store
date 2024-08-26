"use client";

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

import { useParams, usePathname } from "next/navigation";
import { Suspense } from "react";

export default function CategoriesPage({
  params,
}: {
  params: { page: string | string[] };
}) {
  const [page, sub] = params?.page;

  console.log(page, sub, ":::sub lists");

  if (page.includes("category")) {
    return (
      <Main>
        <Section>
          <Container>
            <div className="flex space-x-2">
              <Filter className="size-5" />
              <span>Filter</span>
            </div>
          </Container>
          <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Suspense fallback={<Skeleton className="min-w-9 min-h-64" />}>
              <CategoryHandler filter={sub} />
            </Suspense>
          </Container>
        </Section>
      </Main>
    );
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
                  $55.00
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Suspense>
                <h1>Cart items</h1>
              </Suspense>
            </CollapsibleContent>
          </Collapsible>
          <Container className="grid md:grid-cols-2 place-items-center gap-2">
            <div className="md:col-span-1 w-full flex flex-col items-center justify-center">
              <CheckoutStepper checkoutId={sub ?? "asocansdvbaosdvo"} />
            </div>
            <div className="hidden md:flex">
              <Suspense>
                <h1>Cart items</h1>
              </Suspense>
            </div>
          </Container>
        </Section>
      </Main>
    );
  } else {
    return (
      <Main>
        <Section>
          <Container>
            <h1>{params?.page} page</h1>
          </Container>
        </Section>
      </Main>
    );
  }
}
