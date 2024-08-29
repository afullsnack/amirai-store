import { client } from "@/sanity/lib/client";
import { sendInvoiceTask } from "@/trigger/invoice";
import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function POST(
  request: NextRequest,
  { params }: { params: { handle: string } },
) {
  const body = await request.json();

  console.log(
    body,
    ":::body from webhook call for paystack",
    params.handle,
    ":::slug for route",
  );

  // TODO: get checkoutId
  const order = await client.fetch(
    `*[_type == "order" && orderId match "${body?.reference}"]`,
  );

  if (order) {
    // TODO: reconstruct cart
    const cart = JSON.parse(order?.cart);

    // TODO: call trigger to send mail to customer with invoice
    // and details to merchant
    const handle = await sendInvoiceTask.trigger({
      cart,
      contact: order?.contact,
      shipping: order?.shipping,
    });

    console.log(handle, ":::trigger handle");
  }

  const data = {
    success: true,
    message: "Webhook received!",
    data: null,
  };
  return Response.json(data);
}
