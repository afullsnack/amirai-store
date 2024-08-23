"use client";

import { Container, Main, Section } from "@/components/craft";
import HomePage from "@/components/HomePage";
import { useParams, usePathname } from "next/navigation";

export default function CategoriesPage({
  params,
}: {
  params: { category: string };
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <HomePage />;
  }

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
