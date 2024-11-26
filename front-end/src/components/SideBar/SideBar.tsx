'use client';

import { Button } from "@nextui-org/react";
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
    isDisabled: true,
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

  const BottomContent = [
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
      handler: handleLogout, // Attach the log-out handler
    },
  ];

  return (
    <div id="sidebar" className="w-full h-full bg-[#F8FAFD] px-3 py-7 inline-flex flex-col justify-between">
      <div className="inline-flex flex-col gap-8">
        <span className="material-symbols-rounded rounded-full w-fit px-4 py-2.5 hover:bg-[#DADADA]">close</span>
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
                className="text-base gap-5 justify-start h-11"
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
            className="text-base gap-5 justify-start h-11"
            onClick={item.handler || undefined} // Attach handler if present
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
