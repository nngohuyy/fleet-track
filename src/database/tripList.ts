import { title } from "process";

const tripList = [
  {

  }
]

const columns = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "registrationNumber", // fetch by vehicleID
    title: "Registration Number",
  },
  {
    key: "driverName", // fetch by driverID
    title: "Driver's Name",
  },
  {
    key: "status",
    title: "Status", // isDriving: true/false
  },
  {
    key: "startLocation",
    title: "Start Location",
  },
  {
    key: "endLocation",
    title: "End Location",
  },
  {
    key: "startTime",
    title: "Start Time",
  },
  {
    key: "endTime", // default: null, updated when driver hit finish trip
    title: "End Time",
  },
  // {
  //   key: "distance",
  //   title: "Distance",
  // },
  {
    key: "actions",
    title: "Actions",
  }
]

const data = { tripList, columns };
export default data;
