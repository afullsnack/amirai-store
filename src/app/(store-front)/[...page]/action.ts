import { client } from "@/sanity/lib/client";

export const addOrder = async (
  orderId: string,
  contact: string,
  shipping: string,
  cart: string,
) => {
  try {
    const duplicate = await client.fetch(`
      *[_type == "order" && orderId match "${orderId}"]
    `);

    if (duplicate) {
      throw new Error("Duplicate order entry");
    }

    await client.create({
      _type: "order",
      orderId: orderId,
      contact: contact,
      shipping: shipping,
      cart: cart,
    });
  } catch (error: any) {
    console.log(error, ":::error storing order");
    throw error;
  }
};
