"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/consts";
import { getSession } from "@/lib/session";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from "next/navigation";
import { z } from "zod";

interface AvkaJwtPayload extends JwtPayload {
  user_id: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX),
});

export async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const request = await fetch(
      `${process.env.GATEWAY_ENDPOINT!}/user/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!request.ok) {
      if (request.status === 409) {
        return false;
      }
      return {
        fieldErrors: {
          password: ["Email or password is incorrect."],
          email: ["Email or password is incorrect."],
        },
      };
    }

    const token = await request.json();
    const claims: AvkaJwtPayload = jwtDecode<AvkaJwtPayload>(token.access);

    const session = await getSession();
    session.access = token.access;
    session.refresh = token.refresh;
    session.id = claims.user_id;
    session.exp = claims.exp;

    await session.save();
    redirect("/");
  }
}
