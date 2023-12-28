import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";
import serverAuth from "@/hooks/libs/serverAuth";

export async function PATCH(req: Request) {
  try {
    const currentUser = await serverAuth();

    const body = await req.json();
    const { name, username, bio, image, coverImage } = body;

    if (!name || !username || !image || !coverImage) {
      throw new Error("Please fill the fields properly");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        image,
        coverImage,
      },
    });

    if (!updatedUser) {
      throw new Error("Invalid user");
    }

    return NextResponse.json({
      data: updatedUser,
      success: true,
      message: "",
    });
  } catch (err) {
    return NextResponse.json({
      data: {},
      success: false,
      message: (err as Error).message,
    });
  }
}
