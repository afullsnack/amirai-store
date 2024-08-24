import { Main, Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function CategoriesSection() {
  // TODO: fetch all categories and render clickable badges
  const categories = ["dresses", "skirts", "shorts", "all"];

  return (
    <Main>
      <Section>
        <Container className="space-y-4">
          <h1 className="text-xl font-bold text-balance">Categories</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, _) => (
              <Link
                key={cat}
                href={cat === "all" ? "/category" : `/category/${cat}`}
              >
                <Badge>{cat}</Badge>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </Main>
  );
}
