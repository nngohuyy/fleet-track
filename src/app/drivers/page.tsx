"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/driverList";
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

interface Driver {
  id: string;
  name: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  homeAddress: string;
  phoneNumber: string;
}

const TableRow = ({ driver }: { driver: Driver }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-4 text-left">{driver?.id}</td>
    <td className="py-3 px-4 text-left">{driver?.name}</td>
    <td className="py-3 px-4 text-left">{driver?.idNumber}</td>
    <td className="py-3 px-4 text-left">{driver?.sex}</td>
    <td className="py-3 px-4 text-left">{driver?.dateOfBirth}</td>
    <td className="py-3 px-4 text-left">{driver?.homeAddress}</td>
    <td className="py-3 px-4 text-left">{driver?.phoneNumber}</td>
  </tr>
);

export default function DriverPage() {
  const driverAPI = API.driverList;
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [apiError, setApiError] = useState("");

  const filteredDrivers = drivers.filter((driver) => {
    return (
      driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.sex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.homeAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    axios
      .get(driverAPI)
      .then((response) => {
        setDrivers(response.data);
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
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        <Link href="/drivers/add-new-driver">
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
            {filteredDrivers && filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver, index) => (
                <TableRow key={index} driver={driver} />
              ))
            ) : (
              <tr>
                <td className="align-middle text-center h-40" colSpan={data.columns.length}>No drivers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}