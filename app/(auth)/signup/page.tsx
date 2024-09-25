"use client";

import Input from "@/components/input";
import Label from "@/components/label";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { signup } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import EmailConfirm from "@/components/email_confirm";

export default function Signup() {
  const [state, dispatch] = useFormState(signup, null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (state) {
      setIsDone(true);
    }
  }, [state]);

  return !isDone ? (
    <div className="mx-auto max-w-lg text-black flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 bg-[#ECF8F5] px-20 py-16 w-full rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">회원가입</h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-2">
          <Label name="이름" />
          <Input
            required
            className="h-12"
            name="name"
            type="text"
            placeholder="이름"
            errors={[]}
          />
          <Label name="이메일" />
          <Input
            required
            className="h-12"
            name="email"
            type="email"
            placeholder="이메일"
            errors={[]}
          />
          <Label name="비밀번호" />
          <Input
            required
            className="h-12"
            name="password"
            type="password"
            placeholder="비밀번호"
            errors={[]}
          />
          <Label name="비밀번호 확인" />
          <Input
            required
            className="h-12"
            name="password"
            type="password"
            placeholder="비밀번호 확인"
            errors={[]}
          />
          <Button className="mt-4 h-12 hover:bg-[#258D76] transition-colors">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <EmailConfirm />
  );
}