import { type SchemaTypeDefinition } from "sanity";

export const Order: SchemaTypeDefinition = {
  name: "order",
  title: "Order",
  type: "document",
  hidden: true,
  fields: [
    {
      name: "orderId",
      title: "OrderId",
      type: "string",
    },
    {
      name: "contact",
      title: "Contact",
      type: "string",
    },
    {
      name: "shipping",
      title: "Shipping",
      type: "string",
    },
    {
      name: "cart",
      title: "Cart",
      type: "string",
    },
  ],
};
