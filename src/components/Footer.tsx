// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// UI component imports
import { Button } from "@/components/ui/button";

// Icon imports
import { Github, Twitter, Facebook, Instagram } from "lucide-react";

// Local component imports
import { Section, Container } from "@/components/craft";

// Asset imports
import Logo from "../../public/logo.svg";

export default function SiteFooter() {
  return (
    <footer>
      <Section>
        <Container className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="not-prose flex flex-col gap-6">
            <Link href="/">
              <h3 className="sr-only">Amirai</h3>
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={10}
                className="object-cover h-8 w-20 overflow-clip"
              />
            </Link>
            <p className="text-balance">
              Amirai is a clothing brand designing cutting edge pieces, and
              ships globally.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Website</h5>
            <Link href="/#">About Us</Link>
            <Link href="/#">Size Chart</Link>
            <Link href="/#">Shipping and return information</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Legal</h5>
            <Link href="/policy/privacy-policy">Privacy Policy</Link>
            <Link href="/policy/terms-of-service">Terms of Service</Link>
            <Link href="/policy/cookie-policy">Cookie Policy</Link>
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Instagram />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © <a href="https://amirai-store.vercel.com">Amirai</a>. All rights
            reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
