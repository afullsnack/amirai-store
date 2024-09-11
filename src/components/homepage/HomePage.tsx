import { Container, Main, Section } from "@/components/craft";
import Image from "next/image";
import Hero from "@/components/homepage/Hero";
import { Bus, Coins, Ruler } from "lucide-react";
import SiteFooter from "@/components/Footer";
import CTA from "@/components/forms/subscribe";
import FAQ from "@/components/homepage/FAQ";
import BestSellers from "@/components/homepage/BestSellers";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  // description: string;
};
const featureText: FeatureText[] = [
  {
    icon: <Bus className="h-6 w-6" />,
    title: "Express delivery worldwide",
    // description:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Perfect fit",
    // description:
    //   "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const getFAQ = async () => {
  const query = groq`
    *[_type == "content"][0] {
      faq
    }
  `;
  const faqs = await client.fetch(query);

  console.log(faqs, ":::landing faqs");
  return faqs;
};

// TODO: get best sellers and render on the bestsellers
export default async function HomePage() {
  const { faq: faqs } = await getFAQ();

  return (
    <Main>
      <Hero />
      {/*<Section>
        <Container>
          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(({ icon, title }, index) => (
              <div className="flex gap-4 items-center" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
              </div>
            ))}
          </div>
        </Container>
        </Section>*/}
      <BestSellers />
      <CTA />
      <FAQ faqs={faqs} />
      <SiteFooter />
    </Main>
  );
}
