"use client";

import Link from "next/link";

export const GalleryList = ({ myAlbums }: { myAlbums: any }) => {
  return (
    <>
      {myAlbums.albums && myAlbums.albums.length !== 0 ? (
        <ul className="mt-3 flex flex-col divide-y ">
          {myAlbums.albums.map((res: any) => (
            <li
              key={res?.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg  shadow transition hover:shadow-lg "
            >
              <Link href={`/gallery/${res?.id}`} className="w-3/4">
                <h3 className=" truncate min-h-[27px] text-sm py-4 pr-3 w-full hover:bg-primary/5  flex items-center text-muted-foreground font-medium pl-[12px]">
                  {res?.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="min-h-[27px] text-sm py-1 pr-3 w-full  flex items-center text-muted-foreground font-medium pl-[12px]">
          No albums
        </h3>
      )}
    </>
  );
};
