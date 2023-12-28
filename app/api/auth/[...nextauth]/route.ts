import NextAuth from "next-auth/next";
import options from "../../../../hooks/libs/nextAuthOption";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
