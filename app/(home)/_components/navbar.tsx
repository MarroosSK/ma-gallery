"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div
      className={cn(
        "p-6 bg-background dark:bg-[#1F1F1F] fixed  flex items-center justify-between  w-full",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href="/">
        <h2 className="text-1xl font-semibold text-primary">MAGallery</h2>
      </Link>
      <div className="ml-auto  w-full flex items-center md:justify-end justify-between gap-x-2">
        {!isLoaded && <Spinner />}

        {/* IF NOT AUTHENTICATED */}
        {!isSignedIn && (
          <SignInButton mode="modal">
            <Button variant="ghost" className="border border-primary" size="sm">
              Log in
            </Button>
          </SignInButton>
        )}

        {/* IF  AUTHENTICATED */}
        {isSignedIn && isLoaded && (
          <>
            <Button
              variant="ghost"
              className="animate-pulse border border-primary"
              size="sm"
              asChild
            >
              <Link href="/gallery">Enter gallery</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
