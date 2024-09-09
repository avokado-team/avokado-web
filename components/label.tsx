interface ILabelProps {
  name: string;
}

export default function Label({ name }: ILabelProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="rounded-full size-1 bg-[#3BB197]" />
      <label className="font-semibold">{name}</label>
    </div>
  );
}
