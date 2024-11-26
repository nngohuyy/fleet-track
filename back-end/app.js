const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // URL của frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Cho phép cookie và xác thực
}));
app.use(express.json());

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Dừng server nếu không kết nối được
    }
};

// Gọi hàm kết nối DB
connectDB();

// Sử dụng các route
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Route mặc định
app.get('/', (req, res) => {
    res.send('Welcome to the Fleet Management API');
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
