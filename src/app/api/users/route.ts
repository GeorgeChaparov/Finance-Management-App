import { NextRequest, NextResponse } from "next/server";

// POST handler (User Creation)
export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json();

    // Validate input
    if (!userData.name || !userData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // In a real application:
    // 1. Validate email format
    // 2. Check for duplicate users
    // 3. Save to database (e.g., Prisma, MongoDB)
    console.log('Creating user:', userData);

    // Simulate created user object with ID
    const createdUser = {
      id: Date.now().toString(),  // Mock ID generation
      ...userData,
      createdAt: new Date()
    };

    return NextResponse.json(createdUser, { status: 201 });
    
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