export default function AddNewVehicle() {
  return (
    <div>
      <div className="inline-flex flex-col gap-1">
        <p>Registration number</p>
        <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
      </div>
      <div className="inline-flex items-end">
        <div className="inline-flex flex-col gap-1">
          <p>Manufacture</p>
          <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
          <p className="text-xs">Year</p>
        </div>
        <div className="inline-flex flex-col gap-1">
          <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
          <p className="text-xs">Country</p>
        </div>
      </div>
    </div>
  )
}