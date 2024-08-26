// app/CartWrapper.tsx
import { Cart, CartProvider } from "@/components/cart/cart-context";

// const initialCart = use((async () => cartPromise)());
export default async function CartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCart = createEmptyCart();

  return <CartProvider initialCart={initialCart}>{children}</CartProvider>;
}

const createEmptyCart = (): Cart => {
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};
