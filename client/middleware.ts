//middleware.ts

import getLoggedUser from "@/api/getLoggedUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SystemRoles } from "./app/utils/isAuthorized";

export default async function middleware(req: NextRequest) {
  const loggedUser = await getLoggedUser();
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
