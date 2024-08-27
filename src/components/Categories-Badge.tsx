import { Main, Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

const getCategories = async () => {
  const categories = await client.fetch('*[_type == "category"]');
  // console.log(categories, ":::fetched categories");
  return categories;
};

export default async function CategoriesSection() {
  // TODO: fetch all categories and render clickable badges
  const categories = ["dresses", "skirts", "shorts", "all"];
  const fetchedCats = await getCategories();

  return (
    <Main>
      <Section>
        <Container className="space-y-4">
          <h1 className="text-xl font-bold text-balance">Categories</h1>
          <div className="flex flex-wrap gap-2">
            {fetchedCats.map(
              (category: {
                name: string;
                slug: { current: string; _type: string };
              }) => (
                <Link
                  key={category?.slug?.current}
                  href={
                    category?.name === "all"
                      ? "/category"
                      : `/category/${category?.slug?.current}`
                  }
                >
                  <Badge className="carpital">{category?.name}</Badge>
                </Link>
              ),
            )}
          </div>
        </Container>
      </Section>
    </Main>
  );
}
