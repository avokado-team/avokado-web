"use client";

import Image from "next/image";

export default function ListStockItem({ stock }: { stock: IListStockItem }) {
  return (
    <div className="flex flex-col gap-3 border rounded-xl">
      <div className="w-72 h-44 rounded-xl bg-white relative">
        <Image
          alt="stock cover image"
          src={stock.image_url ? stock.image_url : "/avokado-placeholder.svg"}
          fill
        />
      </div>
      <div className="flex flex-col gap-1 px-8 py-4 border-t">
        <span className="font-bold">{stock.name}</span>
        <span className="text-xs">IT 하드웨어</span>
      </div>
    </div>
  );
}