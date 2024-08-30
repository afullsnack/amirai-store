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
      validation: (rule) =>
        rule.required().warning("This field required for unique URLs"),
      description: "The slug of the product for unique URLs",
    },
    {
      name: "asset",
      title: "Product images",
      type: "array",
      description: "Product images",
      of: [
        {
          type: "image",
          options: { hotspot: true, metadata: ["palette", "lqip"] },
          validation: (rule) =>
            rule
              .required()
              .required()
              .error("An image is required for the product to be published"),
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      description: "Categories the products can belong to",
      options: { layout: "tags" },
      validation: (rule) => rule.required().min(1),
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      description: "the different sizes for the dress",
      options: { layout: "tags" },
      // validation: (rule) => rule.required().min(1),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) =>
        rule.required().min(1).error("Product must have a price"),
      description: "Product price in $(dollar)",
    },
    {
      name: "description",
      title: "description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
