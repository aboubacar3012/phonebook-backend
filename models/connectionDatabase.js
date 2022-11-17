const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

function dbConnection() {
  mongoose
    .connect(url)
    .then(() => {
      console.log("✅✅✅ connected to MongoDB successfully ✔✔");
    })
    .catch((error) => {
      console.log(`error conecting to MongoDB: ${error.message}`);
    });
}

module.exports = { dbConnection };
