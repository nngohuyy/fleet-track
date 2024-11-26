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

const drivers = [
  {
    "name": "Mike Ruecker",
    "idNumber": "dcabdfababac7cff4ee1d8c5",
    "sex": "male",
    "dateOfBirth": "2006-09-17T17:25:10.462Z",
    "homeAddress": "homeAddress 1",
    "phoneNumber": "phoneNumber 1",
    "isDriving": true,
    "id": "1"
  },
  {
    "name": "Joe Lockman",
    "idNumber": "22e39fd1eaebee7deaebea16",
    "sex": "male",
    "dateOfBirth": "1985-05-26T08:55:57.634Z",
    "homeAddress": "homeAddress 2",
    "phoneNumber": "phoneNumber 2",
    "isDriving": true,
    "id": "2"
  },
];

export default drivers;
export {columns, drivers, statusOptions};