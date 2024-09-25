"use server";

import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(name, email, password);

  return true;
}
