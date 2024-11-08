"use client";

import Input from "@/components/input";
import { useFormState } from "react-dom";
import { login } from "./actions";
import Label from "@/components/label";
import Link from "next/link";
import Button from "@/components/button";
import { useEffect } from "react";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  useEffect(() => {
    if (typeof state === "boolean" && state === false) {
      alert("이메일 인증이 필요합니다.");
    }
  }, [state]);

  return (
    <div className="mx-auto max-w-lg text-black flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 bg-[#ECF8F5] sm:px-20 px-10 py-16 w-full rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">로그인</h1>
          <h2 className="text-sm mb-4">아보카도에 오신 것을 환영합니다.</h2>
        </div>
        <form action={dispatch} className="flex flex-col gap-2">
          <Label name="이메일" />
          <Input
            required
            name="email"
            type="email"
            placeholder="Email"
            errors={typeof state === "object" ? state?.fieldErrors.email : []}
          />
          <Label name="비밀번호" />
          <Input
            required
            name="password"
            type="password"
            placeholder="Password"
            errors={
              typeof state === "object" ? state?.fieldErrors.password : []
            }
          />
          <div className="flex justify-end mt-2 mb-8">
            <Link
              className="text-xs text-[#818181] cursor-pointer underline"
              href="/find-password"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <Button className="hover:bg-[#258D76] transition-colors">
            로그인
          </Button>
        </form>
        <Link href="/signup">
          <Button className="primary-reverse-btn hover:bg-[#3BB197] hover:text-white transition-colors">
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  );
}
