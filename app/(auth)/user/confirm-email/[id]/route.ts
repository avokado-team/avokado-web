import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  const api = `${process.env.GATEWAY_ENDPOINT}/user/confirm-email/${id}`;
  await fetch(api)
    .then((res) => {
      if (res.ok) {
        return redirect("/user/confirm-email-done");
      }
      return redirect("/user/confirm-email-error");
    })
    .catch(() => {
      return redirect("/user/confirm-email-error");
    });
}
