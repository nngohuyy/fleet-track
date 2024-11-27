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
    "_id": "6746d6dbf52c7f2861f32d2e",
    "registrationNumber": "51K-123.45",
    "type": "Car",
    "mark": "Honda",
    "engineNumber": "ABC-123-DEF-456",
    "typeOfFuel": "Gasoline",
    "engineDisplacement": 1.8,
    "vinNumber": "12345678901234567",
    "model": "Civic",
    "chassisNumber": "ABC123",
    "manufactureYear": 2024,
    "manufactureCountry": "Japan",
    "inspectionReportNumber": "ABC-345",
    "dateOfIssue": "2024-11-11T00:00:00.000Z",
    "validUntil": "2024-11-30T00:00:00.000Z",
    "insurancePurchaseDate": "2024-11-05T00:00:00.000Z",
    "insuranceExpirationDate": "2024-11-30T00:00:00.000Z",
    "image": "",
    "status": "available",
    "stt": 2,
    "__v": 0,
    "imageURL": null
  }
];

export default vehicles;
export {columns, vehicles, statusOptions};