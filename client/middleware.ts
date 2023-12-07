//middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SystemRoles } from "./utils/isAuthorized";
import getLoggedUser from "./api/Auth/getLoggedUser";

const PagesRolesEnum = {
  [SystemRoles.SENDER]: ["dashboard"],
  [SystemRoles.BIKER]: ["todo"],
};

export default async function middleware(req: NextRequest) {
  const loggedUser = await getLoggedUser();
  const pathnameSegments = req.url.split("/");
  const lastSegment = pathnameSegments[pathnameSegments.length - 1];
  if (!loggedUser && lastSegment !== "login")
    return NextResponse.redirect(new URL("/login", req.url));
  if (!loggedUser && lastSegment === "login") return;

  if (
    loggedUser.currentUser.role === SystemRoles.SENDER &&
    !PagesRolesEnum[SystemRoles.SENDER].includes(lastSegment)
  )
    return NextResponse.redirect(new URL("/dashboard", req.url));
  if (
    loggedUser.currentUser.role === SystemRoles.BIKER &&
    !PagesRolesEnum[SystemRoles.BIKER].includes(lastSegment)
  )
    return NextResponse.redirect(new URL("/todo", req.url));
}

export const config = {
  matcher: ["/login", "/todo", "/dashboard", "/main"],
};
