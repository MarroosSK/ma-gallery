"use client";

import Link from "next/link";

export const GalleryList = ({ myAlbums }: { myAlbums: any }) => {
  return (
    <>
      {myAlbums.albums && myAlbums.albums.length !== 0 ? (
        <ul className="mt-3 flex flex-col space-y-4">
          {myAlbums.albums.map((res: any) => (
            <li key={res?.id} className=" rounded-lg  ">
              <Link href={`/gallery/${res?.id}`}>
                <p className=" truncate  text-sm space-pr-3 py-1 w-full    text-muted-foreground pl-[12px]">
                  {res?.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className=" truncate  text-sm  pr-3 w-full   text-muted-foreground pl-[12px]">
          No albums
        </p>
      )}
    </>
  );
};
