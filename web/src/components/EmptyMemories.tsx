import Link from "next/link";

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        You haven't registered any memories yet,
        <Link href="/memories/new" className="underline hover:text-gray-50">
          {" "}
          start creating now
        </Link>
        !
      </p>
    </div>
  );
}
