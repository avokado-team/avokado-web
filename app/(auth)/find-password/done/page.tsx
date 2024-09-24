import Link from "next/link";

export default function FindPassword() {
  return (
    <div className="mx-auto max-w-lg text-black flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 bg-[#ECF8F5] px-20 py-16 w-full rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">인증메일을 보내드렸습니다!</h1>
          <h2 className="text-sm mb-4">
            입력하신 이메일로 인증절차를 확인해 주세요.
          </h2>
        </div>
        <Link href="/login">
          <button className="primary-btn h-14">로그인 하러가기</button>
        </Link>
      </div>
    </div>
  );
}
