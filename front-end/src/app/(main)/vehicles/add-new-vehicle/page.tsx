"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Input,
} from "@nextui-org/react";
import API from "@/database/apiList";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function AddNewVehicle() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
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
      insurancePurchaseDate: "",
      insuranceExpirationDate: "",
      image: "",
      status: "available",
    },
  });

  const handleConfirmCancel = () => {
    setShowModal(false);
    router.push("/vehicles");
  };

  interface VehicleData {
    registrationNumber: string;
    type: string;
    mark: string;
    engineNumber: string;
    typeOfFuel: string;
    engineDisplacement: string;
    vinNumber: string;
    model: string;
    chassisNumber: string;
    manufactureYear: string;
    manufactureCountry: string;
    inspectionReportNumber: string;
    dateOfIssue: string;
    validUntil: string;
    insurancePurchaseDate: string;
    insuranceExpirationDate: string;
    image: string;
    status: string;
  }

  const onSubmit = async (data: VehicleData) => {
    try {
      const response = await axios.post(API.vehicleList.local, data);
      if (response.status === 201) {
        router.push("/vehicles");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col gap-9">
      {apiError && <p>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="inline-flex w-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="inline-flex flex-col gap-4">
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
              render={({ field }) =>
                <Input {...field} type="text" label="Registration number" />
              }
            />
            <div className="w-full inline-flex flex-row gap-4">
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }) =>
                  <Input {...field} type="text" label="Type" />
                }
              />
              <Controller
                name="mark"
                control={control}
                rules={{ required: "Mark is required" }}
                render={({ field }) =>
                  <Input {...field} type="text" label="Mark" />
                }
              />
            </div>
            <Controller
              name="engineNumber"
              control={control}
              rules={{ required: "Engine number is required" }}
              render={({ field }) =>
                <Input {...field} type="text" label="Engine number" />
              }
            />
            <div className="w-full inline-flex flex-row gap-4">
              <Controller
                name="typeOfFuel"
                control={control}
                rules={{ required: "Type of fuel is required" }}
                render={({ field }) => <Input {...field} type="text" label="Type of fuel" />}
              />
              <Controller
                name="engineDisplacement"
                control={control}
                rules={{ required: "Engine displacement is required" }}
                render={({ field }) => (
                  <Input {...field} type="text" label="Engine displacement" />
                )}
              />
            </div>
          </div>
          <div className="inline-flex flex-col gap-4">
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
                  <Input {...field} type="text" label="VIN number" />
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
              rules={{ required: "Model is required" }}
              render={({ field }) => <Input {...field} type="text" label="Model" />}
            />
            <Controller
              name="chassisNumber"
              control={control}
              rules={{ required: "Chassis number is required" }}
              render={({ field }) => (
                <Input {...field} type="text" label="Chassis number" />
              )}
            />
            <div className="w-full inline-flex flex-row gap-4 items-end">
              <Controller
                name="manufactureYear"
                control={control}
                rules={{ required: "Manufacture year is required" }}
                render={({ field }) => (
                  <Input {...field} type="text" label="Manufacture year" />
                )}
              />
              <Controller
                name="manufactureCountry"
                control={control}
                rules={{ required: "Manufacture country is required" }}
                render={({ field }) => (
                  <Input {...field} type="text" label="Manufacture country" />
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="inspectionReportNumber"
            control={control}
            rules={{ required: "Inspection report number is required" }}
            render={({ field }) => (
              <Input {...field} type="text" label="Inspection report number" />
            )}
          />
          <div className="w-full inline-flex flex-row gap-4">
            <Controller
              name="dateOfIssue"
              control={control}
              rules={{ required: "Date of issue is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Date of issue"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date) => field.onChange(date?.toString())}
                />
              )}
            />
            <Controller
              name="validUntil"
              control={control}
              rules={{
                required: "Valid until is required",
                validate: (value) => {
                  const dateOfIssue = getValues("dateOfIssue");
                  if (dateOfIssue && value) {
                    return Date.parse(value) > Date.parse(dateOfIssue)
                      ? true
                      : "Valid until must be after the date of issue";
                  }
                  return true;
                }
              }
              }
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Valid until"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date) => field.onChange(date?.toString())}
                />
              )}
            />
          </div>
          <div className="w-full inline-flex flex-row gap-4">
            <Controller
              name="insurancePurchaseDate"
              control={control}
              rules={{ required: "Insurance purchase date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Insurance purchase date"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date) => field.onChange(date?.toString())}
                />
              )}
            />
            <Controller
              name="insuranceExpirationDate"
              control={control}
              rules={{
                required: "Insurance expiration date is required",
                validate: (value) => {
                  const insurancePurchaseDate = getValues("insurancePurchaseDate");
                  if (insurancePurchaseDate && value) {
                    return Date.parse(value) > Date.parse(insurancePurchaseDate)
                      ? true
                      : "Valid until must be after the date of purchase";
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Insurance expiration date"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date) => field.onChange(date?.toString())}
                />
              )}
            />
          </div>
        </div>
        <div className="inline-flex w-full flex-row justify-between mt-4">
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
