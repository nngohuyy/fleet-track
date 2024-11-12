"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/vehicleList";
import API from "@/database/apiList";

interface Column {
  key: string;
  title: string;
}

const TableHeader = ({ columns }: { columns: Column[] }) => (
  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
    <tr className="py-3 px-6 text-left font-semibold">
      {columns.map((column) => (
        <th key={column.key} className="py-4 px-4 text-left font-semibold">{column.title}</th>
      ))}
    </tr>
  </thead>
);

interface Vehicle {
  id: string;
  registrationNumber: string;
  type: string;
  mark: string;
  typeOfFuel: string;
  engineDisplacement: number;
  vinNumber: string;
  model: string;
  // manufactureYear: number;
  // manufactureCountry: string;
}

export default function VehiclePage() {
  const vehicleAPI = API.vehicleList;
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [apiError, setApiError] = useState("");
  const TableRow = ({ vehicle }: { vehicle: Vehicle }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-4 text-left">{vehicle?.id}</td>
      <td className="py-3 px-4 text-left">{vehicle?.registrationNumber}</td>
      <td className="py-3 px-4 text-left">{vehicle?.type}</td>
      <td className="py-3 px-4 text-left">{vehicle?.mark}</td>
      <td className="py-3 px-4 text-left">{vehicle?.typeOfFuel}</td>
      <td className="py-3 px-4 text-left">{vehicle?.engineDisplacement}</td>
      <td className="py-3 px-4 text-left">{vehicle?.vinNumber}</td>
      <td className="py-3 px-4 text-left">{vehicle?.model}</td>
      {/* <td className="py-3 px-4 text-left">{vehicle?.manufactureYear}</td> */}
      {/* <td className="py-3 px-4 text-left">{vehicle?.manufactureCountry}</td> */}
      <td className="py-3 px-4 flex flex-row">
        <Link href={`/vehicles/${vehicle.id}`}>
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            radius="full"
            isIconOnly
          >
            <span className="material-symbols-rounded">
              visibility
            </span>
          </Button>
        </Link>
        <Link href={`/vehicles/${vehicle.id}`}>
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            radius="full"
            isIconOnly
          >
            <span className="material-symbols-rounded">
              edit
            </span>
          </Button>
        </Link>
        {/* create a delete button */}
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          radius="full"
          isIconOnly
          onClick={() => handleDelete(vehicle.id)}
        >
          <span className="material-symbols-rounded">
            delete
          </span>
        </Button>
      </td>
    </tr>
  );

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.mark.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.typeOfFuel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.engineDisplacement.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) // ||
      // vehicle.manufactureYear.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      // vehicle.manufactureCountry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(vehicleAPI);
        setVehicles(response.data);
        console.log(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("An unknown error occurred");
        }
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${vehicleAPI}/${id}`);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unknown error occurred");
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
        <Link href="/vehicles/add-new-vehicle">
          <Button
            variant="outline"
            color="primary"
            size="md"
            radius="full"
            startContent={<span className="material-symbols-rounded">
              add
            </span>}
          >
            Add new
          </Button>
        </Link>
      </div>
      {apiError && <p>{apiError}</p>}
      <div className="overflow-hidden rounded-lg shadow-md bg-white">
        <table className="w-full">
          <TableHeader columns={data.columns} />
          <tbody>
            {filteredVehicles && filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <TableRow key={index} vehicle={vehicle} />
              ))
            ) : (
              <tr>
                <td className="align-middle text-center h-40" colSpan={data.columns.length}>No vehicles available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}