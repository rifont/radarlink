"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ModeToggle } from "../shared/mode-toggle";
import { Button } from "../ui/button";
import { RadarLink } from "../shared/icons";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled
          ? "border-b border-border bg-background/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <RadarLink className="h-8 w-8 mr-2" width={30} height={30} />
            <p>RadarLink</p>
          </Link>
          <div className="ml-auto mr-4"><ModeToggle /></div>
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Button onClick={() => setShowSignInModal(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
