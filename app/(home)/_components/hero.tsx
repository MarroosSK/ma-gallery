"use client";

import { useAuth, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

const Hero = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-6">
        Your moments captured in time. Welcome to{" "}
        <span className="underline text-indigo-500">MAGallery</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
        MAGallery is cloud solution to keep your photos in one place and
        categorized.
      </h3>
      {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isSignedIn && isLoaded && (
        <Button variant="outline" asChild>
          <Link href="/gallery">
            Enter gallery
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button variant="outline">
            Start here for free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Hero;
