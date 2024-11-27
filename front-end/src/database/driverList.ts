const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Name", uid: "name", sortable: true},
  {name: "ID Number", uid: "idNumber", sortable: true},
  {name: "Sex", uid: "sex", sortable: true},
  {name: "Date of Birth", uid: "dateOfBirth", sortable: true},
  {name: "Home Address", uid: "homeAddress", sortable: true},
  {name: "Phone Number", uid: "phoneNumber", sortable: true},
  {name: "Driving Status", uid: "isDriving", sortable: true},
  {name: "Actions", uid: "actions"},
];

const statusOptions = [
  {name: "Is Driving", uid: "is_driving"},
  {name: "Available", uid: "available"},
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