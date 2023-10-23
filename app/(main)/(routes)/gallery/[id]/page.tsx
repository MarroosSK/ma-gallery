import SingleAlbum from "@/app/(main)/_components/SingleAlbum";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const getAlbum = async (id: string) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const response = await prisma.album.findUnique({
    where: {
      id: id,
      userId,
    },
    include: {
      photo: true,
    },
  });
  return response;
};

const GalleryByIdPage = async ({ params }: { params: { id: string } }) => {
  const albumData = await getAlbum(params.id);

  return (
    <div>
      <SingleAlbum initialData={albumData} />
    </div>
  );
};

export default GalleryByIdPage;
