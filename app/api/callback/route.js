import { NextRequest, NextResponse } from "next/server";

let callBack = null;

export function GET() {
  return NextResponse.json(callBack, { status: 200 });
}

export async function POST(NextRequest) {
  callBack = await NextRequest.json();
  console.log(callBack.data);
  return NextResponse.json({ message: "success" }, { status: 200 });
}

export function handler() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
