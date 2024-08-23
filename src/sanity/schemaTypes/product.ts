import { type SchemaTypeDefinition } from "sanity";

export const Product: SchemaTypeDefinition = {
  name: "product",
  title: "product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().error("Name is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Product image",
      type: "image",
      options: { hotspot: true, metadata: ["palette"] },
      validation: (rule) =>
        rule
          .required()
          .assetRequired()
          .error("An image is required for the product to be published"),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "description",
      title: "description",
      type: "text",
    },
  ],
};
