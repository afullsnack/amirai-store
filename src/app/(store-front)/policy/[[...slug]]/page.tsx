import { Container, Main, Section } from "@/components/craft";
import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";

const getPolicyContent = async () => {
  const query = groq`
    *[_type == "content"][0] {
      policy
    }
  `;
  const policyContent = await client.fetch(query);

  return policyContent;
};

export default async function PolicyPage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  if (params?.slug.includes("privacy-policy")) {
    const content = await getPolicyContent();

    return (
      <Main>
        <Section>
          <Container className="flex flex-col items-start gap-3 justify-center">
            <h1 className="text-xl font-bold">PRIVACY POLICY</h1>

            {content ? (
              <PortableText
                value={content?.policy}
                listNestingMode="html"
                components={{
                  list: {
                    bullet: ({ children }) => (
                      <ul className="mt-xl ml-auto list-disc pl-4">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="mt-lg">{children}</ol>
                    ),

                    // Ex. 2: rendering custom lists
                    checkmarks: ({ children }) => (
                      <ol className="m-auto text-lg">{children}</ol>
                    ),
                  },
                  listItem: {
                    // Ex. 1: customizing common list types
                    bullet: ({ children }) => (
                      <li
                        className="list-disc"
                        style={{ listStyleType: "disc" }}
                      >
                        {children}
                      </li>
                    ),

                    // Ex. 2: rendering custom list items
                    checkmarks: ({ children }) => <li>✅ {children}</li>,
                  },
                  block: {
                    p: ({ children }) => (
                      <p className="text-bold text-lg w-full">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl">{children}</h1>
                    ),
                  },
                }}
              />
            ) : (
              <>
                <p>
                  This privacy policy discloses the privacy for
                  Amiraiofficial.com. We recognize and respect your privacy when
                  you use our website and your right to privacy is extremely
                  important to us. This policy only applies to information
                  outlined at Amiraiofficial.com below. Please we encourage you
                  to contact us if you have any questions regarding our policy
                  or the practices of our website.
                </p>
                <p>COLLECTION, USE AND SHARING OF INFORMATION</p>

                <p>
                  We may collect the following information:
                  <br />
                  We collect contact information. For example, we collect your
                  name and mailing address if you register with us to enable us
                  process and deliver your package.
                </p>

                <p>
                  We also collect email addresses and phone numbers. If you
                  register we will also have you create a password.
                </p>

                <p>
                  We collect payment information. If you buy a product we will
                  collect the relevant data as your debit or credit card number
                  and we offer the industry standard security measures available
                  through your browser called the SSL(secure socket layer)
                  encryption that ensures safe internet transmission of your
                  personal information. The secure processing of credit or debit
                  card transaction is done by a proprietary authentication
                  system.
                </p>

                <p>
                  We collect information you submit online. This includes
                  information you post when you interact with us on social media
                  platforms.
                </p>

                <p>
                  We collect demographic information and information about
                  product preferences. This includes collecting your age group
                  and gender.
                </p>

                <p>
                  We collect information about your device and location. We
                  collect the type of device you use to access our Platform. We
                  also collect information about the type of browser you are
                  using. If you are using our apps, we may also collect your
                  device identification number. If you use our app, we may look
                  at how often you use the app and where you downloaded it.
                </p>

                <p>
                  We collect some of these to provide you with information about
                  other goods and services we offer that are similar to those
                  you have already purchased or enquired about and to notify you
                  of our offers and promotions, by telephone, email, SMS. You
                  can unsubscribe from our mailing list by clicking the on
                  “unsubscribe” link at the bottom of our emails and unsubscribe
                  from SMS messaging by following the instructions provided.
                </p>

                <p>
                  We will not sell, distribute or lease your personal
                  information to third parties unless we have your permission or
                  are required by law to do so. We may use your personal
                  information to send you promotional information about third
                  parties which we think you may find interesting if you tell us
                  that you wish this to happen.
                </p>
              </>
            )}
          </Container>
        </Section>
      </Main>
    );
  }
}
