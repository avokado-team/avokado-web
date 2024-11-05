import Link from "next/link";

export default function EmailConfirmError() {
  return (
    <div className="mx-auto max-w-lg text-black flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 bg-[#ECF8F5] sm:px-20 px-10 py-16 w-full rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">인증이 만료되었습니다</h1>
          <h2 className="text-sm mb-4">
            pb1123love@gmail.com 으로 문의주세요.
          </h2>
        </div>
        <Link href="/login">
          <button className="primary-btn h-14">로그인 하러가기</button>
        </Link>
      </div>
    </div>
  );
}
