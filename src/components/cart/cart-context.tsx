"use client";

import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";

type Product = {
  id: string;
  name: string;
  // handle: string;
  price: number;
  featuredImage: { url: string; altText: string };
  availableSizes: string[];
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  featuredImage: { url: string; altText: string };
};

export type Cart = {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
};

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { productId: string; updateType: UpdateType };
    }
  | { type: "ADD_ITEM"; payload: { product: Product; selectedSize: string } };

type CartContextType = {
  cart: Cart;
  updateCartItem: (productId: string, updateType: UpdateType) => void;
  addCartItem: (product: Product, selectedSize: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "UPDATE_ITEM": {
      const { productId, updateType } = action.payload;
      let updatedItems = state.items
        .map((item) => {
          if (item.productId === productId) {
            if (updateType === "plus")
              return { ...item, quantity: item.quantity + 1 };
            if (updateType === "minus" && item.quantity > 1)
              return { ...item, quantity: item.quantity - 1 };
            if (updateType === "delete") return null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      const totalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return { items: updatedItems, totalQuantity, totalAmount };
    }
    case "ADD_ITEM": {
      const { product, selectedSize } = action.payload;
      console.log(product, selectedSize, ":::Adding items...");
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === product.id && item.selectedSize === selectedSize,
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const newItem: CartItem = {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          selectedSize,
          featuredImage: product.featuredImage,
        };
        updatedItems = [...state.items, newItem];
      }

      const totalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return { items: updatedItems, totalQuantity, totalAmount };
    }
    default:
      return state;
  }
}

export function CartProvider({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart: Cart;
}) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  // useEffect(() => {
  //   setCart(initialCart);
  // }, []);

  const [isPending, startTransition] = useTransition();

  const updateCartItem = (productId: string, updateType: UpdateType) => {
    startTransition(() => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { productId, updateType },
      });
    });
  };

  const addCartItem = (product: Product, selectedSize: string) => {
    startTransition(() => {
      updateOptimisticCart({
        type: "ADD_ITEM",
        payload: { product, selectedSize },
      });
    });
  };

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
      isPending,
    }),
    [optimisticCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
