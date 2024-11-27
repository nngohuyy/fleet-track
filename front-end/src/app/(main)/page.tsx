"use client"

import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";

import {
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineUser,
} from "react-icons/hi2";

const fetchUserName = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    const response = await axios.get("http://localhost:5000/api/users/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.name;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserName = async () => {
      const name = await fetchUserName();
      setUserName(name);
    };

    getUserName();
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <div className="px-8 h-full">
      <h1 className="py-14 font-black text-4xl">Welcome back, {userName}!</h1>
      <div className="grid grid-cols-3 gap-4 h-3/4">
        <Link href="/vehicles">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" startContent={<HiOutlineTruck size={56} />}>Vehicles&apos; management</Button>
        </Link>
        <Link href={`/drivers`} className="disabled">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" startContent={<HiOutlineUser size={56} />}>Drivers&apos; management</Button>
        </Link>
        <Link href="/trips">
          <Button className="w-full h-full flex flex-col gap-4 text-4xl" startContent={<HiOutlineMap size={56} />}>Trips&apos; management</Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="h-full w-full bg-slate-50 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
