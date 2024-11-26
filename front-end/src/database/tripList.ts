const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "VEHICLE", uid: "vehicleId", sortable: true},
  {name: "DRIVER", uid: "driverId", sortable: true},
  {name: "START LOCATION", uid: "startLocation"},
  {name: "END LOCATION", uid: "endLocation"},
  {name: "START TIME", uid: "startTime"},
  {name: "END TIME", uid: "endTime"},
  {name: "DISTANCE", uid: "distance"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Pending", uid: "pending"},
  {name: "Accepted", uid: "accepted"},
  {name: "In progress", uid: "in_progress"},
  {name: "Completed", uid: "completed"},
];

const trips = [
  {
    id: "1",
    vehicleId: "1",
    driverId: "1",
    startLocation: "Hanoi",
    endLocation: "Hai Phong",
    startTime: "2021-01-01T17:01:53.707Z",
    endTime: "2021-01-01T17:01:53.707Z",
    distance: 100,
    status: "pending",
  },
  {
    id: "2",
    vehicleId: "2",
    driverId: "2",
    startLocation: "HCMC",
    endLocation: "Can Tho",
    startTime: "2021-01-01T17:01:53.707Z",
    endTime: "2021-01-01T17:01:53.707Z",
    distance: 200,
    status: "completed",
  },
  {
    id: "3",
    vehicleId: "3",
    driverId: "3",
    startLocation: "HCMC",
    endLocation: "Vung Tau",
    startTime: "2021-01-01T17:01:53.707Z",
    endTime: "2021-01-01T17:01:53.707Z",
    distance: 300,
    status: "in_progress",
  },
  {
    id: "4",
    vehicleId: "4",
    driverId: "4",
    startLocation: "HCMC",
    endLocation: "Da Nang",
    startTime: "2021-01-01T17:01:53.707Z",
    endTime: "2021-01-01T17:01:53.707Z",
    distance: 400,
    status: "accepted",
  }
];

export default trips;
export {columns, trips, statusOptions};