import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const findPhoto = await prisma.photo.findFirst({
      where: {
        id: params.id,
      },
    });
    //console.log(findPhoto);

    return NextResponse.json(findPhoto, { status: 200 });
  } catch (error) {
    console.log("[PHOTO]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletePhoto = await prisma.photo.delete({
      where: {
        id: params.id,
      },
    });
    console.log(deletePhoto);

    return NextResponse.json(deletePhoto, { status: 200 });
  } catch (error) {
    console.log("[PHOTO]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
