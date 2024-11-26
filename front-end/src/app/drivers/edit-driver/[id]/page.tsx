"use client"

import { useState, useEffect } from "react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

interface Driver {
  id: string;
  name: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  homeAddress: string;
  phoneNumber: string;
}

export default function EditDriver() {
  const { id } = useParams();
  const driverAPI = API.driverList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [driver, setDriver] = useState<Driver | null>(null);
  const [name, setName] = useState(driver?.name);
  const [idNumber, setIdNumber] = useState(driver?.idNumber);
  const [sex, setSex] = useState(driver?.sex);
  const [dateOfBirth, setDateOfBirth] = useState(driver?.dateOfBirth);
  const [homeAddress, setHomeAddress] = useState(driver?.homeAddress);
  const [phoneNumber, setPhoneNumber] = useState(driver?.phoneNumber);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`${driverAPI}/${id}`);
        setDriver(response.data);
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
    fetchDriver();
  }, [id, driverAPI]);

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/trips");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${driverAPI}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          idNumber,
          sex,
          dateOfBirth,
          homeAddress,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Vehicle added successfully");
      router.push(`/drivers/${id}`);
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
                  label="Name"
                  defaultValue={driver?.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputField
                  label="ID Number"
                  defaultValue={driver?.idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Sex"
                  defaultValue={driver?.sex}
                  onChange={(e) => setSex(e.target.value)}
                />
                <InputField
                  label="Date of Birth"
                  defaultValue={driver?.dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Home address"
                  defaultValue={driver?.homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                />
                <InputField
                  label="Phone number"
                  defaultValue={driver?.phoneNumber}
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
                  Update driver
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
        )
      }
    </div>
  );
}
