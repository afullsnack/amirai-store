"use client";

import { Container, Main, Section } from "@/components/craft";

import { useParams, usePathname } from "next/navigation";

export default function CategoriesPage({
  params,
}: {
  params: { page: string };
}) {
  return (
    <Main>
      <Section>
        <Container>
          <h1>{params?.page}</h1>
        </Container>
      </Section>
    </Main>
  );
}
