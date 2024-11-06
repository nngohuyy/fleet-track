"use client"

import { useState } from "react";
import React from "react";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";

export default function AddNewVehicle() {
  const vehicleAPI = API.vehicleList;
  const [apiError, setApiError] = useState("");
  
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [type, setType] = useState("");
  const [mark, setMark] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [engineDisplacement, setEngineDisplacement] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [model, setModel] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [manufactureCountry, setManufactureCountry] = useState("");
  const [inspectionReportNumber, setInspectionReportNumber] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [validUntil, setValidUntil] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(vehicleAPI, {
        method: "POST",
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
          <div className="inline-flex flex-col gap-6">
            <InputField
              label="Registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <div className="w-full inline-flex flex-row gap-4">
              <InputField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <InputField
                label="Mark"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
              />
            </div>
            <InputField
              label="Engine number"
              value={engineNumber}
              onChange={(e) => setEngineNumber(e.target.value)}
            />
            <div className="w-full inline-flex flex-row gap-4">
              <InputField
                label="Type of fuel"
                value={typeOfFuel}
                onChange={(e) => setTypeOfFuel(e.target.value)}
              />
              <InputField
                label="Engine displacement"
                value={engineDisplacement}
                onChange={(e) => setEngineDisplacement(e.target.value)}
              />
            </div>
          </div>
          <div className="inline-flex flex-col gap-6">
            <InputField
              label="VIN number"
              value={vinNumber}
              onChange={(e) => setVinNumber(e.target.value)}
            />
            <InputField
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <InputField
              label="Chassis number"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value)}
            />
            <div className="w-full inline-flex flex-row gap-4 items-end">
              <InputField
                label="Manufacture"
                placeholder="Year"
                value={manufactureYear}
                onChange={(e) => setManufactureYear(e.target.value)}
              />
              <InputField
                label=""
                placeholder="Country"
                value={manufactureCountry}
                onChange={(e) => setManufactureCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Inspection report number"
            value={inspectionReportNumber}
            onChange={(e) => setInspectionReportNumber(e.target.value)}
          />
          <div className="w-full inline-flex flex-row gap-4">
            <InputField
              label="Date of issue"
              value={dateOfIssue}
              onChange={(e) => setDateOfIssue(e.target.value)}
            />
            <InputField
              label="Valid until"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="inline-flex w-full flex-row justify-between">
        <Button
          variant="outline"
          color="success"
          size="md"
          radius="full"
          startContent={<span className="material-symbols-rounded">document_scanner</span>}
          // isFullWidth
          isDisabled={false}
          onClick={() => {}}
        >
          Scan inspection certificate
        </Button>

        <div className="inline-flex flex-row gap-2">
          <Button
            variant="outline"
            color="error"
            size="md"
            radius="full"
            isDisabled={false}
            onClick={() => {}}
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
            Add vehicle
          </Button>
        </div>
      </div>
    </div>
  );
}
