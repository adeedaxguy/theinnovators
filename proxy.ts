import { NextRequest, NextResponse } from "next/server";

const ADMIN_PREFIX = "/admin";
const CANVA_USA_PATH = "/USA";

function disabled() {
  return new NextResponse("Admin route disabled", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="The Innovators Admin", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === CANVA_USA_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = "/usa";
    return NextResponse.redirect(url);
  }

  if (!request.nextUrl.pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return disabled();
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(authorization.slice("Basic ".length));
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  if (separator < 0) {
    return unauthorized();
  }

  const suppliedUsername = decoded.slice(0, separator);
  const suppliedPassword = decoded.slice(separator + 1);

  if (suppliedUsername !== username || suppliedPassword !== password) {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/USA"],
};
