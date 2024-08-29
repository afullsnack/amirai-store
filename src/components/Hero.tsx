import { Section, Container } from "@/components/craft";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <Section className="bg-hero-image min-h-[70vh] grid place-items-center md:bg-cover bg-[length:195%_800px] md:bg-center bg-no-repeat">
      <Container className="grid place-items-center h-full">
        <div className="items-center justify-center grid place-items-center">
          <h1 className="text-4xl text-white text-center font-semibold p-2 rounded-sm">
            Precious moments in
            <br /> every piece!
          </h1>
          <Button className="w-52">NEW COLLECTION</Button>
        </div>
        c
      </Container>
    </Section>
  );
}
