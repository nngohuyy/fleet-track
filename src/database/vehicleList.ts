const vehicleList = [
  {
    "id": "1",
    "vehicleModule": "SEDAN",
    "SoKhungModule": "464DG65DG",
    "HangModule": "BWM",
    "BienSoModule": "59X32-34225",
    "NhienLoaiModule": "Electric",
    "NamModule": "2024",
    "LoaiXeModule": "RGZX",
    "MauSacModule": "BLUE",
  },
]

const columns = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "vehicle",
    title: "Mẫu xe",
  },
  {
    key: "sokhung",
    title: "Số Khung",
  },
  {
    key: "hangsanxuat",
    title: "Hãng sản xuất",
  },
  {
    key: "bienso",
    title: "Biển số",
  },
  {
    key: "loainhienlieu",
    title: "Loại nhiên liệu",
  },
  {
    key: "namsanxuat",
    title: "Năm sản xuất",
  },
  {
    key: "loaixe",
    title: "Loại xe",
  },
  {
    key: "mausac",
    title: "Màu sắc",
  }
]

const data = { vehicleList, columns };
export default data;
