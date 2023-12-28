import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";
import serverAuth from "@/hooks/libs/serverAuth";

export async function GET(req: Request) {
  try {
    const currentUser = await serverAuth();
    if (!currentUser) {
      throw new Error("You are not logged in");
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    return NextResponse.json({
      data: notifications,
      message: "",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      data: {},
      message: (err as Error).message,
      success: false,
    });
  }
}
