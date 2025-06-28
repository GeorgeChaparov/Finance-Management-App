'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { createUser, getUser } from '../database/user';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { userSchema } from '../../schemas/userSchemas';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { AppError } from '../errors/serverError';
import { errorLogger } from '../loggers/errorLogger';
import { HttpStatus } from '@/src/enums';
import { ServerResponse } from '@/src/types/ServerRespons';

export async function authenticateAction(formData: FormData) {
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

export async function logOutAction() {
  try {
    await signOut({ redirect: false }); //There is some kind of problem with the build in redirectTo prop. That's why I am handling it this way.
  } catch (error) {
    return errorLogger.log(`Error during signout: ${error}`);
  } finally {
    redirect('/');
  }
}

export async function signinAction(formData: FormData): Promise<ServerResponse> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  try {
    if (!username || !email || !password) throw new AppError('Name, email and password are required', HttpStatus.BadRequest_400);

    const parsedCredentials = userSchema.safeParse({username, password, email});

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      
      const userExists = await getUser({ email });
      if (userExists) throw new AppError('This email is already used', HttpStatus.BadRequest_400);

      const hashedPassword = await bcrypt.hash(password, 15);
      const newUserId = await createUser(username, email, hashedPassword)

      if (!newUserId) throw new AppError(`No new id returned. Id = ${newUserId}`, HttpStatus.InternalServerError_500)
    
      console.log('Creating user:', { id: newUserId, username, password, email });
      return {successful: true, data: {id: newUserId}, statusCode: HttpStatus.Created_201 }; 
    }

    throw new AppError(`Parsing credentials unsuccessfull: ${parsedCredentials.error}`, HttpStatus.UnprocessableEntity_422);
  } catch (error) {
    return errorLogger.log(error);
  }
}

export async function getUserIdFromCookieAction() {
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