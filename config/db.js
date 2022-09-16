const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
      console.log('Connected successfully');
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectToDb;
