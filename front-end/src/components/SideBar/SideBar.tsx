'use client';

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

type ButtonColor = "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;

const TopContent: { title: string; icon: JSX.Element; link: string; color: ButtonColor; isDisabled: boolean }[] = [
  {
    title: "Home",
    icon: <HiOutlineHome size={24} />,
    link: "/",
    color: "default",
    isDisabled: false,
  },
  {
    title: "Vehicles",
    icon: <HiOutlineTruck size={24} />,
    link: "/vehicles",
    color: "default",
    isDisabled: false,
  },
  {
    title: "Drivers",
    icon: <HiOutlineUser size={24} />,
    link: "/drivers",
    color: "default",
    isDisabled: false,
  },
  {
    title: "Trips",
    icon: <HiOutlineMap size={24} />,
    link: "/trips",
    color: "default",
    isDisabled: false,
  },
];

export default function SideBar() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push('/sign-in');
  };

  const BottomContent: { title: string; icon: JSX.Element; color: ButtonColor; isDisabled: boolean; handler: (() => void) | null }[] = [
    {
      title: "Settings",
      icon: <HiOutlineCog6Tooth size={24} />,
      color: "default",
      isDisabled: true,
      handler: null,
    },
    {
      title: "Log out",
      icon: <HiArrowRightOnRectangle size={24} />,
      color: "danger",
      isDisabled: false,
      handler: handleLogout,
    },
  ];

  return (
    <div id="sidebar" className="w-full h-full bg-[#F8FAFD] px-3 py-7 inline-flex flex-col justify-between">
      <div className="inline-flex flex-col gap-8">
        {/* <Button isIconOnly radius="full" variant="light" className="ml-1.5"><IoClose size={24}/></Button> */}
        <Link href="/" className="w-fit">
          <Image
              src="fleettrack.svg"
              alt="Vercel Logo"
              className="dark:invert ml-4 hover:brightness-125"
              width={56}
              height={56}
              priority
            />
        </Link>
        <div className="inline-flex flex-col">
          {TopContent.map((item, index) => (
            <Link href={item.link} key={index}>
              <Button
                isDisabled={item.isDisabled}
                fullWidth
                radius="full"
                variant="light"
                color={item.color}
                startContent={item.icon}
                className="text-base gap-5 justify-start h-11 hover:font-bold"
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="inline-flex flex-col">
        {BottomContent.map((item, index) => (
          <Button
            key={index}
            isDisabled={item.isDisabled}
            fullWidth
            radius="full"
            variant="light"
            color={item.color}
            startContent={item.icon}
            className="text-base gap-5 justify-start h-11 hover:font-bold"
            onClick={item.handler || undefined}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
