import { type SchemaTypeDefinition } from "sanity";

// content schema to control landing page content
export const Content: SchemaTypeDefinition = {
  name: "content",
  title: "Content",
  type: "document",
  fields: [
    {
      name: "hero-image",
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
    {
      name: "faq",
      title: "FAQs",
      description: "FAQ questions and answers on landing page",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quesiton",
              title: "Question",
              type: "block",
              description: "Question for the FAQ section",
            },
            {
              name: "answer",
              title: "Answer",
              type: "block",
              description: "Answer to FAQ question",
            },
          ],
        },
      ],
    },
    {
      name: "policy",
      title: "Policy page",
      type: "block",
      description: "The platform policy file and document",
    },
  ],
};
