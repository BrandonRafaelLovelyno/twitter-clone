import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const currentUser = await serverAuth();
    const { postId, body } = reqBody;
    if (!postId) {
      throw new Error("Invalid postId");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new Error("Invalid postId");
    }
    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        userId: currentUser.id,
      },
    });
    if (!comment) {
      throw new Error("Error on posting comment");
    }
    const updatedNotif = await prisma.notification.create({
      data: {
        userId: post.userId,
        body: `${currentUser.username} commented on your tweet!`,
      },
    });
    return NextResponse.json({
      data: comment,
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
