"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ItemProps {
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({ label, onClick, icon: Icon }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5  flex items-center text-muted-foreground font-medium pl-[12px]"
      )}
    >
      <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
};
