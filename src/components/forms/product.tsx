"use cleint";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "../cart/cart-context";
import { useState } from "react";

export const SizeForm: React.FC<{
  sizes: string[];
  defaultSelect: string;
  price: number;
  description: string;
  id: string;
  url: string;
  name: string;
}> = ({
  sizes = ["fixures", "mscsdc"],
  defaultSelect,
  price,
  description,
  id,
  url,
  name,
}) => {
  const { addCartItem, cart, updateCartItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (product: Product, selectedSize: string) => {
    if (isAdding) return;
    setIsAdding(true);
    addCartItem(product, selectedSize);
    setTimeout(() => setIsAdding(false), 500); // Re-enable after 500ms
  };

  const handleUpdateCart = (productId: string) => {
    if (isAdding) return;
    setIsAdding(true);
    updateCartItem(productId, "plus");
    setTimeout(() => setIsAdding(false), 500); // Re-enable after 500ms
  };

  const FormSchema = z.object({
    size: z.enum([defaultSelect, ...sizes], {
      required_error: "You need to select a size",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      size: defaultSelect,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // If item already in cart
    if (cart.items.some((val) => val.productId === id)) {
      handleUpdateCart(id);
    } else {
      handleAddToCart(
        {
          price,
          name,
          availableSizes: sizes,
          id,
          featuredImage: { url, altText: name },
        },
        data.size,
      );
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold md:text-2xl md:font-normal">
                Sizes:
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  variant={"outline"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-1 justify-start"
                  type="single"
                >
                  {sizes.map((size, _) => (
                    <FormItem
                      key={size}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <ToggleGroupItem value={size}>
                          <FormLabel className="font-normal">{size}</FormLabel>
                        </ToggleGroupItem>
                      </FormControl>
                    </FormItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isAdding} type="submit" className="capitalize">
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
      </form>
    </Form>
  );
};
