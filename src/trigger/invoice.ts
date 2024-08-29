import { Cart } from "@/components/cart/cart-context";
import { logger, task, wait } from "@trigger.dev/sdk/v3";

/**
 * Trigger background task that send-invoice to
 * customer
 */

type Payload = {
  cart: Cart;
  contact: string;
  shipping: string;
};

export const sendInvoiceTask = task({
  id: "send-invoice",
  run: async (payload: Payload, { ctx }) => {
    try {
      logger.log("Send to customer!", { payload, ctx });

      await wait.for({ minutes: 5 });

      sendMail(
        payload.contact,
        `
        <ul>
          ${payload.cart.items.map((item, _) => "<li></li>")}
          </ul>
        `,
      );

      return {
        message: "Invoice sent!",
      };
    } catch (error: any) {
      logger.error(error, { action: "send-invoice" });
      return {
        message: `Something went wrong: ${error.message ?? error.toString()}`,
      };
    }
  },
});

const sendMail = async (email: string, html: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PLUNK_SK}`,
    },
    body: JSON.stringify({
      to: email,
      subject: "Thanks for your purchase!",
      body: html,
      subscribed: true,
    }),

    // '{"to":"<string>","subject":"<string>","body":"<string>","subscribed":true,"name":"<string>","from":"<string>","reply":"<string>","headers":{}}'
  };

  return await fetch("https://api.useplunk.com/v1/send", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => console.error(err, ":::error sending invoice mail"));
};
