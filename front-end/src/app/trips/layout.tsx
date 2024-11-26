import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trips",
  description: "Trips",
}

export default function TripsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-8">
      <h1 className="py-14 font-black text-4xl">Trips</h1>
      {children}
    </div>
  )
}