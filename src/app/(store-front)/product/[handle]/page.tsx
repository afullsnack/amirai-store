import { Container, Main, Section } from "@/components/craft";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <Main>
      <Section>
        <Container>
          <h1>{params?.handle} single product</h1>
        </Container>
      </Section>
    </Main>
  );
}
