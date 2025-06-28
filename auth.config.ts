import type { NextAuthConfig } from 'next-auth';
import { publicPagesURL } from './src/consts';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/wellcome'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass user ID to session object
      session.user.id = token.id as string;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      let publicPage = false;

      for (let i = 0; i < publicPagesURL.length; i++) {
        if (pathname === publicPagesURL[i]) {
          publicPage = true;
          break;
        }
      }
      
      // Non-authenticated users can access public pages.
      if (publicPage && !isLoggedIn) return true;

      // Authenticated users can access protected pages.
      if (!publicPage && isLoggedIn) return true;

      console.log("aa");
      
      // Otherwise, block request and trigger redirect.
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;