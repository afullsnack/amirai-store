"use client";

import { Container, Main, Section } from "@/components/craft";
import { ProductCard } from "@/components/ProductCard";
import { Filter } from "lucide-react";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

export default function CategoriesPage({
  params,
}: {
  params: { page: string | string[] };
}) {
  if (params?.page.includes("category")) {
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
            {Array.from({ length: 5 }).map((_, index) => (
              <Link key={index} href={`/product/${index}`}>
                <ProductCard
                  price={120}
                  imageUrl="http://localhost:3000/logo.svg"
                />
              </Link>
            ))}
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
