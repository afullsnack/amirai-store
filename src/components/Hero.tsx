import { Section, Container } from "@/components/craft";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <Section className="bg-hero-image md:min-h-[80vh] min-h-[90vh] grid place-items-center md:bg-[length:150%] bg-[length:195%_800px] md:bg-[-200px_-360px] bg-no-repeat">
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
