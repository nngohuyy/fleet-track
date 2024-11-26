import { Button } from "@nextui-org/react"
import Link from "next/link"

import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiArrowRightStartOnRectangle,
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
]

const BottomContent: { title: string; icon: JSX.Element; color: ButtonColor; isDisabled: boolean }[] = [
  {
    title: "Settings",
    icon: <HiOutlineCog6Tooth size={24} />,
    color: "default",
    isDisabled: true,
  },
  {
    title: "Log out",
    icon: <HiArrowRightStartOnRectangle size={24} />,
    color: "danger",
    isDisabled: false,
  }
]

export default function SideBar() {
  return (
    <div id="sidebar" className="w-full h-full bg-[#F8FAFD] px-3 py-7 inline-flex flex-col justify-between">
      <div className="inline-flex flex-col gap-8">
        <span className="material-symbols-rounded rounded-full w-fit px-4 py-2.5 hover:bg-[#DADADA]">close</span>
        <div className="inline-flex flex-col">
          {TopContent.map((item, index) => (
            <Link href={item.link} key={index}>
              <Button isDisabled={item.isDisabled} fullWidth radius="full" variant="light" color={item.color} startContent={item.icon} className="text-base gap-5 justify-start h-11">
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="inline-flex flex-col">
        {BottomContent.map((item, index) => (
          <Button isDisabled={item.isDisabled} fullWidth radius="full" variant="light" color={item.color} startContent={item.icon} className="text-base gap-5 justify-start h-11" key={index}>
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  )
}