"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function CTA() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Section className="bg-black/90 text-white">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="!my-0 md:text-3xl text-xl font-semibold">
          Be the first to get latest news!
        </h2>
        <p className="text-lg opacity-70 text-balance md:text-2xl">
          Sign up to receive email updates on new collection announcements, gift
          ideas, special promotions, sales and more. And no spam, of course!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex h-fit items-center justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-64"
                      placeholder="Your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"lg"}>
              Submit
            </Button>
          </form>
        </Form>
      </Container>
    </Section>
  );
}

export default CTA;
