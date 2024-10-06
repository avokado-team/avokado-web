"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getStocks(): Promise<IListStockItem[]> {
  const session = await getSession();
  if (!session.access) {
    session.destroy();
    redirect("/login");
  }
  const response = await fetch(
    `${process.env.GATEWAY_ENDPOINT}/stock/stocks/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
    }
  );

  if (!response.ok && response.status === 401) {
    session.destroy();
    redirect("/login");
  }

  const data = await response.json();
  return data.results;
}
