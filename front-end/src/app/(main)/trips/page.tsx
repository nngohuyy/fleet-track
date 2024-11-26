"use client"

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Spinner,
} from "@nextui-org/react";

import axios from "axios";
import { useEffect } from "react";

import API from "@/database/apiList";

import { HiOutlinePlus as PlusIcon } from "react-icons/hi";
import { BsChevronDown as ChevronDownIcon } from "react-icons/bs";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { HiOutlinePencil as EditIcon } from "react-icons/hi";
import { HiOutlineTrash as DeleteIcon } from "react-icons/hi";
import { HiOutlineEye as EyeIcon } from "react-icons/hi";
import { columns, trips, statusOptions } from "@/database/tripList";
import vehicles from "@/database/vehicleList";
import drivers from "@/database/driverList";
import { capitalize } from "@/utils/utils";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  accepted: "secondary",
  in_progress: "primary",
  completed: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["vehicleId" as "registrationNumber", "driverId" as "driverName", "startLocation", "startTime", "status", "actions"];

type Trip = typeof trips[0];
type Vehicle = typeof vehicles[0];
type Driver = typeof drivers[0];

export default function VehiclePage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [drivers, setDrivers] = React.useState<Driver[]>([]);

  const [isTripLoading, setIsTripLoading] = React.useState(true);
  const [isVehicleLoading, setIsVehicleLoading] = React.useState(true);
  const [isDriverLoading, setIsDriverLoading] = React.useState(true);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [apiError, setApiError] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Fetch Trips
    const fetchTrips = async () => {
      try {
        const response = await axios.get(API.tripList);
        setTrips(response.data);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setIsTripLoading(false);
      }
    };

    // Fetch Vehicles
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(API.vehicleList);
        setVehicles(response.data);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setIsVehicleLoading(false);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API.driverList);
        setDrivers(response.data);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setIsDriverLoading(false);
      }
    }

    fetchTrips();
    fetchVehicles();
    fetchDrivers();
  }, []);

  const getRegistrationNumber = (vehicleId: string) => {
    if (vehicles.length === 0) return "Loading...";
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle ? vehicle.registrationNumber : "Unknown";
  };

  const getDriverName = (driverId: string) => {
    if (drivers.length === 0) return "Loading...";
    const driver = drivers.find((driver) => driver.id === driverId);
    return driver ? driver.name : "Unknown";
  }

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await axios.delete(`${API.vehicleList}/${selectedId}`);
      setTrips(trips.filter((trip) => trip.id !== selectedId));
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setSelectedId(null); // Clear it here, after all operations
      setShowModal(false); // Close the modal after the operation
      setIsLoading(false);
    }
  };

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTrips = [...trips];

    if (hasSearchFilter) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.driverId.toLowerCase().includes(filterValue.toLowerCase()) ||
        trip.vehicleId.toLowerCase().includes(filterValue.toLowerCase()) ||
        trip.startLocation.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredTrips = filteredTrips.filter((trip) =>
        Array.from(statusFilter).includes(trip.status),
      );
    }

    return filteredTrips;
  }, [trips, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Trip, b: Trip) => {
      const first = a[sortDescriptor.column as keyof Trip] as number;
      const second = b[sortDescriptor.column as keyof Trip] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((vehicle: Trip, columnKey: React.Key) => {
    const cellValue = vehicle[columnKey as keyof Trip];

    switch (columnKey) {
      case "vehicleId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{getRegistrationNumber(String(cellValue))}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{vehicle.vehicleId}</p>
          </div>
        );
      case "driverId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{getDriverName(String(cellValue))}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{vehicle.driverId}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[vehicle.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center">
            <Tooltip content="Details">
              <Link href={`vehicles/${vehicle.id}`}>
                <Button isIconOnly variant="light" size="sm" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip content="Edit vehicle">
              <Link href={`vehicles/edit-vehicle/${vehicle.id}`}>
                <Button isIconOnly variant="light" size="sm" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete vehicle">
              <Button
                onPress={() => {
                  setSelectedId(vehicle.id);
                  setShowModal(true);
                }}
                isIconOnly
                size="sm"
                variant="light"
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      case "startTime":
        return new Date(cellValue).toLocaleString();
      default:
        return cellValue;
    }
  }, [vehicles, drivers]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by mark, model or registration number..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Link href="/trips/add-new-trip">
              <Button color="primary" endContent={<PlusIcon />}>
                Add New
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {trips.length} trips</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    trips.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const isDataLoading = isTripLoading || isVehicleLoading || isDriverLoading;

  return isDataLoading
    ?
      <div className="w-full h-56 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    : (
      <>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[512px]",
          }}
          // selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                // align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No vehicles found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {showModal && (
          <ConfirmationModal
            title="Are you sure?"
            message="Do you really want to delete? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
          />
        )}
      </>
    );
}
