import { Section, Container } from "@/components/craft";

import { ArrowUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PortableText } from "next-sanity";
import { Children } from "react";

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "HOW DO I CHANGE MY SHIPPING ADDRESS ONCE MY ORDER IS PLACED?",
    answer: `We can only update your shipping address before shipment. To ensure that your package can be properly delivered, please ensure that your address is complete and correct with all information including apartment/suite/room numbers. Once your package is shipped, we will not be able to change the shipping address. And we are unable to cancel an order after shipment.`,
  },
  {
    question: "WHAT IS THE STATUS OF MY ORDER?",
    answer: `After you place an order, you will get a receipt of payment email and another email once shipped. The delivery days = processing days + shipping days. You can check order status under “My Orders” `,
  },
  {
    question: "CAN I CANCEL MY ORDER?",
    answer: `No, Unfortunately once an order is placed, it is immediately sent for processing. But, we try our best to modify new orders, for further inquiries about your order, email us at sales@amiraiofficial.com. Once, you receive the shipping notification mail, the order CANNOT be canceled or modified.`,
  },
  {
    question: "HOW LONG WILL THE ORDER TAKE TO ARRIVE?",
    answer: `Please allow 48-72hours for processing your order and 3-5 working days for delivery once your order ships.
      Please understand that the processing time (by our company) does not include the shipping time (by shipping company). In other words, delivery time = processing time + shipping time.
      You will be notified with an email once your order has been shipped. Each order should have an associated tracking number (or more if your order is shipped separately).`,
  },
  {
    question: "DO YOU RESTOCK SOLD OUT ITEMS?",
    answer: `Yes we do most times. Please continue to check our website or social media pages for updates on restocked products. You can also leave your email address and you will be notified once an item has been restocked. `,
  },
  {
    question: "HOW DO I KNOW MY SIZE?",
    answer: `We use Uk standard sizing. You can refer to our size guide to ensure you know the right size to order.`,
  },
  {
    question: "WHERE IS AMIRAI LOCATED?",
    answer: `Amirai is located in Abuja, Nigeria.`,
  },
  {
    question: "CAN I PLACE AN ORDER OVER THE PHONE?",
    answer: (
      <span>
        Yes you can. You can call us +2348099111108 during business hours or
        send us a WhatsApp message{" "}
        <a
          href="https://wa.me/+2348099111108"
          className="text-blue-400 underline"
        >
          +2348099111108
        </a>{" "}
        to place your order with us.
      </span>
    ),
  },
  {
    question: "DO YOU SHIP INTERNATIONALLY?",
    answer: `Yes, we are proud to offer international shipping for our exclusive pieces. We partner with Dhl and Skynet shipping company which delivers within a few days with tracking details. Contact us for more information.`,
  },
  {
    question: "DO YOU OFFER REFUNDS AND EXCHANGES?",
    answer: (
      <>
        <span>
          Unfortunately we do not currently offer refunds but we do offer
          exchanges if available. Pieces being exchanged MUST be in its original
          condition
        </span>
        <br />

        <span>
          PLEASE NOTE: All custom items are FINAL SALE and are not eligible for
          exchanges. For more information about exchanges contact us at
          support@amiraiofficial.com
        </span>
      </>
    ),
  },
];

const FAQ = ({ faqs }: { faqs: any[] }) => {
  return (
    <Section>
      <Container>
        <h3 className="!mt-0 text-3xl font-semibold">
          Frequently Asked Questions
        </h3>
        <h4 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our
          customer support team. <br />
          <a
            href="mailto:support@amiraiofficial.com"
            className="text-blue-400 underline"
          >
            support@amiraiofficial.com
          </a>
        </h4>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={faq._key}>
                <AccordionTrigger className="text-left">
                  <PortableText
                    value={faq?.question}
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
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  <PortableText
                    value={faq?.answer}
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
                        a: ({ children }) => (
                          <a className="text-blue-400 underline">{children}</a>
                        ),
                      },
                      marks: {
                        link: ({ value, children }) => {
                          const target = (value?.href || "").startsWith("http")
                            ? "_blank"
                            : undefined;

                          return (
                            <a
                              href={value?.href}
                              target={target}
                              rel={
                                target === "_blank"
                                  ? "noindex nofollow"
                                  : undefined
                              }
                              className="text-blue-400 underline"
                            >
                              {children}
                            </a>
                          );
                        },
                      },
                    }}
                  />
                  {/*item.link && (
                    <a
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )*/}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
