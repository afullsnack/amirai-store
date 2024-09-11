import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const getHeroContent = async () => {
  const query = groq`
    *[_type == "content"][0] {
      "heroImage": heroImage.asset->url,
      heroText,
      heroCTAText,
      heroCTAUrl
    }
  `;
  const heroContent = await client.fetch(query);

  console.log(heroContent, ":::hero content");
  return heroContent;
};

export default async function Hero() {
  const heroContent = await getHeroContent();

  return (
    <Section className="relative md:min-h-[90vh] min-h-[90vh] grid place-items-center md:bg-[length:150%] bg-[length:100%_100%] md:bg-[-200px_-360px] bg-no-repeat">
      <Image
        src={urlFor(heroContent?.heroImage).url()}
        alt={heroContent?.heroText}
        fill
        className="left-0 bottom-0 top-0 right-0 absolute -z-10 object-cover"
      />
      <Container className="grid md:place-items-center place-items-end pb-32 md:p-0 h-full">
        <div className="items-center justify-center grid place-items-center">
          <h1 className="text-4xl text-white w-auto max-w-sm text-center font-semibold p-2 rounded-sm">
            {heroContent ? (
              heroContent?.heroText
            ) : (
              <>Precious moments in every piece!</>
            )}
          </h1>
          <Link href={heroContent ? heroContent?.heroCTAUrl : "/category"}>
            <Button className="w-52">
              {heroContent ? heroContent?.heroCTAText : "NEW COLLECTION"}
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
