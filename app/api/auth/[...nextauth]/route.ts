import NextAuth from "next-auth/next";
import options from "../../../../libs/nextAuthOption";

const handler=NextAuth(options)

export {handler as GET , handler as POST}