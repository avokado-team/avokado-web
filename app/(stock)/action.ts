"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getStocks(page?: number): Promise<IListStockItem[]> {
  const session = await getSession();
  if (!session.access) {
    redirect("/login");
  }

  var api = `${process.env.GATEWAY_ENDPOINT}/stock/stocks/`;
  if (page) {
    api += `?page=${page}`;
  }

  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect("/login");
    } else {
      return [];
    }
  }

  const data = await response.json();
  return data.results;
}
