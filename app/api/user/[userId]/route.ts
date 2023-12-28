import prisma from "@/hooks/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new Error("Invalid userId");
    }

    return NextResponse.json({
      data: existingUser,
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
