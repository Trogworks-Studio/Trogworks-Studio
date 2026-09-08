import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, verifyPassword, publicUser } from "@/lib/queries/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const user = getUserByEmail(credentials.email);
        if (!user) return null;
        const valid = verifyPassword(user, credentials.password);
        if (!valid) return null;
        const pub = publicUser(user);
        return { ...pub, id: user.id };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // Oturum her kontrol edildiğinde en güncel seviye/xp bilgisini
      // token'a taşı, böylece oyun ilerlemesi anlık yansır.
      if (trigger === "update" || user) {
        const { getUserById, publicUser: toPublic } = await import("@/lib/queries/users");
        const fresh = getUserById(token.id);
        if (fresh) {
          const pub = toPublic(fresh);
          token.level = pub.level;
          token.xp = pub.xp;
          token.totalXp = pub.totalXp;
          token.gearCoins = pub.gearCoins;
          token.avatarUrl = pub.avatarUrl;
          token.name = pub.name;
          token.role = pub.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.level = token.level;
        session.user.xp = token.xp;
        session.user.totalXp = token.totalXp;
        session.user.gearCoins = token.gearCoins;
        session.user.avatarUrl = token.avatarUrl;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
