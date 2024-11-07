"use client"

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function AddNewVehicle() {
  const driverAPI = API.driverList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/trips");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(driverAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          idNumber,
          sex,
          dateOfBirth,
          homeAddress,
          phoneNumber
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Driver added successfully");
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
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
          <InputField
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Home address"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
          />
          <InputField
            label="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
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
            Add driver
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
