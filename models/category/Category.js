const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Location = require('./Location');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
  },
  status: {
    type: Number,
    default: 1
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]
}, {
  timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
