import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "@/database/apiList";
import { Vehicle } from "@/database/interface";

interface VehicleDropdownProps {
  onVehicleSelect: (vehicleId: string) => void;
  value?: string;
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({ onVehicleSelect, value }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(API.vehicleList);
        const availableVehicles = response.data.filter(
          (vehicle: Vehicle) => vehicle.status === "available"
        );
        setVehicles(availableVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <label htmlFor="vehicleDropdown" className="block text-sm font-medium text-gray-700">
        Registration number
      </label>
      <select
        id="vehicleDropdown"
        onChange={(e) => onVehicleSelect(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        disabled={isLoading}
        value={value}
      >
        <option value="" disabled>
          {isLoading ? "Loading vehicles..." : "Select a vehicle"}
        </option>
        {!isLoading &&
          vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.registrationNumber}
            </option>
          ))}
      </select>
    </div>
  );
};

export default VehicleDropdown;
