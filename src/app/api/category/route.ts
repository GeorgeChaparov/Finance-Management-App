import { HttpStatus } from "@/src/enums";
import { getUserIdFromCookieAction } from "@/src/lib/actions/authActions";
import { getAllCategoryOfUser } from "@/src/lib/database/category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: HttpStatus.NotImplemented_501 }
  );
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromCookieAction();
    const categories = await getAllCategoryOfUser({ userId });

    return new Response(JSON.stringify(categories));
  } catch (error) {
    return new Response("Unauthorized", { status: HttpStatus.Unauthorized_401 });
  }
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: HttpStatus.NotImplemented_501 }
  );
}