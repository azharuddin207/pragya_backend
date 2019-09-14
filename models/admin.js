const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "super"]
  }
}, {timestamps: true});

adminSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    role: this.role
  }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '1d'
  });
  return token;
}

const Admin = mongoose.model('Admin', adminSchema);

exports.Admin = Admin;
