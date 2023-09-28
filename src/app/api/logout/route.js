import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  cookies().delete("jwt");
  return NextResponse.json("Logged Out Successfully");
}
