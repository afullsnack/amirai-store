// TOOD: export a custom not-found page that lists available links to pages in the application

import { Container, Main, Section } from "@/components/craft";
import Link from "next/link";

export default function NotFound() {
  return (
    <Main>
      <Section>
        <Container>
          <h2 className="text-xl font-semibold">
            Page you requested for was not found
          </h2>
          <Link href={"/"}>Return home</Link>
        </Container>
      </Section>
    </Main>
  );
}
