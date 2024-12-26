const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `DB Connected: ${connected.connection.host} ${connected.connection.name}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
