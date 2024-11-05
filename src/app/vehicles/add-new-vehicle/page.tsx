export default function AddNewVehicle() {
  return (
    <div className="flex flex-col gap-9">
      <div className="inline-flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="inline-flex flex-col gap-6">
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-row gap-4">
              <div className="w-full inline-flex flex-col gap-1">
                <p>Registration number</p>
                <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
              </div>
              <div className="w-full inline-flex flex-col gap-1">
                <p>Registration number</p>
                <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
              </div>
            </div>
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
          </div>
          <div className="inline-flex flex-col gap-6">
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-row gap-4">
              <div className="w-full inline-flex flex-col gap-1">
                <p>Registration number</p>
                <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
                <p className="text-xs">Year</p>
              </div>
              <div className="w-full inline-flex flex-col gap-1">
                <p>Registration number</p>
                <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
                <p className="text-xs">Country</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full inline-flex flex-col gap-1">
            <p>Registration number</p>
            <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
          </div>
          <div className="w-full inline-flex flex-row gap-4">
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
            <div className="w-full inline-flex flex-col gap-1">
              <p>Registration number</p>
              <input className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full flex-row justify-between">
        <a
          className="rounded-full w-fit border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/vehicles/add-new-vehicle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Scan inspection certificate
        </a>
        <div className="inline-flex flex-row gap-2">
          <a
            className="rounded-full w-fit border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/vehicles/add-new-vehicle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cancel
          </a>
          <a
            className="rounded-full w-fit border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/vehicles/add-new-vehicle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add
          </a>
        </div>
      </div>
    </div>
  )
}