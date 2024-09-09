import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  const request = await fetch(`${process.env.GATEWAY_ENDPOINT!}/user/me`, {
    headers: {
      Authorization: `Bearer ${session.access}`,
    },
  });

  if (!request.ok) {
    redirect("/auth/login");
  }

  return request.json();
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="mx-auto max-w-lg flex flex-col items-center justify-center gap-10 h-screen *:text-black">
      <span>Welcom</span>
      <form action={logOut}>
        <button className="primary-btn h-10">Log out</button>
      </form>
    </div>
  );
}
