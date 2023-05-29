const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/MactosysTask", {useNewUrlParser: true})
  .then((data) => {
    console.log(`MongoDb is successfully connected to ${data.connection.name}`);
  })
  .catch((error) => {
    console.log(`Error occur ${error.message}`);
  });
