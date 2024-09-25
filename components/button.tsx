import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "primary-btn h-14 w-full rounded-md border-none ring-1 ring-neutral-200 transition-shadow placeholder:text-neutral-400 px-4 focus:outline-none focus:ring-2 focus:ring-[#3BB197] placeholder:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
