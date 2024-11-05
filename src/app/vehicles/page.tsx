export default function VehiclePage() {
  return (
    <div>
      <a
        className="rounded-full w-fit border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        href="/vehicles/add-new-vehicle"
        target="_blank"
        rel="noopener noreferrer"
      >
        Add new
      </a>
      <h1>Vehicles Page</h1>
    </div>
  )
}