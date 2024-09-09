import { InputHTMLAttributes } from "react";

interface IInputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...props
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="h-14 w-full rounded-md border-none bg-white ring-1 ring-neutral-200 transition-shadow placeholder:text-neutral-400 px-4 focus:outline-none focus:ring-2 focus:ring-[#3BB197] placeholder:text-sm"
        {...props}
      />
      {errors.map((message, index) => (
        <span key={index} className="font-medium text-red-500">
          {message}
        </span>
      ))}
    </div>
  );
}
