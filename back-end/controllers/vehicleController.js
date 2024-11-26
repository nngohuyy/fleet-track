const Vehicle = require('../models/vehicleModel');

// Tạo mới một phương tiện (Create)
exports.createVehicle = async (req, res) => {
    try {
        const newVehicle = new Vehicle({
            registrationNumber: req.body.registrationNumber,
            type: req.body.type,
            mark: req.body.mark,
            engineNumber: req.body.engineNumber,
            typeOfFuel: req.body.typeOfFuel,
            engineDisplacement: req.body.engineDisplacement,
            vinNumber: req.body.vinNumber,
            model: req.body.model,
            chassisNumber: req.body.chassisNumber,
            manufactureYear: req.body.manufactureYear,
            manufactureCountry: req.body.manufactureCountry,
            inspectionReportNumber: req.body.inspectionReportNumber,
            dateOfIssue: req.body.dateOfIssue,
            validUntil: req.body.validUntil,
            id: req.body.id,
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : null
        });
        await newVehicle.save();
        res.status(201).send('Vehicle added successfully');
    } catch (error) {
        console.error("Error creating vehicle:", error); // Log lỗi chi tiết
        res.status(500).json({ message: 'Error adding vehicle', error: error.message });
    }
};

// Lấy danh sách tất cả các phương tiện (Read - all)
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        const formattedVehicles = vehicles.map(vehicle => ({
            ...vehicle._doc,
            imageURL: vehicle.image ? `/api/vehicles/${vehicle._id}/image` : null
        }));
        res.json(formattedVehicles);
    } catch (error) {
        res.status(500).send('Error fetching vehicles');
    }
};

// Lấy chi tiết một phương tiện theo ID (Read - single)
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).send('Error fetching vehicle');
    }
};

// Cập nhật một phương tiện theo ID (Update)
exports.updateVehicle = async (req, res) => {
    try {
        const updates = {
            registrationNumber: req.body.registrationNumber,
            type: req.body.type,
            mark: req.body.mark,
            engineNumber: req.body.engineNumber,
            typeOfFuel: req.body.typeOfFuel,
            engineDisplacement: req.body.engineDisplacement,
            vinNumber: req.body.vinNumber,
            model: req.body.model,
            chassisNumber: req.body.chassisNumber,
            manufactureYear: req.body.manufactureYear,
            manufactureCountry: req.body.manufactureCountry,
            inspectionReportNumber: req.body.inspectionReportNumber,
            dateOfIssue: req.body.dateOfIssue,
            validUntil: req.body.validUntil,
            id: req.body.id
        };

        if (req.file) {
            updates.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).send('Error updating vehicle');
    }
};

// Xóa một phương tiện theo ID (Delete)
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.status(200).send('Vehicle deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting vehicle');
    }
};

// Lấy ảnh phương tiện theo ID
exports.getVehicleImageById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle || !vehicle.image || !vehicle.image.data) {
            return res.status(404).send('Image not found');
        }
        res.contentType(vehicle.image.contentType);
        res.send(vehicle.image.data);
    } catch (error) {
        res.status(500).send('Error fetching image');
    }
};
