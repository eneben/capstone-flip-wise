import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            username: "test-user",
            password: "katze123",
            userData: {
              name: "Horst Detlef",
              email: "horst@detlef.com",
              id: "a1b2c3d4",
            },
          },
          {
            username: "super-user",
            password: "sonnenblume",
            userData: {
              name: "Ingrid Meier",
              email: "ingrid@meier.com",
              id: "b5c6d7e8",
            },
          },
          {
            username: "best-coaches",
            password: "lieblings-hummer",
            userData: {
              name: "Andrea Jessica",
              email: "andrea@jessica.com",
              id: "c9d0e1f2",
            },
          },
        ];

        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (user) {
          return user.userData;
        } else {
          return null;
        }
      },
    }),

    process.env.VERCEL_ENV !== "preview" &&
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        authorization: { params: { scope: "read:user" } },
      }),

    process.env.VERCEL_ENV !== "preview" &&
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: { params: { scope: "openid" } },
      }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
