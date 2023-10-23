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
import "./sidebar.css";

function SidebarTest() {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const settings = useSettings();

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

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

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

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
          " group/sidebar h-full   overflow-y-auto relative flex w-60 flex-col   max-w-[350px]"
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
        <div className="mt-[85px]">
          <Item label="Home" icon={HomeIcon} onClick={() => router.push("/")} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item
            label="All Albums"
            icon={Album}
            onClick={() => router.push("/gallery")}
          />
        </div>
        <div className="w-full mt-4">
          <h2 className="min-h-[27px] text-sm py-1 pr-3 w-full  flex items-center text-muted-foreground font-medium pl-[12px]">
            Albums
          </h2>

          <GalleryListFetch />
        </div>
      </div>
      <div
        className="w-1   bg-slate-100  shadow-sm cursor-col-resize"
        onMouseDown={startResizing}
      />

      <div className="bg-transparent py-2">
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

export default SidebarTest;
