"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { ring } from 'ldrs';
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/vehicleList";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

ring.register('spinner-ring');

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
  status: string;
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const TableRow = ({ vehicle }: { vehicle: Vehicle }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-4 text-left">
        <Link href={`/vehicles/${vehicle.id}`}>
          {vehicle?.id}
        </Link>
      </td>
      <td className="py-3 px-4 text-left">{vehicle?.registrationNumber}</td>
      {
        vehicle?.status === "available" ? (
          <td className="py-3 px-4 text-left font-normal ">
            <div className="flex w-fit h-7 px-2.5 rounded-full items-center text-green-900 bg-green-100">
              <i className="material-symbols-rounded-18">
                check
              </i>
              <span className="pl-1.5">{vehicle?.status}</span>
            </div>
          </td>
        ) : vehicle?.status === "in use" ? (
          <td className="py-3 px-4 text-left">
            <div className="flex w-fit h-7 px-2.5 rounded-full items-center text-red-900 bg-red-100">
              <i className="material-symbols-rounded-18">
                dangerous
              </i>
              <span className="pl-1.5">{vehicle?.status}</span>
            </div>
          </td>
        ) : (
          <td className="py-3 px-4 text-left">
            <div className="flex w-fit h-7 px-2.5 rounded-full items-center text-yellow-900 bg-yellow-100">
              <i className="material-symbols-rounded-18">
                handyman
              </i>
              <span className="pl-1.5">{vehicle?.status}</span>
            </div>
          </td>
        )
      }
      <td className="py-3 px-4 text-left">{vehicle?.type}</td>
      <td className="py-3 px-4 text-left">{vehicle?.mark}</td>
      {/* <td className="py-3 px-4 text-left">{vehicle?.typeOfFuel}</td> */}
      {/* <td className="py-3 px-4 text-left">{vehicle?.engineDisplacement}</td> */}
      {/* <td className="py-3 px-4 text-left">{vehicle?.vinNumber}</td> */}
      <td className="py-3 px-4 text-left">{vehicle?.model}</td>
      {/* <td className="py-3 px-4 text-left">{vehicle?.manufactureYear}</td> */}
      {/* <td className="py-3 px-4 text-left">{vehicle?.manufactureCountry}</td> */}
      <td className="py-3 px-4 flex flex-row gap-1.5">
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
        <Link href={`/vehicles/edit-vehicle/${vehicle.id}`}>
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
          onClick={() => {
            setSelectedId(vehicle.id);
            setShowModal(true);
          }}
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
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
          setIsLoading(false);
        } else {
          setApiError("An unknown error occurred");
          setIsLoading(false);
        }
      }
    };
    fetchVehicles();
  }, [vehicleAPI]);

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      setShowModal(false);
      await axios.delete(`${vehicleAPI}/${selectedId}`);
      setSelectedId(null);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== selectedId));
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
        setIsLoading(false);
      } else {
        setApiError("An unknown error occurred");
        setIsLoading(false);
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
            {
              isLoading ? (
                <tr>
                  <td className="align-middle text-center h-40" colSpan={data.columns.length}>
                    <spinner-ring
                      size="40"
                      stroke="5"
                      bg-opacity="0"
                      speed="2"
                      color="black"
                    ></spinner-ring>
                  </td>
                </tr>
              ) : (
                filteredVehicles && filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle, index) => (
                    <TableRow key={index} vehicle={vehicle} />
                  ))
                ) : (
                  <tr>
                    <td className="align-middle text-center h-40" colSpan={data.columns.length}>
                      <spinner-ring
                        size="40"
                        stroke="5"
                        bg-opacity="0"
                        speed="2"
                        color="black"
                      ></spinner-ring>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {showModal && (
          <ConfirmationModal
            title="Are you sure?"
            message="Do you really want to delete? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  )
}