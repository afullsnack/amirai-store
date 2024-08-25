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

export const SizeForm: React.FC<{ sizes: string[]; defaultSelect: string }> = ({
  sizes = ["fixures", "mscsdc"],
  defaultSelect,
}) => {
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
    alert(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
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
        <Button type="submit" className="capitalize">
          Add to cart
        </Button>
      </form>
    </Form>
  );
};
