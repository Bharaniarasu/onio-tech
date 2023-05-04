const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers");
const cors = require("cors");
const app = express();
app.use(cors());
app.listen(3001, () => {
  console.log("Server started at port - 3001");
});

app.use(express.json());
app.use(router);
mongoose
  .connect("mongodb://0.0.0.0:27017/userdata", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("DB Connected ......");
  })
  .catch((err) => {
    console.log(err);
  });
