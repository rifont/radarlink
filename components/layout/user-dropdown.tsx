"use client";

import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};

  if (!email) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full border transition-all duration-75 focus:outline-none active:scale-95">
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-not-allowed">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <p className="text-sm">Dashboard</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <p className="text-sm">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
