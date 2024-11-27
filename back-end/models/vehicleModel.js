const mongoose = require('mongoose');
const Counter = require('./counterModel'); // Import the Counter model

const vehicleSchema = new mongoose.Schema({
    registrationNumber: String,
    type: String,
    mark: String,
    engineNumber: String,
    typeOfFuel: String,
    engineDisplacement: Number,
    vinNumber: String,
    model: String,
    chassisNumber: String,
    manufactureYear: Number,
    manufactureCountry: String,
    inspectionReportNumber: String,
    dateOfIssue: Date,
    validUntil: Date,
    insurancePurchaseDate: Date, // Ngày mua bảo hiểm
    insuranceExpirationDate: Date, // Ngày hết hạn bảo hiểm
    // image: {
    //     data: Buffer,
    //     contentType: String
    // },
    image: String,
    status: String,
    id: String,
    stt: Number
});

// Pre-save hook to assign sequential stt
vehicleSchema.pre('save', async function (next) {
    const vehicle = this;

    // Check if `stt` already exists to avoid duplicate assignment
    if (vehicle.stt) return next();

    try {
        // Find and increment the sequence in the Counter collection
        const counter = await Counter.findOneAndUpdate(
            { model: 'Vehicle' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } // Create if it doesn't exist
        );

        vehicle.stt = counter.seq; // Set the sequential stt
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
