import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "@/database/apiList";
import { Driver } from "@/database/interface";

interface DriverDropdownProps {
  onDriverSelect: (driverId: string) => void;
  value?: string;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({ onDriverSelect, value }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API.driverList);
        const availableDrivers = response.data.filter(
          (driver: Driver) => !driver.isDriving
        );
        setDrivers(availableDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <label htmlFor="driverDropdown" className="block text-sm font-medium text-gray-700">
        Driver name
      </label>
      <select
        id="driverDropdown"
        onChange={(e) => onDriverSelect(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        disabled={isLoading}
        value={value}
      >
        <option value="" disabled>
          {isLoading ? "Loading drivers..." : "Select a driver"}
        </option>
        {!isLoading &&
          drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DriverDropdown;
