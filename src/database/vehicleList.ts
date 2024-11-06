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
    title: "Registration Number",
  },
  {
    key: "type",
    title: "Type",
  },
  {
    key: "mark",
    title: "Mark",
  },
  {
    key: "typeOfFuel",
    title: "Type of Fuel",
  },
  {
    key: "engineDisplacement",
    title: "Engine Displacement",
  },
  {
    key: "vinNumber",
    title: "VIN Number",
  },
  {
    key: "model",
    title: "Model",
  },
  {
    key: "manufactureYear",
    title: "Manufacture Year",
  },
  {
    key: "manufactureCountry",
    title: "Manufacture Country",
  },
]

const data = { vehicleList, columns };
export default data;
