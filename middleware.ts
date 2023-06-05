//Mark this imports
/*
Middleware runs before we reach a certain page(all pages)
In other words it runs before reaching a  request
Motto of this Middleware
  ->Verify the incoming token before going to target endpoint.
*/
import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";
export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //is jwt token and secret same?
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
}

//trigger this middleware for only this endpoint.
export const config = {
  matcher: ["/api/auth/me"],
};
