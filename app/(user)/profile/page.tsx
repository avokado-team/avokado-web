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
    redirect("/login");
  }

  return request.json();
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();

    fetch(`${process.env.GATEWAY_ENDPOINT!}/user/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
      body: JSON.stringify({ refresh: session.refresh }),
    });

    session.destroy();
    redirect("/login");
  };

  const user = await getUser();

  return (
    <div className="mx-auto max-w-lg gap-10 w-full flex flex-col justify-center items-center h-screen *:text-black">
      <span>Welcom {user?.name}</span>
      <form action={logOut} className="w-full">
        <button className="primary-btn h-10">Log out</button>
      </form>
    </div>
  );
}
