"use client"

import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

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

export default function EditVehicle() {
  const { id } = useParams();
  const tripAPI = API.tripList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [trip, setTrip] = useState<Trip | null>(null);
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distance, setDistance] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`${tripAPI}/${id}`);
        setTrip(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("An unknown error occurred");
        }
      }
    };
    fetchTrip();
  }, [id, tripAPI]);

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/trips");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${tripAPI}/${id}`, {
        method: "PUT",
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

      alert("Vehicle added successfully");
      router.push(`/trips/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unknown error occurred");
      }
    }
  }

  return (
    <div className="flex flex-col">
      {apiError && <p>{apiError}</p>}
      {
        isLoading ? (
          <spinner-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></spinner-ring>
        ) : (
          <div className="flex flex-col gap-9">
            {apiError && <p>{apiError}</p>}
            <form onSubmit={handleSubmit} className="inline-flex w-full flex-col gap-6">
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Vehicle ID"
                  defaultValue={trip?.vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                />
                <InputField
                  label="Driver ID"
                  defaultValue={trip?.driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Start location"
                  defaultValue={trip?.startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
                <InputField
                  label="End location"
                  defaultValue={trip?.endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Start time"
                  defaultValue={trip?.startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <InputField
                  label="End time"
                  defaultValue={trip?.endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <InputField
                label="Distance"
                defaultValue={trip?.distance.toString()}
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
                  Update trip
                </Button>
                {showModal && (
                  <ConfirmationModal
                    title="Are you sure?"
                    message="Do you really want to cancel the editing process? This action cannot be undone."
                    confirmText="Yes, cancel"
                    cancelText="No"
                    onConfirm={() => handleConfirmCancel()}
                    onCancel={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
