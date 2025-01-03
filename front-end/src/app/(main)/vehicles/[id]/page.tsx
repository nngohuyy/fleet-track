"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import API from '@/database/apiList';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { Spinner } from '@nextui-org/react';
import vehicles from '@/database/vehicleList';
import { formatISODate } from '@/utils/utils';

type Vehicle = typeof vehicles[0];

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${API.vehicleList.local}/${id}`);
        setVehicle(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("An unknown error occurred");
        }
      }
      finally {
        setIsLoading(false);
        console.log('Vehicle Details:', vehicle);
      }
    };

    fetchVehicle();
  });

  return (
    isLoading ? (
      <div className='w-full h-56 flex items-center justify-center'>
        <Spinner size='lg'/>
      </div>
    ) : (
      <div>
        <h1 className="text-xl font-semibold">Vehicle Details</h1>
        {apiError && <p>{apiError}</p>}
        <div>
          {vehicle && (
            <>
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
              <p><strong>Date of Issue:</strong> {formatISODate(vehicle.dateOfIssue)}</p>
              <p><strong>Valid Until:</strong> {formatISODate(vehicle.validUntil)}</p>
              <p><strong>Insurance Purchase Date:</strong> {formatISODate(vehicle.insurancePurchaseDate)}</p>
              <p><strong>Insurance Expiration Date:</strong> {formatISODate(vehicle.insuranceExpirationDate)}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {vehicle && (
            <Link href={`/vehicles/edit-vehicle/${vehicle._id}`}>
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
