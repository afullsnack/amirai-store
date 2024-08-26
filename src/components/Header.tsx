import {
  Package2,
  Menu,
  Search,
  CircleUser,
  ShoppingCart,
  SearchX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center !justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dresses
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground min-w-fit"
        >
          Best sellers
        </Link>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Amirai</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dresses
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground min-w-fit"
            >
              Best sellers
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {/*<Package2 className="h-6 w-6" />*/}
          <span className="text-xl font-bold text-balance text-black">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={10}
              className="object-cover h-8 w-24 overflow-clip"
            />
          </span>
          <span className="sr-only">Amirai</span>
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4 w-auto">
        <form className="ml-auto flex-1 sm:flex-initial md:flex hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Search className="h-5 w-5 flex md:hidden" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="shrink-0 gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>$0.00</span>
              <span className="sr-only">Toggle cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Shopping cart</SheetTitle>
            </SheetHeader>
            <div className="h-full relative overflow-y-auto">
              <div className="absolute left-0 right-0 bottom-10 flex items-center justify-between px-2 py-4 border-b border-t">
                <span>SUB-TOTAL</span>
                <span>$0</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
