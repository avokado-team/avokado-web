import ListStockItem from "@/components/list-stock-item";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function getStocks(): Promise<IListStockItem[]> {
  const session = await getSession();
  if (!session.access) {
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
    redirect("/login");
  }

  const data = await response.json();
  return data.results;
}

export default async function StockList() {
  const stocks = await getStocks();

  return (
    <div className="max-w-screen-xl flex items-center justify-center h-screen mx-auto">
      <div className="grid grid-cols-4 gap-10">
        {stocks.map((stock, index) => (
          <ListStockItem key={index} stock={stock} />
        ))}
      </div>
    </div>
  );
}
