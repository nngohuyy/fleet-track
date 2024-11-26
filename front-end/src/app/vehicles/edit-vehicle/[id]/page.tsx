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
import { Spinner } from "@nextui-org/react";

interface Vehicle {
  id: string;
  registrationNumber: string;
  type: string;
  mark: string;
  engineNumber: string;
  typeOfFuel: string;
  engineDisplacement: number;
  vinNumber: string;
  model: string;
  chassisNumber: string;
  manufactureYear: number;
  manufactureCountry: string;
  inspectionReportNumber: string;
  dateOfIssue: string;
  validUntil: string;
}

export default function EditVehicle() {
  const { id } = useParams();
  const vehicleAPI = API.vehicleList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState(vehicle?.registrationNumber);
  const [type, setType] = useState(vehicle?.type);
  const [mark, setMark] = useState(vehicle?.mark);
  const [engineNumber, setEngineNumber] = useState(vehicle?.engineNumber);
  const [typeOfFuel, setTypeOfFuel] = useState(vehicle?.typeOfFuel);
  const [engineDisplacement, setEngineDisplacement] = useState(vehicle?.engineDisplacement);
  const [vinNumber, setVinNumber] = useState(vehicle?.vinNumber);
  const [model, setModel] = useState(vehicle?.model);
  const [chassisNumber, setChassisNumber] = useState(vehicle?.chassisNumber);
  const [manufactureYear, setManufactureYear] = useState(vehicle?.manufactureYear);
  const [manufactureCountry, setManufactureCountry] = useState(vehicle?.manufactureCountry);
  const [inspectionReportNumber, setInspectionReportNumber] = useState(vehicle?.inspectionReportNumber);
  const [dateOfIssue, setDateOfIssue] = useState(vehicle?.dateOfIssue);
  const [validUntil, setValidUntil] = useState(vehicle?.validUntil);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${vehicleAPI}/${id}`);
        setVehicle(response.data);
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
    fetchVehicle();
  }, [id, vehicleAPI]);

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/vehicles");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${vehicleAPI}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationNumber,
          type,
          mark,
          engineNumber,
          typeOfFuel,
          engineDisplacement,
          vinNumber,
          model,
          chassisNumber,
          manufactureYear,
          manufactureCountry,
          inspectionReportNumber,
          dateOfIssue,
          validUntil,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Vehicle added successfully");
      router.push(`/vehicles/${id}`);
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
          <div className="w-full h-56 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-9">
            <form onSubmit={handleSubmit} className="inline-flex w-full flex-col gap-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="inline-flex flex-col gap-6">
                  <InputField
                    label="Registration number"
                    defaultValue={vehicle?.registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                  <div className="w-full inline-flex flex-row gap-4">
                    <InputField
                      label="Type"
                      defaultValue={vehicle?.type}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <InputField
                      label="Mark"
                      defaultValue={vehicle?.mark}
                      onChange={(e) => setMark(e.target.value)}
                    />
                  </div>
                  <InputField
                    label="Engine number"
                    defaultValue={vehicle?.engineNumber}
                    onChange={(e) => setEngineNumber(e.target.value)}
                  />
                  <div className="w-full inline-flex flex-row gap-4">
                    <InputField
                      label="Type of fuel"
                      defaultValue={vehicle?.typeOfFuel}
                      onChange={(e) => setTypeOfFuel(e.target.value)}
                    />
                    <InputField
                      label="Engine displacement"
                      defaultValue={vehicle?.engineDisplacement.toString()}
                      onChange={(e) => setEngineDisplacement(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="inline-flex flex-col gap-6">
                  <InputField
                    label="VIN number"
                    defaultValue={vehicle?.vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                  />
                  <InputField
                    label="Model"
                    defaultValue={vehicle?.model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                  <InputField
                    label="Chassis number"
                    defaultValue={vehicle?.chassisNumber}
                    onChange={(e) => setChassisNumber(e.target.value)}
                  />
                  <div className="w-full inline-flex flex-row gap-4 items-end">
                    <InputField
                      label="Manufacture"
                      placeholder="Year"
                      defaultValue={vehicle?.manufactureYear.toString()}
                      onChange={(e) => setManufactureYear(Number(e.target.value))}
                    />
                    <InputField
                      label=""
                      placeholder="Country"
                      defaultValue={vehicle?.manufactureCountry}
                      onChange={(e) => setManufactureCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Inspection report number"
                  defaultValue={vehicle?.inspectionReportNumber}
                  onChange={(e) => setInspectionReportNumber(e.target.value)}
                />
                <div className="w-full inline-flex flex-row gap-4">
                  <InputField
                    label="Date of issue"
                    defaultValue={vehicle?.dateOfIssue}
                    onChange={(e) => setDateOfIssue(e.target.value)}
                  />
                  <InputField
                    label="Valid until"
                    defaultValue={vehicle?.validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <div className="inline-flex w-full flex-row justify-between">
              <Button
                variant="outline"
                // color="success"
                size="md"
                radius="full"
                startContent={<span className="material-symbols-rounded">document_scanner</span>}
                // isFullWidth
                isDisabled={false}
                onClick={() => { }}
              >
                Scan inspection certificate
              </Button>

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
                  Update vehicle
                </Button>
                {showModal && (
                  <ConfirmationModal
                    title="Are you sure?"
                    message="Do you really want to cancel the updating process? This action cannot be undone."
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
