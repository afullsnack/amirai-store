import { Container, Main, Section } from "@/components/craft";
import Image from "next/image";
import Hero from "@/components/Hero";
import { Bus, Coins, Ruler } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};
const featureText: FeatureText[] = [
  {
    icon: <Bus className="h-6 w-6" />,
    title: "Express delivery worldwide",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Perfect fit",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default async function HomePage() {
  return (
    <Main>
      <Hero />
      <Section>
        <Container>
          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </Main>
  );
}
