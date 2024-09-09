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

export async function silentRefresh(session: IronSession<ISessionContent>) {
  "use server";
  const request = await fetch(`${process.env.GATEWAY_ENDPOINT!}/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${session.refresh}`,
    },
  });

  if (request.ok) {
    const token = await request.json();
    session.access = token.access;
    session.refresh = token.refresh;
    session.save();
    return true;
  } else {
    session.destroy();
    return false;
  }
}
