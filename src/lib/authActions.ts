'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { createUser, getUserByEmail } from './database/user';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { userSchema } from '../schemas/userSchemas';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/home',
      redirect: true
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.name) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({ redirect: false }); //There is some kind of problem whit the build in redirectTo prop. That's why I am handling it this way.
  } catch (error) {
    console.error('Error during signout:', error);
  } finally {
    redirect('/');
  }
}

export async function signin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  try {
    if (!username || !email || !password) 
    return { error: 'Name and email are required' , status: 400 };

    const parsedCredentials = userSchema.safeParse({username, password, email});

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      
      const userExists = await getUserByEmail(email);
      if (userExists) 
      return { error: 'This email is already used' , status: 400};

      const hashedPassword = await bcrypt.hash(password, 15);
      const newUserId = await createUser(username, email, hashedPassword)

      if (!newUserId) {
        console.error("No new id returned. Id = ", newUserId)
        return { error: 'Internal server error', status: 501 };
      }
    
      console.log('Creating user:', { id: newUserId, username, password, email });
      return {id: newUserId, status: 201 }; 
    }
    else {
      console.error("Parsing credentials unsuccessfull: ", parsedCredentials.error);
      console.error(parsedCredentials.data);
    }
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
}

export async function getUseIdFromCookie() {
  const cookieStore = await cookies();
  const token = await getToken({
    req: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
    secret: process.env.AUTH_SECRET,
  });

  return token?.id as string ?? null;
}