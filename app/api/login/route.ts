import emailChecker from "@/hooks/libs/emailChecker";
import { NextResponse } from "next/server";
import prisma from "@/hooks/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Plase fill the field's properly");
    }

    if (!emailChecker(email)) {
      throw new Error("Please enter a valid email");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !user.hashedPassword) {
      throw new Error("Invalid credentials");
    }

    const isPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isPassword) {
      throw new Error("Invalid password");
    }

    return NextResponse.json({
      data: user,
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
