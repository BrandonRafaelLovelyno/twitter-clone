import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return NextResponse.json({ data: post, success: true, message: "" });
  } catch (err) {
    return NextResponse.json({
      data: {},
      success: false,
      message: (err as Error).message,
    });
  }
}
