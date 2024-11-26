const express = require('express');
const multer = require('multer');
const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    getVehicleImageById
} = require('../controllers/vehicleController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Định nghĩa các route API cho phương tiện

// Lấy danh sách phương tiện
router.get('/', getVehicles);  // GET /api/vehicles - lấy tất cả phương tiện

// Thêm phương tiện mới với ảnh
router.post('/', upload.single('image'), createVehicle);  // POST /api/vehicles - thêm phương tiện mới

// Lấy thông tin một phương tiện theo ID
router.get('/:id', getVehicleById);  // GET /api/vehicles/:id - lấy phương tiện theo ID

// Cập nhật thông tin phương tiện theo ID, bao gồm cả cập nhật ảnh
router.put('/:id', upload.single('image'), updateVehicle);  // PUT /api/vehicles/:id - cập nhật phương tiện

// Xóa phương tiện theo ID
router.delete('/:id', deleteVehicle);  // DELETE /api/vehicles/:id - xóa phương tiện theo ID

// Lấy ảnh của phương tiện theo ID
router.get('/:id/image', getVehicleImageById);  // GET /api/vehicles/:id/image - lấy ảnh phương tiện

module.exports = router;
