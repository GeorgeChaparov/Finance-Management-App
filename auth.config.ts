import type { NextAuthConfig } from 'next-auth';

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
      const isOnHome = nextUrl.pathname.startsWith('/home');
      console.log(isOnHome);
      
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; 
      }
      
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;