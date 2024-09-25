"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/consts";
import { z } from "zod";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    name: z.string().trim().min(1, "이름은 최소 1자 이상이어야 합니다."),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        PASSWORD_REGEX,
        "비밀번호는 영문 대소문자와 숫자, 특수문자를 포함해야 합니다."
      ),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        PASSWORD_REGEX,
        "비밀번호는 영문 대소문자와 숫자, 특수문자를 포함해야 합니다."
      ),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function signup(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const request = await fetch(`${process.env.GATEWAY_ENDPOINT!}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!request.ok) {
    if (request.status === 409) {
      return {
        fieldErrors: {
          email: ["이미 존재하는 이메일입니다."],
          name: [],
          password: [],
          confirm_password: [],
        },
      };
    }
    return false;
  }

  return true;
}
