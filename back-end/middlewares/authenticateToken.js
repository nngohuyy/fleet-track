const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    const JWT_SECRET = process.env.JWT_SECRET; // Access JWT_SECRET from the environment variable

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user; // Attach user data to the request object
        next();
    });
};

module.exports = authenticateToken;
