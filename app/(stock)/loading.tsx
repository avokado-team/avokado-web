export default function Loading() {
  return (
    <div className="max-w-screen-xl flex items-center justify-center h-screen mx-auto">
      <div className="grid grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex animate-pulse flex-col gap-5 p-5">
            <div className="w-72 h-44 rounded-xl bg-neutral-300" />
            <div className="flex flex-col gap-2 *:rounded-md px-8">
              <div className="h-4 w-40 bg-neutral-300" />
              <div className="h-4 w-20 bg-neutral-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
