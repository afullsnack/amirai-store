import { type SchemaTypeDefinition } from "sanity";
import { Product } from "./product";
import { Category } from "./category";
import { Cart } from "./cart";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, Cart],
};
