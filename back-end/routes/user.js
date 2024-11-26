const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Cấu hình multer để xử lý file upload
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/png')) {
      return cb(new Error('Only PNG files are allowed!'));
    }
    cb(null, true);
  },
});

// Định tuyến
router.post('/register', upload.single('imgAvatar'), userController.register);
router.post('/login', userController.login);
router.get('/', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, upload.single('imgAvatar'), userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
