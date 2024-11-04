import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  const api = `${process.env.GATEWAY_ENDPOINT}/user/confirm-email/${id}`;
  var redirect_url = "";
  try {
    const res = await fetch(api, {
      cache: "no-cache",
    });
    if (res.ok) {
      redirect_url = "/user/confirm-email-done";
    } else {
      redirect_url = "/user/confirm-email-error";
    }
  } catch (error) {
    redirect_url = "/user/confirm-email-error";
  }

  return redirect(redirect_url);
}
