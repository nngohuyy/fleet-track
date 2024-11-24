"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { ring } from 'ldrs';
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/tripList";
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

interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  distance: number;
}

export default function TripPage() {
  const tripAPI = API.tripList;
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const TableRow = ({ trip }: { trip: Trip }) => {
    const navigateToDetail = () => {
      window.location.href = `/trips/${trip.id}`;
    };

    return (
      <tr
        className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={navigateToDetail}
      >
        <td className="py-3 px-4 text-left">{trip?.id}</td>
        <td className="py-3 px-4 text-left">{trip?.vehicleId}</td>
        <td className="py-3 px-4 text-left">{trip?.driverId}</td>
        <td className="py-3 px-4 text-left">{trip?.startLocation}</td>
        <td className="py-3 px-4 text-left">{trip?.endLocation}</td>
        <td className="py-3 px-4 text-left">{trip?.startTime}</td>
        <td className="py-3 px-4 text-left">{trip?.endTime}</td>
        <td className="py-3 px-4 text-left">{trip?.distance}</td>
        <td
          className="py-3 px-4 flex flex-row"
          onClick={(e) => e.stopPropagation()} // Prevents triggering row click for this cell
        >
          <Link href={`/trips/${trip.id}`}>
            <Button
              variant="ghost"
              color="primary"
              size="sm"
              radius="full"
              isIconOnly
            >
              <span className="material-symbols-rounded">visibility</span>
            </Button>
          </Link>
          <Link href={`/trips/edit-trip/${trip.id}`}>
            <Button
              variant="ghost"
              color="primary"
              size="sm"
              radius="full"
              isIconOnly
            >
              <span className="material-symbols-rounded">edit</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            radius="full"
            isIconOnly
            onClick={() => {
              setSelectedId(trip.id);
              setShowModal(true);
            }}
          >
            <span className="material-symbols-rounded">delete</span>
          </Button>
        </td>
      </tr>
    );
  };

  const filteredTrips = trips.filter((trip) => {
    return (
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.startTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.endTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.distance.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      setShowModal(false);
      await axios.delete(`${tripAPI}/${selectedId}`);
      setSelectedId(null);
      setTrips(trips.filter((trip) => trip.id !== selectedId));
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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(tripAPI);
        setTrips(response.data);
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
  }, [tripAPI]);

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
        <Link href="/trips/add-new-trip">
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
                filteredTrips && filteredTrips.length > 0 ? (
                  filteredTrips.map((trip, index) => (
                    <TableRow key={index} trip={trip} />
                  ))
                ) : (
                  <tr>
                    <td className="align-middle text-center h-40" colSpan={data.columns.length}>No trips available</td>
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