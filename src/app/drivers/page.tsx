"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { ring } from 'ldrs';
import Button from "@/components/Button/Button";
import Link from "next/link";
import data from "@/database/driverList";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { Driver } from "@/database/interface";

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

const TableRow = (driver: Driver) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-4 text-left">{driver?.id}</td>
    <td className="py-3 px-4 text-left">{driver?.name}</td>
    {
      driver?.isDriving ? (
        <td className="py-3 px-4 text-left font-normal ">
            <div className="flex w-fit h-7 px-2.5 rounded-full items-center text-red-900 bg-red-100">
              <i className="material-symbols-rounded-18">
                dangerous
              </i>
              <span className="pl-1.5">Currently</span>
            </div>
          </td>
      ) : (
        <td className="py-3 px-4 text-left font-normal ">
            <div className="flex w-fit h-7 px-2.5 rounded-full items-center text-green-900 bg-green-100">
              <i className="material-symbols-rounded-18">
                check
              </i>
              <span className="pl-1.5">Free</span>
            </div>
          </td>
      )
    }
    <td className="py-3 px-4 text-left">{driver?.idNumber}</td>
    <td className="py-3 px-4 text-left">{driver?.sex}</td>
    <td className="py-3 px-4 text-left">{driver?.dateOfBirth}</td>
    <td className="py-3 px-4 text-left">{driver?.homeAddress}</td>
    <td className="py-3 px-4 text-left">{driver?.phoneNumber}</td>
    <td className="py-3 px-4 flex flex-row">
      <Link href={`/drivers/${driver.id}`}>
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
      <Link href={`/drivers/edit-driver/${driver.id}`}>
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
          setSelectedId(driver.id);
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

export default function DriverPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


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
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API.driverList);
        setDrivers(response.data);
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

    fetchDrivers();
  });

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      setShowModal(false);
      await axios.delete(`${API.driverList}/${selectedId}`);
      setSelectedId(null);
      setDrivers(drivers.filter((driver) => driver.id !== selectedId));
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
                filteredDrivers && filteredDrivers.length > 0 ? (
                  filteredDrivers.map((driver, index) => (
                    <TableRow key={index} {...driver} />
                  ))
                ) : (
                  <tr>
                    <td className="align-middle text-center h-40" colSpan={data.columns.length}>No drivers available</td>
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