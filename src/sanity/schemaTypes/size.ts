import { type SchemaTypeDefinition } from "sanity";

export const Size: SchemaTypeDefinition = {
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the size",
      validation: (rule) =>
        rule.required().error("Name of the size is required"),
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
      description: "The slug of the size for unique URLs and filtering",
    },
  ],
};
