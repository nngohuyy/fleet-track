import Button from "@/components/Button/Button"
import Link from "next/link"

export default function VehiclePage() {
  return (
    <div>
      <Link href="/vehicles/add-new-vehicle">
        <Button
          variant="outline"
          color="primary"
          size="md"
          radius="full"
        >
          Add new
        </Button>
      </Link>
      <h1>Vehicles Page</h1>
    </div>
  )
}