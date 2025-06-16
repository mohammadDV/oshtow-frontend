import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  const response = NextResponse.next();
  response.headers.set("x-device", isMobile ? "mobile" : "desktop");
  return response;
}

export const config = {
  matcher: ["/", "/(app|dashboard|.*)"],
};
