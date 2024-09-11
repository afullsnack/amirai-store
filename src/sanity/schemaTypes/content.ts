import { type SchemaTypeDefinition } from "sanity";

export const Content: SchemaTypeDefinition = {
  name: "content",
  title: "Content",
  type: "document",
  fields: [
    {
      name: "hero",
      title: "Hero image",
      type: "image",
      description: "The image(s) for the hero section",
      validation: (rule) => rule.required().error("Hero image is required"),
    },
    {
      name: "hero-text",
      title: "Hero text",
      type: "text",
      description: "The text for the hero section",
    },
    {
      name: "hero-cta-text",
      title: "Hero CTA Text",
      type: "text",
      description: "Hero CTA text",
      validation: (rule) =>
        rule.required().warning("Hero CTA text is required"),
    },
    {
      name: "hero-cta-url",
      title: "Hero CTA URL",
      type: "url",
      validation: (rule) => rule.required().warning("Hero CTA URL is requried"),
    },
  ],
};
