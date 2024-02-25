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
    <div className="px-3 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold tracking-tight lg:text-6xl">
        Your moments captured in time. Welcome to{" "}
        <span className="underline text-primary">MAGallery</span>
      </h1>
      <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-muted-foreground">
        MAGallery is cloud solution to keep your photos in one place and
        categorized.
      </p>
      {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isSignedIn && isLoaded && (
        <Button
          variant="ghost"
          size="lg"
          className="border border-primary"
          asChild
        >
          <Link href="/gallery">
            Enter gallery
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button variant="ghost" className="border border-primary">
            Start here for free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Hero;
