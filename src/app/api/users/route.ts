import { HttpStatus } from "@/src/enums";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: HttpStatus.NotImplemented_501 }
  );
}

// Optional: Other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: HttpStatus.NotImplemented_501 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: HttpStatus.NotImplemented_501 }
  );
}