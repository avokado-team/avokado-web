import { getStocks } from "./action";
import ListStockItem from "@/components/list-stock-item";

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
