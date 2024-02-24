"use client";

import { useState } from "react";

import { Album, Trash } from "lucide-react";
import Link from "next/link";

import axios from "axios";

import { useRouter } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CreateButton from "./create-button";

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
        <h1 className="mb-3 font-bold text-4xl text-primary">My Albums</h1>
        <CreateButton />
      </div>

      <div>
        {myAlbums && myAlbums.length !== 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
            {myAlbums.map((res: any) => (
              <li
                key={res?.id}
                className=" col-span-1 divide-y bg-white shadow  dark:bg-slate-800 "
              >
                <div className="p-4 flex flex-col items-center justify-between ">
                  <div className="w-full flex items-center justify-between">
                    <Link href={`/gallery/${res?.id}`} className="w-3/4">
                      <p className="truncate text-lg font-medium text-primary">
                        {res?.name}
                      </p>
                    </Link>
                    <Button
                      onClick={() => handleDelete(res?.id)}
                      size="sm"
                      className="w-1/4"
                    >
                      {currentlyDeletingFile === res?.id ? (
                        <Spinner />
                      ) : (
                        <Trash className="h-4 w-4 " />
                      )}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-[220px] flex flex-col items-center gap-2">
            <Album className="h-16 w-16 text-primary" />
            <h2 className=" text-lg py-1   text-muted-foreground font-medium ">
              No Albums, start creating memories
            </h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;
