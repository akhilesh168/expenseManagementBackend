const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Trips', TripsSchema);
