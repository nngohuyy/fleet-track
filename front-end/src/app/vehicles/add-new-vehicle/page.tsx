"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { Button } from "@nextui-org/react";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function AddNewVehicle() {
  const vehicleAPI = API.vehicleList;
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationNumber: "",
      type: "",
      mark: "",
      engineNumber: "",
      typeOfFuel: "",
      engineDisplacement: "",
      vinNumber: "",
      model: "",
      chassisNumber: "",
      manufactureYear: "",
      manufactureCountry: "",
      inspectionReportNumber: "",
      dateOfIssue: "",
      validUntil: "",
      status: "available",
    },
  });

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/vehicles");
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(vehicleAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  };

  return (
    <div className="flex flex-col gap-9">
      {apiError && <p>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="inline-flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="inline-flex flex-col gap-6">
            <Controller
              name="registrationNumber"
              control={control}
              rules={{
                required: "Registration number is required",
                pattern: {
                  value: /^\d{2}[A-Z]-\d{3}\.\d{2}$/,
                  message: "Invalid registration number format. Use '51K-123.45'.",
                },
              }}
              render={({ field }) => (
                <div>
                  <InputField label="Registration number" {...field} />
                  {errors.registrationNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.registrationNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="w-full inline-flex flex-row gap-4">
              <Controller
                name="type"
                control={control}
                render={({ field }) => <InputField label="Type" {...field} />}
              />
              <Controller
                name="mark"
                control={control}
                render={({ field }) => <InputField label="Mark" {...field} />}
              />
            </div>
            <Controller
              name="engineNumber"
              control={control}
              render={({ field }) => <InputField label="Engine number" {...field} />}
            />
            <div className="w-full inline-flex flex-row gap-4">
              <Controller
                name="typeOfFuel"
                control={control}
                render={({ field }) => <InputField label="Type of fuel" {...field} />}
              />
              <Controller
                name="engineDisplacement"
                control={control}
                render={({ field }) => (
                  <InputField label="Engine displacement" {...field} />
                )}
              />
            </div>
          </div>
          <div className="inline-flex flex-col gap-6">
            <Controller
              name="vinNumber"
              control={control}
              rules={{
                required: "VIN number is required",
                pattern: {
                  value: /^[A-HJ-NPR-Z0-9]{17}$/,
                  message: "Invalid VIN number. Ensure it is 17 characters and excludes I, O, Q.",
                },
              }}
              render={({ field }) => (
                <div>
                  <InputField label="VIN number" {...field} />
                  {errors.vinNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.vinNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => <InputField label="Model" {...field} />}
            />
            <Controller
              name="chassisNumber"
              control={control}
              render={({ field }) => (
                <InputField label="Chassis number" {...field} />
              )}
            />
            <div className="w-full inline-flex flex-row gap-4 items-end">
              <Controller
                name="manufactureYear"
                control={control}
                render={({ field }) => (
                  <InputField label="Manufacture" placeholder="Year" {...field} />
                )}
              />
              <Controller
                name="manufactureCountry"
                control={control}
                render={({ field }) => (
                  <InputField label="" placeholder="Country" {...field} />
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Controller
            name="inspectionReportNumber"
            control={control}
            render={({ field }) => (
              <InputField label="Inspection report number" {...field} />
            )}
          />
          <div className="w-full inline-flex flex-row gap-4">
            <Controller
              name="dateOfIssue"
              control={control}
              render={({ field }) => (
                <InputField label="Date of issue" {...field} />
              )}
            />
            <Controller
              name="validUntil"
              control={control}
              render={({ field }) => <InputField label="Valid until" {...field} />}
            />
          </div>
        </div>
        <div className="inline-flex w-full flex-row justify-between">
          <Button
            variant="bordered"
            size="md"
            radius="full"
            startContent={<span className="material-symbols-rounded">document_scanner</span>}
            onClick={() => { }}
          >
            Scan inspection certificate
          </Button>
          <div className="inline-flex flex-row gap-2">
            <Button
              variant="light"
              color="danger"
              size="md"
              radius="full"
              onClick={() => setShowModal(true)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="md"
              radius="full"
              type="submit"
            >
              Add vehicle
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
      </form>
    </div>
  );
}
