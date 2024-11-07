import Link from "next/link"

export default function SideBar() {
  return (
    <div className="w-full h-full bg-[#F8FAFD] px-3 py-7 inline-flex flex-col justify-between">
      <div className="inline-flex flex-col gap-8">
        <span className="material-symbols-rounded rounded-full w-fit px-4 py-2.5 hover:bg-[#DADADA]">close</span>
        <div className="inline-flex flex-col">
          <Link className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA]" href={'/'}>
            <span className="material-symbols-rounded">home</span>
            Home
          </Link>
          <Link className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA]" href={'/vehicles'}>
            <span className="material-symbols-rounded">transportation</span>
            Vehicles
          </Link>
          <Link className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA]" href={'/trips'}>
            <span className="material-symbols-rounded">assistant_direction</span>
            Trips
          </Link>
          <Link className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA]" href={'/drivers'}>
            <span className="material-symbols-rounded">person</span>
            Drivers
          </Link>
        </div>
      </div>
      <div className="inline-flex flex-col">
        <div className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA]">
          <span className="material-symbols-rounded">settings</span>
          Settings
        </div>
        <div className="px-4 py-2.5 rounded-full inline-flex gap-5 hover:bg-[#DADADA] text-[#DA2935]">
          <span className="material-symbols-rounded">logout</span>
          Log out
        </div>
      </div>
    </div>
  )
}