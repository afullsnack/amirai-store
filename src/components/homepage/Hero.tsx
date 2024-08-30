import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <Section className="bg-mobile-hero-image sm:bg-hero-image md:min-h-[80vh] min-h-[90vh] grid place-items-center md:bg-[length:150%] bg-[length:100%_100%] md:bg-[-200px_-360px] bg-no-repeat">
      <Container className="grid md:place-items-center place-items-end pb-32 md:p-0 h-full">
        <div className="items-center justify-center grid place-items-center">
          <h1 className="text-4xl text-white text-center font-semibold p-2 rounded-sm">
            Precious moments in
            <br /> every piece!
          </h1>
          <Link href="/category">
            <Button className="w-52">NEW COLLECTION</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
