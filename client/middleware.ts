//middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SystemRoles } from "./app/utils/isAuthorized";
import getLoggedUser from "./api/Auth/getLoggedUser";

export default async function middleware(req: NextRequest) {
  const loggedUser = await getLoggedUser();
  console.log(loggedUser);
  if (!loggedUser.currentUser)
    return NextResponse.redirect(new URL("/login", req.url));
  if (loggedUser.currentUser.role === SystemRoles.SENDER)
    return NextResponse.redirect(new URL("/dashboard", req.url));
  if (loggedUser.currentUser.role === SystemRoles.BIKER)
    return NextResponse.redirect(new URL("/todo", req.url));
}

export const config = {
  matcher: "/main",
};
