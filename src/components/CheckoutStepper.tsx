"use client";
import { z } from "zod";
import { defineStepper } from "@stepperize/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/craft";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const { useStepper } = defineStepper(
  { id: "information" },
  { id: "shipping" },
  { id: "payment" },
);

const formSchema = z.object({
  email: z.string().email("Not a valid email address"),
  country: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  address: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(3),
  zipCode: z.string().min(4),
});

export const CheckoutStepper: React.FC<{ checkoutId: string }> = ({
  checkoutId,
}) => {
  const stepper = useStepper();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: "",
    // },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    stepper.next();
  }

  return (
    <>
      <Container className="!px-0 pb-5 flex w-full items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {stepper.when(
                "information",
                ({ id }) => (
                  <Button>Information</Button>
                ),
                ({ id }) => (
                  <Button variant={"outline"}>Information</Button>
                ),
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {stepper.when(
                "shipping",
                ({ id }) => (
                  <Button>Shipping</Button>
                ),
                ({ id }) => (
                  <Button variant={"outline"}>Shipping</Button>
                ),
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {stepper.when(
                "payment",
                ({ id }) => (
                  <Button>Payment</Button>
                ),
                ({ id }) => (
                  <Button
                    className={"font-semibold"}
                    variant={"outline"}
                    // href={`${pathname}/payment`}
                  >
                    Payment
                  </Button>
                ),
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>

      {stepper.switch({
        information: ({ id }) => (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h1 className="text-xl font-semibold">Contact</h1>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email address for invoice and contact.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Shipping address</h1>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country/Region" {...field} />
                      </FormControl>
                      {/*<FormDescription>
                  Country
                </FormDescription>*/}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        {/*<FormDescription>
                  Country
                </FormDescription>*/}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        {/*<FormDescription>
                  Country
                </FormDescription>*/}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      {/*<FormDescription>
                Country
              </FormDescription>*/}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        {/*<FormDescription>
                    Country
                  </FormDescription>*/}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        {/*<FormDescription>
                    Country
                  </FormDescription>*/}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP code</FormLabel>
                        <FormControl>
                          <Input placeholder="ZIPCODE" {...field} />
                        </FormControl>
                        {/*<FormDescription>
                    Country
                  </FormDescription>*/}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Continure to shipping
              </Button>
            </form>
          </Form>
        ),
        shipping: ({ id }) => (
          <Container className="!p-0 w-full flex flex-col">
            <Container className="!p-2 border border-muted-foreground rounded-sm w-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="flex flex-col justify-start md:flex-row md:gap-6">
                  {"Contact"} <b>{form.getValues("email")}</b>
                </span>
                <Button
                  variant={"link"}
                  className=""
                  onClick={() => stepper.prev()}
                >
                  Change
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="flex flex-col justify-start md:flex-row md:gap-6">
                  {"Ship to"} <b>{form.getValues("address")}</b>
                </span>
                <Button
                  variant={"link"}
                  className=""
                  onClick={() => stepper.prev()}
                >
                  Change
                </Button>
              </div>
            </Container>

            <Container className="!p-2 w-full flex flex-col mt-5">
              <h1 className="text-xl font-semibold">Shipping method</h1>
              <div className="border border-blue-400 flex flex-col w-full p-4 rounded-sm">
                <span className="flex gap-8 items-center justify-between">
                  {"Economy"} <b>{"Free"}</b>
                </span>
                <span className="flex gap-6 items-center text-black/50">
                  {"3 to 5 buiness days"}
                </span>
              </div>
            </Container>

            <Container className="flex gap-4 flex-col md:flex-row items-center md:justify-between w-full">
              <Button
                variant={"link"}
                className="w-full md:w-auto"
                onClick={() => stepper.prev()}
              >
                <ChevronLeft className="size-3" /> Back to information
              </Button>

              <Button
                className="w-full md:w-auto"
                onClick={() => stepper.next()}
              >
                Continue to shipping
              </Button>
            </Container>
          </Container>
        ),
        payment: ({ id }) => (
          <Container className="!p-0 w-full flex flex-col">
            <Container className="!p-2 border border-muted-foreground rounded-sm w-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="flex flex-col justify-start md:flex-row md:gap-6">
                  {"Contact"} <b>{form.getValues("email")}</b>
                </span>
                <Button
                  variant={"link"}
                  className=""
                  onClick={() => stepper.goTo("information")}
                >
                  Change
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="flex flex-col justify-start md:flex-row md:gap-6">
                  {"Ship to"} <b>{form.getValues("address")}</b>
                </span>
                <Button
                  variant={"link"}
                  className=""
                  onClick={() => stepper.goTo("information")}
                >
                  Change
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="flex flex-col justify-start md:flex-row md:gap-6">
                  {"Shipping"} <b>{"Free"}</b>
                </span>
              </div>
            </Container>

            <Container className="!p-2 w-full flex flex-col mt-5">
              <h1 className="text-xl font-semibold">Payment</h1>
              <span>All transactions are secure and encrypted</span>
              <div className="bg-muted-foreground/20 flex flex-col w-full p-4 rounded-sm">
                <span className="flex gap-6 items-center justify-center">
                  <CreditCard className="size-8" />
                </span>
                <span className="flex gap-8 items-center text-center text-balance">
                  <b>
                    {
                      "Make your payment, to get your order processed and shipped out"
                    }
                  </b>
                </span>
              </div>
            </Container>

            <Container className="flex md:flex-row flex-col items-center gap-4 md:justify-between w-full">
              <Button
                variant={"link"}
                className="w-full md:w-auto"
                onClick={() => stepper.prev()}
              >
                <ChevronLeft className="size-3" /> Back to shipping
              </Button>

              <Button
                className="w-full md:w-auto"
                onClick={() => alert("You will bre redirected to make payment")}
              >
                Pay now
              </Button>
            </Container>
          </Container>
        ),
      })}
    </>
  );
};
