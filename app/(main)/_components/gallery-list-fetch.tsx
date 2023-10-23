"use client";

import React from "react";
import { GalleryList } from "./gallery-list";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const GalleryListFetch = () => {
  const router = useRouter();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const response = await axios.get(`/api/albums`);

      if (response) {
        toast.success("Albums are ready in sidebar!");
        router.refresh();
        return response.data;
      }
    },
    staleTime: Infinity,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-between p-2 gap-y-4">
        <Skeleton className="w-[200px] h-[30px] rounded-sm" />
        <Skeleton className="w-[200px] h-[30px] rounded-sm" />
        <Skeleton className="w-[200px] h-[30px] rounded-sm" />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <GalleryList myAlbums={data} />
    </>
  );
};

export default GalleryListFetch;
