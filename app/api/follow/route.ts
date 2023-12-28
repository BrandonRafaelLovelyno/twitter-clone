import serverAuth from "@/hooks/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await serverAuth();
    const body = await req.json();
    const { followId } = body;
    if (!followId) {
      throw new Error("Please enter the fields properly");
    }
    const followUser = await prisma.user.findUnique({
      where: {
        id: followId,
      },
    });

    if (!followUser) {
      throw new Error("Invalid followId");
    }

    let updatedFollowers = [...followUser.followersIDs, currentUser.id];

    const updatedUser = await prisma.user.update({
      where: {
        id: followId,
      },
      data: {
        followersIDs: updatedFollowers,
      },
    });

    const updatedNotif = await prisma.notification.create({
      data: {
        userId: followId,
        body: `${currentUser.username} started following you !`,
      },
    });

    return NextResponse.json({
      data: updatedUser,
      success: true,
      message: "",
    });
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
    const currentUser = await serverAuth();
    const body = await req.json();
    const { unfollowId } = body;
    if (!unfollowId) {
      throw new Error("Please enter the fields properly");
    }
    const unfollowUser = await prisma.user.findUnique({
      where: {
        id: unfollowId,
      },
    });

    if (!unfollowUser) {
      throw new Error("Invalid unfollowId");
    }

    const updatedFollowers = unfollowUser.followersIDs.filter(
      (folId) => folId !== currentUser.id
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: unfollowId,
      },
      data: {
        followersIDs: updatedFollowers,
      },
    });

    const updatedNotif = await prisma.notification.create({
      data: {
        userId: unfollowId,
        body: `${currentUser.username} stopped following you !`,
      },
    });

    return NextResponse.json({
      data: updatedUser,
      success: true,
      message: "",
    });
  } catch (err) {
    return NextResponse.json({
      data: {},
      message: (err as Error).message,
      success: false,
    });
  }
}
