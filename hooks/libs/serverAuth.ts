import { getServerSession } from "next-auth";
import options from "./nextAuthOption";
import prisma from "@/hooks/libs/prismadb";

const serverAuth = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.email) {
    throw new Error("You are not logged in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("You are not logged in");
  }

  return currentUser;
};

export default serverAuth;
