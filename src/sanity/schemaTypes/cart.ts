import { type SchemaTypeDefinition } from "sanity";

export const Cart: SchemaTypeDefinition = {
  name: "cart",
  title: "Cart",
  type: "document",
  hidden: true,
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "ProductId",
              type: "reference",
              to: { type: "product" },
            },
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },
  ],
};
