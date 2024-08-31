import { Main, Section, Container } from "@/components/craft";
import Link from "next/link";

export default function AboutUs() {
  return (
    <Main>
      <Section>
        <Container>
          <div className="flex flex-col items-start gap-3 justify-center">
            <h1 className="text-2xl font-semibold">About Us</h1>
            <p className="text-balance text-left">
              Amirai is a brand new company which offers the most stylish,
              modern, classic, contemporary and high quality exclusive clothing.
              Amirai was created to cater to every classy, modern woman and
              their needs when it comes to clothing. No matter the occasion, big
              or small, there is something available in our store just perfect
              for you.
            </p>
            <p className="text-balance text-left">
              Amirai kids, a subsidiary of Amirai offers luxurious, stylish
              dresses, turning every girl to a princess one piece at a time.
              Whether it’s for special occasions, birthdays, holidays,
              Christening etc, We have a wide range of collections readily
              available to purchase from.
            </p>
            <p className="text-balance text-left">
              With every design, the customer is at the heart of our business
              model from design, fabric sourcing, production, packaging, sales
              to an unparalleled service.
            </p>
            <p className="text-balance text-left">
              Our contact details include:
              <br />
              <b>Customer service:</b> +234809 911 1108
              <br />
              <b>WhatsApp:</b>{" "}
              <a
                href="https://wa.me/+2348099111108"
                className="text-blue-400 underline"
              >
                +234809 911 1108
              </a>
              {"  "}
              <Link
                href="https://wa.me/message/7SIMFLWVKADTN1"
                target="_blank"
                className="text-blue-500 underline"
              >
                WhatsApp
              </Link>
              <br />
              <b>Email:</b>{" "}
              <Link href="mailto:sales@amiraiofficial.com">
                sales@amiraiofficial.com
              </Link>{" "}
              <Link href="mailto:support@amiraiofficial.com">
                support@amiraiofficial.com
              </Link>
            </p>
            <p className="text-balance text-left">
              Operation hours are from:
              <br />
              <b>Monday-Friday</b> (9am-5pm)
              <br />
              <b>Saturday</b> (11am-4pm)
            </p>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
