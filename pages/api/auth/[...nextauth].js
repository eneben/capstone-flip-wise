import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

console.log("wird das aufgerufen?");

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user" } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          name: session.user.name,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
