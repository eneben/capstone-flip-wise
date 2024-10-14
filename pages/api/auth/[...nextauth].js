import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("Vercel Environment:", process.env.VERCEL_ENV);

export const authOptions = {
  providers: [
    // process.env.VERCEL_ENV === "preview"
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
        if (
          credentials.username === "test-user" &&
          credentials.password === "katze123"
        ) {
          return {
            name: "Horst Detlef",
            email: "horst@detlef.com",
            id: "a1b2c3d4",
          };
        } else {
          return null;
        }
      },
    }),
    process.env.VERCEL_ENV !== "preview" &&
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: { params: { scope: "openid" } },
      }),

    process.env.VERCEL_ENV !== "preview" &&
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        authorization: { params: { scope: "read:user" } },
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
