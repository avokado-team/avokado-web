import ListStock from "@/components/list-stock";
import { getStocks } from "./action";
import ListStockItem from "@/components/list-stock-item";

export default async function StockList() {
  const stocks = await getStocks();

  return (
    <div className="max-w-screen-xl flex items-center justify-center mx-auto py-60 flex-col gap-5">
      <ListStock initialStocks={stocks} />
    </div>
  );
}
