"use client";

import { getStocks } from "@/app/(stock)/action";
import { useEffect, useRef, useState } from "react";
import ListStockItem from "./list-stock-item";

export default function ListStock({
  initialStocks,
}: {
  initialStocks: IListStockItem[];
}) {
  const [stocks, setStocks] = useState(initialStocks);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && bottom.current) {
          observer.unobserve(bottom.current);

          const newStocks = await getStocks(page + 1);
          if (newStocks.length !== 0) {
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setStocks((prev) => [...prev, ...newStocks]);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (bottom.current) {
      observer.observe(bottom.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {stocks.map((stock, index) => (
          <ListStockItem key={index} stock={stock} />
        ))}
      </div>
      {!isLastPage ? <div ref={bottom} /> : null}
    </>
  );
}
