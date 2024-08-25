"use client";

import { CategoryHandler } from "@/components/CategoryHandler";
import { Container, Main, Section } from "@/components/craft";

import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { Filter } from "lucide-react";
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
