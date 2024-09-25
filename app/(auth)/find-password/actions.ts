"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export async function findPassword(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  }

  //   const request = await fetch(
  //     `${process.env.GATEWAY_ENDPOINT!}/user/find-password`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   if (!request.ok) {
  //     return {
  //       fieldErrors: {
  //         password: ["Email is incorrect."],
  //       },
  //     };
  //   }

  return true;
}
