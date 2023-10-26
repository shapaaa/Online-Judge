import DBConnection from "@/app/lib/db";
import getAuthenticatedUser from "@/app/lib/getAuthenticatedUser";
import Submission from "@/app/models/submission";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
}
