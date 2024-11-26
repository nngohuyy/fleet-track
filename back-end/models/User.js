const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, minlength: 8, maxlength: 16 },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  imgAvatar: { type: Buffer }, // Lưu ảnh dưới dạng binary
  cccd: { type: String, required: true, match: /^[0-9]{12}$/ },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
