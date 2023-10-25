import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import emailChecker from "@/libs/emailChecker";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, username, name, password } = body;

    if (!email || !username || !name || !password) {
      throw new Error("Please fill the field's properly");
    }

    if (!emailChecker(email)) {
      throw new Error("Please enter a valid email");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({ data: user, success: true, message: "" });
  } catch (err) {
    const error = err as Error;

    if (error.name === "PrismaClientKnownRequestError") {
      return NextResponse.json({
        data: {},
        sucess: false,
        message: "Uh-oh, make sure the email and username are uniques",
      });
    }

    return NextResponse.json({
      data: {},
      sucess: false,
      message: (err as Error).message,
    });
  }
}
