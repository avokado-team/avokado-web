import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

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
