const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "MARK", uid: "mark", sortable: true}, // {mark} : {mark + model + engineDisplacement + manufactureYear}
  {name: "REGISTRATION NUMBER", uid: "registrationNumber", sortable: true}, // {registrationNumber} : {type}
  {name: "ENGINE NUMBER", uid: "engineNumber"},
  {name: "VIN NUMBER", uid: "vinNumber"},
  {name: "CHASSIS NUMBER", uid: "chassisNumber"},
  {name: "MANUFACTURE COUNTRY", uid: "manufactureCountry"}, // {manufactureCountry} : {manufactureYear}
  {name: "INSPECTION REPORT NUMBER", uid: "inspectionReportNumber"}, // {inspectionReportNumber} : {dateOfIssue} - {validUntil}
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Available", uid: "available"},
  {name: "In use", uid: "in_use"},
  {name: "Under maintenance", uid: "under_maintenance"},
];

const vehicles = [
  {
    id: "1",
    registrationNumber: "51K-12345",
    type: "Car",
    mark: "Honda",
    engineNumber: "123ABC-456DEF",
    typeOfFuel: "Gasoline",
    engineDisplacement: 1.8,
    vinNumber: "0987654321",
    model: "Civic",
    chassisNumber: "1234567890",
    manufactureYear: 2020,
    manufactureCountry: "Japan",
    inspectionReportNumber: "962.790.0557 x48624",
    dateOfIssue: "2024-01-01T17:01:53.707Z",
    validUntil: "2027-01-01T10:21:43.295Z",
    status: "available",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "2",
    registrationNumber: "51K-54321",
    type: "Car",
    mark: "Hyundai",
    engineNumber: "123ABC-456DEF",
    typeOfFuel: "Gasoline",
    engineDisplacement: 2.0,
    vinNumber: "1234509876",
    model: "Elantra",
    chassisNumber: "1234567890",
    manufactureYear: 2019,
    manufactureCountry: "Korea",
    inspectionReportNumber: "962.790.0557 x48624",
    dateOfIssue: "2024-01-01T17:01:53.707Z",
    validUntil: "2027-01-01T10:21:43.295Z",
    status: "available",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
];

export default vehicles;
export {columns, vehicles, statusOptions};