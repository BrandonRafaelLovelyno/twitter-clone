import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";
import serverAuth from "@/hooks/libs/serverAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await serverAuth();
    const { postId } = body;

    if (!postId) {
      throw new Error("Undefined postId");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid postID");
    }

    const updatedLikedIds = [...post.likedIds, currentUser.id];

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    const updatedNotif = await prisma.notification.create({
      data: {
        userId: updatedPost.userId,
        body: "Someone liked your tweet !",
      },
    });

    return NextResponse.json({ data: updatedPost, success: true, message: "" });
  } catch (err) {
    return NextResponse.json({
      data: {},
      message: (err as Error).message,
      success: false,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await serverAuth();
    const { postId } = body;

    if (!postId) {
      throw new Error("Undefined postId");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid postID");
    }

    const updatedLikedIds = post.likedIds.filter((id) => id !== currentUser.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    const updatedNotif = await prisma.notification.create({
      data: {
        userId: updatedPost.userId,
        body: "Someone unliked your tweet !",
      },
    });

    return NextResponse.json({ data: updatedPost, success: true, message: "" });
  } catch (err) {
    return NextResponse.json({
      data: {},
      message: (err as Error).message,
      success: false,
    });
  }
}
