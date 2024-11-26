"use client"

import { useState } from "react";
import {
  DateInput,
  Input,
} from "@nextui-org/react";
import { parseZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import VehicleDropdown from "./VehicleDropdown";
import DriverDropdown from "./DriverDropdown";

export default function AddNewVehicle() {
  const tripAPI = API.tripList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [tripData, setTripData] = useState({
    vehicleId: "",
    driverId: "",
    startLocation: "",
    endLocation: "",
    startTime: "",
    endTime: "",
    distance: 0,
    status: "pending",
  });

  console.log(tripData);

  const [showModal, setShowModal] = useState(false);

  const handleVehicleSelect = (vehicleId: string) => {
    setTripData((prev) => ({ ...prev, vehicleId }));
  };

  const handleDriverSelect = (driverId: string) => {
    setTripData((prev) => ({ ...prev, driverId }));
  };

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/trips");
  }

  const handleSubmit = async () => {
    try {
      await axios.post(tripAPI, tripData);

      alert("Trip added successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message || error.message);
      } else {
        setApiError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col gap-9">
      {apiError && <p>{apiError}</p>}
      <form onSubmit={handleSubmit} className="inline-flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          {/* <InputField
            label="Registration number"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          /> */}
          <VehicleDropdown onVehicleSelect={handleVehicleSelect} />
          <DriverDropdown onDriverSelect={handleDriverSelect} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Start location"
            value={tripData.startLocation}
            onChange={(e) => setTripData({ ...tripData, startLocation: e.target.value })}
          />
          <InputField
            label="End location"
            value={tripData.endLocation}
            onChange={(e) => setTripData({ ...tripData, endLocation: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <DateInput
            label={"Start time"}
            defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
            onChange={(date) => setTripData({ ...tripData, startTime: parseZonedDateTime(date.toString()).toString() })}
            labelPlacement="outside"
          />
          <DateInput
            label={"End time"}
            defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
            onChange={(date) => setTripData({ ...tripData, endTime: parseZonedDateTime(date.toString()).toString() })}
            isInvalid={tripData.endTime < tripData.startTime}
            errorMessage="End time must be after start time."
            labelPlacement="outside"
          />
        </div>
        <InputField
          label="Distance"
          value={tripData.distance.toString()}
          onChange={(e) => setTripData({ ...tripData, distance: parseInt(e.target.value) })}
        />
      </form>
      <div className="inline-flex w-full flex-row justify-end">
        <div className="inline-flex flex-row gap-2">
          <Button
            variant="ghost"
            color="error"
            size="md"
            radius="full"
            isDisabled={false}
            onClick={() => setShowModal(true)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="md"
            radius="full"
            isDisabled={false}
            onClick={handleSubmit}
          >
            Add trip
          </Button>
          {showModal && (
            <ConfirmationModal
              title="Are you sure?"
              message="Do you really want to cancel the adding process? This action cannot be undone."
              onConfirm={() => handleConfirmCancel()}
              onCancel={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
