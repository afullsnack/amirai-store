import { Section, Container } from "@/components/craft";

export default function Hero() {
  return (
    <Section className="bg-hero-image min-h-[70vh] grid place-items-center">
      <Container className="grid place-items-center h-full">
        <h1 className="text-2xl text-white font-semibold bg-gray-300 p-2 rounded-sm">
          Hero image text
        </h1>
      </Container>
    </Section>
  );
}
