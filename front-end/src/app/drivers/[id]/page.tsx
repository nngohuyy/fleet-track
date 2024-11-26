"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ring } from 'ldrs';
import { useParams } from 'next/navigation';
import API from '@/database/apiList';
import Button from '@/components/Button/Button';
import Link from 'next/link';

ring.register('spinner-ring');

interface Driver {
  id: string;
  name: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  homeAddress: string;
  phoneNumber: string;
}

export default function DriverDetailsPage() {
  const { id } = useParams();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const driverAPI = API.driverList;

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
          {driver && (
            <>
              <p><strong>ID:</strong> {driver.id}</p>
              <p><strong>Name:</strong> {driver.name}</p>
              <p><strong>ID Number:</strong> {driver.idNumber}</p>
              <p><strong>Sex:</strong> {driver.sex}</p>
              <p><strong>Date of Birth:</strong> {driver.dateOfBirth}</p>
              <p><strong>Home Address:</strong> {driver.homeAddress}</p>
              <p><strong>Phone Number:</strong> {driver.phoneNumber}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {driver && (
            <Link href={`/drivers/edit-driver/${driver.id}`}>
              <Button variant="outline" color="primary" size="md" radius="full">
                Edit Driver
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
}
