import { NextRequest, NextResponse } from "next/server";
import { CreateUserRequest } from "@/src/types/Users";
import { getUserByEmail, createUser} from "@/src/lib/user";

export async function POST(request: NextRequest) {
  try {
    const userData: CreateUserRequest = await request.json();
    const username = userData.username;
    const password = userData.password;
    const email = userData.email.toLowerCase();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (await getUserByEmail(email)) {
      return NextResponse.json(
        { error: 'This email is already used' },
        { status: 400 }
      );
    }

    const newUserId = await createUser(username, email, password)
    if (!newUserId) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 501 }
      );
    }

    console.log('Creating user:', {id: newUserId, ...userData});

    return NextResponse.json(newUserId, { status: 201 });  
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optional: Other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: 405 }
  );
}