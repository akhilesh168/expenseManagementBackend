const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  trip: { type: String, required: true },
  category: {
    type: String,
    enum: ['travel', 'food', 'accommodation', 'fund'],
    required: 'Please specify at least one factor.',
  },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Expenses', ExpenseSchema);
