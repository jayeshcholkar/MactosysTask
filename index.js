const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routers/mainRoute/mainRouter");
require("./models/config");

const app = express();

app.use(express.json());

app.use(cors());

app.enable('trust proxy')
app.get('trust proxy')

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
