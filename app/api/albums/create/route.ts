import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    // check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    let user;

    if (existingUser) {
      user = existingUser;
    } else {
      // create new user
      user = await prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    // create new file with id added to the user
    const createAlbum = await prisma.album.create({
      data: {
        userId: user.id,
        name,
      },
    });

    return NextResponse.json(createAlbum);
  } catch (error) {
    console.log("[ALBUMS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
