import { Button } from "@nextui-org/react";
import Link from "next/link";

import {
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineUser,
} from "react-icons/hi2";

export default function Home() {
  return (
    <div className="px-8 h-full">
      <h1 className="py-14 font-black text-4xl">Welcome back!</h1>
      <div className="grid grid-cols-3 gap-4 h-3/4">
        <Link href="/vehicles">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" startContent={<HiOutlineTruck size={56} />}>Vehicles' management</Button>
        </Link>
        <Link href={`/drivers`} className="disabled">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" isDisabled startContent={<HiOutlineUser size={56} />}>Drivers' management</Button>
        </Link>
        <Link href="/trips">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" startContent={<HiOutlineMap size={56} />}>Trips' management</Button>
        </Link>
      </div>
    </div>
  );
}
