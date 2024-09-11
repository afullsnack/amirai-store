import { type SchemaTypeDefinition } from "sanity";
import { Product } from "./product";
import { Category } from "./category";
import { Order } from "./order";
import { Size } from "./size";
import { Content } from "./content";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, Order, Size, Content],
};
