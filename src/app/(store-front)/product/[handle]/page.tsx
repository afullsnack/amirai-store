"use client";
/***
 * Handle product display and add to cart actions
 * Render a client page that loads a server component
 * > with a Suspense component and fallback rendered
 * > when fetching data
 */
import { Container, Main, Section } from "@/components/craft";
import { RenderProduct } from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <Main>
      {/*Handle product details*/}
      <Section className="grid grid-cols-1 md:grid-cols-2 place-items-center">
        <Suspense
          fallback={
            <Section className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4 w-full">
              <Container>
                <Skeleton className="min-w-[250px] h-full rounded-md" />
              </Container>
              <Container>
                <div className="flex flex-col gap-3 min-w-[250px] min-h-32">
                  <Skeleton className="w-full h-10 rounded-sm" />
                  <Skeleton className="w-full h-10 rounded-sm" />
                  <Skeleton className="w-full h-10 rounded-sm" />
                  <Skeleton className="w-full h-10 rounded-sm" />
                </div>
              </Container>
            </Section>
          }
        >
          <RenderProduct slug={params?.handle} />
        </Suspense>
      </Section>

      {/* Related products section*/}
      <Section>
        <Container>
          <h1>Handle related products</h1>
        </Container>
      </Section>
    </Main>
  );
}
