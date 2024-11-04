import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  const api = `${process.env.GATEWAY_ENDPOINT}/user/confirm-email/${id}`;
  console.log(api);
  fetch(api)
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return redirect("/user/confirm-email-done");
      }
      return redirect("/user/confirm-email-error");
    })
    .catch(() => {
      return redirect("/user/confirm-email-error");
    });
}
