import { getUser } from "@/lib/auth";
import Image from "next/image";

export function Profile() {
  const { name, avatarUrl } = getUser();
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        alt="User profile image"
        src={avatarUrl}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[170px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-500">
          Logout
        </a>
      </p>
    </div>
  );
}
