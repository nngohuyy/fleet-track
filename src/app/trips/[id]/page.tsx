"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ring } from 'ldrs';
import { useParams } from 'next/navigation';
import API from '@/database/apiList';
import Button from '@/components/Button/Button';
import Link from 'next/link';

ring.register('spinner-ring');

interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  distance: number;
}

export default function TripDetailsPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const tripAPI = API.tripList;

  useEffect(() => {
    const fetchtrip = async () => {
      try {
        const response = await axios.get(`${tripAPI}/${id}`);
        setTrip(response.data);
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
    fetchtrip();
  }, [id, tripAPI]);

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
        <h1 className="text-xl font-semibold">Trip Details</h1>
        {apiError && <p>{apiError}</p>}
        <div>
          {trip && (
            <>
              <p><strong>ID:</strong> {trip.id}</p>
              <p><strong>Vehicle ID:</strong> {trip.vehicleId}</p>
              <p><strong>Driver ID:</strong> {trip.driverId}</p>
              <p><strong>Start Location:</strong> {trip.startLocation}</p>
              <p><strong>End Location:</strong> {trip.endLocation}</p>
              <p><strong>Start Time:</strong> {trip.startTime}</p>
              <p><strong>End Time:</strong> {trip.endTime}</p>
              <p><strong>Distance:</strong> {trip.distance}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          {trip && (
            <Link href={`/trips/edit-trip/${trip.id}`}>
              <Button variant="outline" color="primary" size="md" radius="full">
                Edit trip
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
}
