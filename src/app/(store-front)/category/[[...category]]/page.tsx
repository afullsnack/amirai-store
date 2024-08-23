"use client";

import { Container, Main, Section } from "@/components/craft";

import { useParams, usePathname } from "next/navigation";

export default function CategoriesPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <Main>
      <Section>
        <Container>
          <h1>{params?.category}</h1>
        </Container>
      </Section>
    </Main>
  );
}
