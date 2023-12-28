import { getServerSession } from "next-auth";
import options from "@/hooks/libs/nextAuthOption";
import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user) {
      throw new Error("There is no session");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });
    if (!user) {
      throw new Error("There is no user");
    }
    return NextResponse.json({
      data: user,
      success: true,
      message: "",
    });
  } catch (err) {
    return NextResponse.json({
      data: "",
      message: (err as Error).message,
      success: false,
    });
  }
}
