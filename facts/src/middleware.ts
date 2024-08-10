import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname, protocol } = req.nextUrl;
  if (!pathname.split(".")[1]) {
    console.log(protocol, req.method, pathname);
  }
}
