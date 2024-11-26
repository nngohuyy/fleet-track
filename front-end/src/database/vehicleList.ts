const vehicleList = [
  {
    id: "433KME4D",
    registrationNumber: "51K-12345",
    type: "Car",
    mark: "Toyota",
    typeOfFuel: "Gasoline",
    engineDisplacement: 2.0,
    vinNumber: "1234567890",
    model: "Camry",
    manufactureYear: 2021,
    manufactureCountry: "Japan",
  },
  {
    id: "433KME4D",
    registrationNumber: "51K-54321",
    type: "Car",
    mark: "Honda",
    typeOfFuel: "Gasoline",
    engineDisplacement: 1.8,
    vinNumber: "0987654321",
    model: "Civic",
    manufactureYear: 2020,
    manufactureCountry: "Japan",
  },
  {
    id: "433KME4D",
    registrationNumber: "51L-450.39",
    type: "Car",
    mark: "Hyundai",
    typeOfFuel: "Gasoline",
    engineDisplacement: 2.0,
    vinNumber: "1234509876",
    model: "Elantra",
    manufactureYear: 2019,
    manufactureCountry: "Korea",
  },
  {
    id: "433KME4D",
    registrationNumber: "51M-54321",
    type: "Car",
    mark: "Mazda",
    typeOfFuel: "Gasoline",
    engineDisplacement: 2.5,
    vinNumber: "0987654321",
    model: "CX-5",
    manufactureYear: 2020,
    manufactureCountry: "Japan",
  },
  {
    id: "433KME4D",
    registrationNumber: "51N-54321",
    type: "Car",
    mark: "Ford",
    typeOfFuel: "Gasoline",
    engineDisplacement: 2.3,
    vinNumber: "0987654321",
    model: "Ranger",
    manufactureYear: 2020,
    manufactureCountry: "USA",
  },
]

const columns = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "registrationNumber",
    title: "Registration Number", // 51K-12345, 51K-54321, etc.
  },
  {
    key: "status",
    title: "Status", // default: available; in use, under maintenance
  },
  {
    key: "type",
    title: "Type", // car, truck, motorcycle, etc.
  },
  {
    key: "mark",
    title: "Mark", // Toyota, Honda, etc.
  },
  {
    key: "model",
    title: "Model", // Camry, Civic, etc.
  },
  {
    key: "action",
    title: "Action",
  }
]

const data = { vehicleList, columns };
export default data;
