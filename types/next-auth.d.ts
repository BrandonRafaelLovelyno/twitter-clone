import { DefaultSession, Token } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      name: string;
      createdAt: Date;
      bio:string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface Token {
    createdAt: Date;
    username: string;
    name: string;
    email: string;
    image: string;
  }
}
