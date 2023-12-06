import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteAlbum = await prisma.album.delete({
      where: {
        id: params.id,
        userId,
      },
      include: {
        photos: true,
      },
    });
    console.log(deleteAlbum);

    return NextResponse.json(deleteAlbum, { status: 200 });
  } catch (error) {
    console.log("[ALBUMS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
