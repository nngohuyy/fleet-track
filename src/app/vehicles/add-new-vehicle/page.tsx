"use client"

import { useState } from "react";
import React from "react";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import API from "@/database/apiList";

export default function AddNewVehicle() {
  const vehicleAPI = API.vehicleList;
  
  const [vehicleModule, setVehicleModule] = useState("");
  const [SoKhungModule, setSoKhungModule] = useState("");
  const [HangModule, setHangModule] = useState("");
  const [BienSoModule, setBienSoModule] = useState("");
  const [NhienLoaiModule, setNhienLoaiModule] = useState("");
  const [NamModule, setNamModule] = useState("");
  const [LoaiXeModule, setLoaiXeModule] = useState("");
  const [MauSacModule, setMauSacModule] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(vehicleAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleModule,
          SoKhungModule,
          HangModule,
          BienSoModule,
          NhienLoaiModule,
          NamModule,
          LoaiXeModule,
          MauSacModule,
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
      <form onSubmit={handleSubmit} className="inline-flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="inline-flex flex-col gap-6">
            <InputField label="Registration number" />
            <div className="w-full inline-flex flex-row gap-4">
              <InputField label="Type" />
              <InputField label="Mark" />
            </div>
            <InputField label="Engine number" />
            <div className="w-full inline-flex flex-row gap-4">
              <InputField label="Type of fuel" />
              <InputField label="Engine displacement" />
            </div>
          </div>
          <div className="inline-flex flex-col gap-6">
            <InputField label="VIN number" />
            <InputField label="Model" />
            <InputField label="Chassis number" />
            <div className="w-full inline-flex flex-row gap-4 items-end">
              <InputField label="Manufacture" placeholder="Year" />
              <InputField label="" placeholder="Country" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField label="Inspection report number" />
          <div className="w-full inline-flex flex-row gap-4">
            <InputField label="Date of issue" />
            <InputField label="Valid until" />
          </div>
        </div>
      </form>
      <div className="inline-flex w-full flex-row justify-between">
        <Button
          variant="outline"
          color="success"
          size="lg"
          radius="full"
          startContent={<span className="material-symbols-rounded">document_scanner</span>}
          // isFullWidth
          isDisabled={false}
          // onClick={() => alert("Button clicked")}
        >
          Submit
        </Button>

        <div className="inline-flex flex-row gap-2">
          <a
            className="rounded-full w-fit border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/vehicles/add-new-vehicle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cancel
          </a>
          <a
            className="rounded-full w-fit border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/vehicles/add-new-vehicle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add
          </a>
        </div>
      </div>
    </div>
  );
}
