"use client"

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import VehicleDropdown from "./VehicleDropdown";

export default function AddNewVehicle() {
  const tripAPI = API.tripList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distance, setDistance] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/trips");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(tripAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId,
          driverId,
          startLocation,
          endLocation,
          startTime,
          endTime,
          distance,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Trip added successfully");
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unknown error occurred");
      }
    }
  }

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
          <VehicleDropdown />
          <InputField
            label="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Start location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
          <InputField
            label="End location"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Start time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <InputField
            label="End time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <InputField
          label="Distance"
          value={distance.toString()}
          onChange={(e) => setDistance(Number(e.target.value))}
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
