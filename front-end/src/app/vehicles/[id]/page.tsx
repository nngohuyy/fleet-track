"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ring } from 'ldrs';
import { useParams } from 'next/navigation';
import API from '@/database/apiList';
import Button from '@/components/Button/Button';
import Link from 'next/link';

ring.register('spinner-ring');

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

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const vehicleAPI = API.vehicleList;

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

  return (
    isLoading ? (
      <spinner-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></spinner-ring>
    ) : (
      <div>
        <h1 className="text-xl font-semibold">Vehicle Details</h1>
        {apiError && <p>{apiError}</p>}
        <div>
          {vehicle && (
            <>
              <p><strong>ID:</strong> {vehicle.id}</p>
              <p><strong>Registration Number:</strong> {vehicle.registrationNumber}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Mark:</strong> {vehicle.mark}</p>
              <p><strong>Engine Number:</strong> {vehicle.engineNumber}</p>
              <p><strong>Fuel Type:</strong> {vehicle.typeOfFuel}</p>
              <p><strong>Engine Displacement:</strong> {vehicle.engineDisplacement}</p>
              <p><strong>VIN Number:</strong> {vehicle.vinNumber}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Chassis Number:</strong> {vehicle.chassisNumber}</p>
              <p><strong>Manufacture Year:</strong> {vehicle.manufactureYear}</p>
              <p><strong>Manufacture Country:</strong> {vehicle.manufactureCountry}</p>
              <p><strong>Inspection Report Number:</strong> {vehicle.inspectionReportNumber}</p>
              <p><strong>Date of Issue:</strong> {vehicle.dateOfIssue}</p>
              <p><strong>Valid Until:</strong> {vehicle.validUntil}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {vehicle && (
            <Link href={`/vehicles/edit-vehicle/${vehicle.id}`}>
              <Button variant="outline" color="primary" size="md" radius="full">
                Edit Vehicle
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
}
