import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface ISessionContent {
  access?: string;
  refresh?: string;
  id?: string;
  exp?: number;
}

export async function getSession() {
  return getIronSession<ISessionContent>(cookies(), {
    cookieName: "avka_session",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function getReqSession(req: NextRequest, res: NextResponse) {
  return getIronSession<ISessionContent>(req, res, {
    cookieName: "avka_session",
    password: process.env.COOKIE_PASSWORD!,
  });
}
