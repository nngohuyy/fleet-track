"use client"

import { useState } from "react";
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/vehicleList";

interface Column {
  key: string;
  title: string;
}

const TableHeader = ({ columns }: { columns: Column[] }) => (
  <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
    <tr className="py-3 px-6 text-left font-semibold">
      {columns.map((column) => (
        <th key={column.key} className="py-3 px-6 text-left font-semibold">{column.title}</th>
      ))}
    </tr>
  </thead>
);

interface Vehicle {
  id: string;
  vehicleModule: string;
  SoKhungModule: string;
  HangModule: string;
  BienSoModule: string;
  NhienLoaiModule: string;
  NamModule: string;
  LoaiXeModule: string;
  MauSacModule: string;
}

const TableRow = ({ vehicle }: { vehicle: Vehicle }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-6 text-left">{vehicle?.id}</td>
    <td className="py-3 px-6 text-left">{vehicle?.vehicleModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.SoKhungModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.HangModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.BienSoModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.NhienLoaiModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.NamModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.LoaiXeModule}</td>
    <td className="py-3 px-6 text-left">{vehicle?.MauSacModule}</td>
  </tr>
);

export default function VehiclePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = data.vehicleList.filter((vehicle) => {
    return (
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.SoKhungModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.HangModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.BienSoModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.NhienLoaiModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.NamModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.LoaiXeModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.MauSacModule.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
            startContent = {<span className="material-symbols-rounded">
              add
              </span>}
          >
            Add new
          </Button>
        </Link>
      </div>
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