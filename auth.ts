import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserByEmail } from './src/lib/database/user';
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
        const user = await getUserByEmail(email);
        if (!user){
          console.log("cant find email.");
          return null;
        } 
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          console.log("user logged");
          return user;  
        } 
        else console.log("password not mathing.");
        
      }
      else {
        console.error("parsing credentials unsuccessfull: ", parsedCredentials.error);
        console.log(parsedCredentials.data);
        
      }
  
      return null;
    },
  })],
});