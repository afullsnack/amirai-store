import { Container, Main, Section } from "@/components/craft";

export default function PolicyPage({ params }: { params: { slug: string } }) {
  return (
    <Main>
      <Section>
        <Container>
          <h1 className="text-xl font-bold">
            {params?.slug} Is still a work in progress
          </h1>
        </Container>
      </Section>
    </Main>
  );
}
