const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new Schema({
    name: {
      type: String
    },
    locality: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    phone: [
      {
        type: String,
        max: 10
      }
    ]
    // delete: {
    //   type: Number,
    //   default: 0
    // }
},{
    timestamp: true
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
