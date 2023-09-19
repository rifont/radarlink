"use client";

import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { RadarLink } from "@/components/shared/icons";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${scrolled
          ? "border-border bg-background/50 border-b backdrop-blur-xl"
          : "bg-background/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="font-display flex items-center text-2xl">
            <RadarLink className="mr-2 h-8 w-8" />
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
