import { type SchemaTypeDefinition } from "sanity";

export const Category: SchemaTypeDefinition = {
  name: "category",
  title: "Cateogry",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule.required().error("Name of the category is required"),
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
      description: "The slug of the category for unique URLs",
    },
  ],
};
