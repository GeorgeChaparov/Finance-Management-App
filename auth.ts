import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUser } from './src/lib/database/user';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string(), password: z.string() })
        .safeParse(credentials);
      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser({email});
        if (!user){
          console.error("Can't find email.");
          return null;
        } 

        const passwordsMatch = await bcrypt.compare(password, user.password);  
        if (passwordsMatch) return user;   
        else console.error("Password not mathing.");
      }
      else {
        console.error("Parsing credentials unsuccessfull: ", parsedCredentials.error);
        console.error(parsedCredentials.data);
      }
  
      return null;
    },
  })],
});