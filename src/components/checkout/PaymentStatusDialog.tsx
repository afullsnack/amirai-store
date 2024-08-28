import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const PaymentStatusDialog: React.FC<{
  status: string;
  title: string;
  message: string;
  description: string;
  btnText: string;
  btnFunction: (...args: any[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}> = ({
  status,
  title,
  message,
  description,
  btnText,
  btnFunction,
  open,
  setOpen,
  children,
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogTitle>{message}</DialogTitle>
      </DialogHeader>
      <p>{description}</p>
      <DialogFooter>
        {status !== "success" && (
          <div className="w-full flex items-center gap-4">
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
            <Button onClick={btnFunction}>{btnText}</Button>
          </div>
        )}

        {status === "success" && (
          <Link href={"/category"} passHref>
            <Button>Continue shopping</Button>
          </Link>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
