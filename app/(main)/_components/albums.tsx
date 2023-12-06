"use client";

import React, { useState } from "react";

import { Album, Trash } from "lucide-react";
import Link from "next/link";

import axios from "axios";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import CreateButton from "./create-button";
import { Spinner } from "@/components/spinner";
import Image from "next/image";
import { toast } from "sonner";

const Albums = ({ myAlbums }: { myAlbums: any }) => {
  const router = useRouter();
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const handleDelete = async (id: string) => {
    setCurrentlyDeletingFile(id);
    const deletedFile = await axios.delete(`/api/albums/${id}`);

    if (deletedFile) {
      toast.success("Succesfully deleted!");
      setCurrentlyDeletingFile(null);
      router.refresh();
    } else {
      toast.error("Error has occured!");
    }
  };

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-4xl text-slate-500">My Albums</h1>
        <CreateButton />
      </div>

      <div>
        {myAlbums && myAlbums.length !== 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {myAlbums.map((res: any) => (
              <li
                key={res?.id}
                className="h-[499px] col-span-1 divide-y divide-gray-200 rounded-lg bg-white dark:bg-slate-800 shadow transition hover:shadow-lg "
              >
                <div className="px-6 mt-4 flex flex-col items-center justify-between py-2 gap-6">
                  <div className="w-full flex items-center justify-between">
                    <Link href={`/gallery/${res?.id}`} className="w-3/4">
                      <h3 className="truncate text-lg font-medium text-slate-500">
                        {res?.name}
                      </h3>
                    </Link>
                    <Button
                      onClick={() => handleDelete(res?.id)}
                      size="sm"
                      className="w-1/4"
                    >
                      {currentlyDeletingFile === res?.id ? (
                        <Spinner />
                      ) : (
                        <Trash className="h-4 w-4 text-red-500" />
                      )}
                    </Button>
                  </div>
                  {res.photos.length > 0 ? (
                    <Link href={`/gallery/${res?.id}`}>
                      <Image
                        src={res.photos[0].url}
                        alt="foto"
                        width={350}
                        height={400}
                        className="max-w-[100%] h-[380px] rounded-sm"
                      />
                    </Link>
                  ) : (
                    <h2 className="mt-5 text-sm min-h-[27px] text-center text-muted-foreground font-medium">
                      No photos
                    </h2>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-[220px] flex flex-col items-center gap-2">
            <Album className="h-8 w-8 text-slate-800" />
            <h3 className="font-semibold text-xl">
              No Albums, start creating memories
            </h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;
