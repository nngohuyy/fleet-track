import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vehicles",
  description: "Vehicles",
}

export default function VehiclesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-8">
      <h1 className="py-14 font-black text-4xl">Vehicles</h1>
      {children}
    </div>
  )
}