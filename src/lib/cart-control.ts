import { client } from "@/sanity/lib/client";

export const getCart = async (id: string) => {
  return await client.fetch(`
    *[_type == "cart" && _id == "${id}"][0]
  `);
};

export const addToCart = async (cartId: string, items: any[]) => {
  return await client.patch(cartId).set({ items }).commit();
};

export const removeFromCart = async (cartId: string, prodId: string) => {
  // get current and filter without the speicified prod
  const cart = await client.fetch(`
    *[_type == "cart" && _id == "${cartId}"][0]
  `);

  const filtered = cart?.items?.filter(
    (item: any) => item?.productId !== prodId,
  );

  return await client.patch(cartId).set({ items: filtered }).commit();
};

export const updateCart = async (
  cartId: string,
  item: { id: string; quantity: number },
) => {
  const cart = await client.fetch(`
    *[_type == "cart" && _id == "${cartId}"][0]
  `);

  // const matchItem = cart?.items?.find((val: any) => val?.productId === item?.id)

  const filtered = cart?.items?.filter(
    (val: any) => val?.productId !== item?.id,
  );

  return client.patch(cartId).set({
    items: [...filtered, { productId: item?.id, quantity: item?.quantity }],
  });
};

export const createCart = async () => {
  let cart = await client.create({ _type: "cart" });
  return cart;
};
