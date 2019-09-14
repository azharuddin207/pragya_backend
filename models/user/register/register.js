const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  mobile: {
    type: String,
    unique: true,
    max: 10
  },
  status: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

const Register = mongoose.model("user", registerSchema);
module.exports = Register;
