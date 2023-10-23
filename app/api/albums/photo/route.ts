import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

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
          userId,
        },
      });
    }

    // addPhoto
    const onePhoto = await prisma.photo.create({
      data: {
        id: randomUUID(),
        url: body.url,
        albumId: body.albumId,
      },
      include: {
        album: true,
      },
    });

    return NextResponse.json(onePhoto);
  } catch (error) {
    console.log("[PHOTO]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
