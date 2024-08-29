import { type SchemaTypeDefinition } from "sanity";
import { Product } from "./product";
import { Category } from "./category";
import { Order } from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, Order],
};
