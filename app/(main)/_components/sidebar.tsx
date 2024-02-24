"use client";

import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  Album,
  ChevronsLeft,
  HomeIcon,
  MenuIcon,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import GalleryListFetch from "./gallery-list-fetch";
import { Item } from "./item";

function Sidebar() {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const settings = useSettings();

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    }
  };

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);

      sidebarRef.current.style.width = "0";
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  return (
    <>
      <div
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          " group/sidebar h-full   overflow-x-hidden relative flex w-60 flex-col   max-w-[350px] transition-all ease-in-out"
        )}
      >
        <div className="flex flex-col justify-end mb-5 gap-y-2 absolute right-3 p-4">
          <button onClick={collapse}>
            <ChevronsLeft className="h-6 w-6" />
          </button>
          <div className="z-[999998]">
            <UserButton />
          </div>
        </div>
        <div className="pl-3 mt-[85px]">
          <Item label="Home" icon={HomeIcon} onClick={() => router.push("/")} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item
            label="All Albums"
            icon={Album}
            onClick={() => router.push("/gallery")}
          />
        </div>
        <div className="pl-3 w-full mt-6">
          <h2 className=" text-muted-foreground font-semibold pl-[12px]">
            Albums
          </h2>

          <GalleryListFetch />
        </div>
      </div>

      <div className="bg-transparent p-4">
        {isCollapsed && (
          <MenuIcon
            onClick={resetWidth}
            role="button"
            className="h-6 w-6 text-muted-foreground"
          />
        )}
      </div>
    </>
  );
}

export default Sidebar;
