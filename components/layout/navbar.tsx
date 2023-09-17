"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Letters } from "../shared/letters";
import TECHNOLOGY from "../shared/technology.json";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useMemo } from "react";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const mdMedia = useMediaQuery('(min-width: 640px)')
  const technologies = useMemo(() => (mdMedia ? TECHNOLOGY : TECHNOLOGY.filter(tech => tech.name.length < 15)).map(word => word.name), [mdMedia])

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="RadarLink logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="sm:block hidden">RadarLink</p>
          </Link>
          <Letters
            className="mx-2 sm:ml-auto sm:mr-4 px-4 bg-[#333333] rounded-2xl"
            words={technologies}
            height={30}
            enterColor="#448ae9"
            updateColor="white"
            exitColor="#448ae9"
            prefix="> "
            prefixColor="white"
          />
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <button
              className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
              onClick={() => setShowSignInModal(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
}
