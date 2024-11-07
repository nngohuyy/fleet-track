"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/tripList";
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

const TableRow = ({ trip }: { trip: Trip }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-4 text-left">{trip?.id}</td>
    <td className="py-3 px-4 text-left">{trip?.vehicleId}</td>
    <td className="py-3 px-4 text-left">{trip?.driverId}</td>
    <td className="py-3 px-4 text-left">{trip?.startLocation}</td>
    <td className="py-3 px-4 text-left">{trip?.endLocation}</td>
    <td className="py-3 px-4 text-left">{trip?.startTime}</td>
    <td className="py-3 px-4 text-left">{trip?.endTime}</td>
    <td className="py-3 px-4 text-left">{trip?.distance}</td>
  </tr>
);

export default function TripPage() {
  const tripAPI = API.tripList;
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [apiError, setApiError] = useState("");

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

  useEffect(() => {
    axios
      .get(tripAPI)
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  }, []);

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
            startContent = {<span className="material-symbols-rounded">
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
            {filteredTrips && filteredTrips.length > 0 ? (
              filteredTrips.map((trip, index) => (
                <TableRow key={index} trip={trip} />
              ))
            ) : (
              <tr>
                <td className="align-middle text-center h-40" colSpan={data.columns.length}>No trips available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}