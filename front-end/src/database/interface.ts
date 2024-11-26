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
  status: string; // available, in use, under maintenance
}

interface Driver {
  id: string;
  name: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  homeAddress: string;
  phoneNumber: string;
  isDriving: boolean; // true, false
}

interface Trip {
  id: string;
  vehicleId: string; // display registration number
  driverId: string; // display driver name
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  distance: number;
  status: string; // pending, accepted, currently, completed
}

interface Column {
  key: string;
  title: string;
}

export type { Vehicle, Driver, Trip, Column };