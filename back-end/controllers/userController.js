const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Xử lý đăng ký người dùng
exports.register = async (req, res) => {
  try {
    const { name, username, password, email, cccd } = req.body;

    if (!password.match(/^(?=.*[A-Z])(?=.*\d).{8,16}$/)) {
      return res.status(400).json({
        message: 'Password must be 8-16 characters long, include at least one uppercase letter and one number.',
      });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists.' });
    }

    const newUser = new User({
      name,
      username,
      password,
      email,
      imgAvatar: req.file ? req.file.buffer : undefined,
      cccd,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user.', error });
  }
};

// Xử lý đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error });
  }
};

// Lấy thông tin người dùng qua token
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const userWithAvatar = {
      ...user._doc,
      imgAvatar: user.imgAvatar ? `data:image/png;base64,${user.imgAvatar.toString('base64')}` : null,
    };

    res.json(userWithAvatar);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user.', error });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFields = { name };

    if (req.file) {
      updatedFields.imgAvatar = req.file.buffer;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });

    res.json({ message: 'User updated successfully.', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user.', error });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found.' });

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user.', error });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email, cccd } = req.body;

    if (!email || !cccd) {
      return res.status(400).json({ message: 'Email and CCCD are required.' });
    }

    const user = await User.findOne({ email, cccd });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Recovery',
      text: `Dear ${user.name},\n\nYour username is: ${user.username}\nYour password is: ${user.password}\n\nPlease log in and change your password immediately.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Recovery email sent successfully.' });
  } catch (error) {
    console.error('Error in /forgot-password:', error);
    res.status(500).json({ message: 'Error sending recovery email.', error });
  }
};
