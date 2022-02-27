const express = require("express");
const cors = require("cors");
const data = require("./data.json");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send(data);
});

app.listen(5000, () => {
  console.log("Listening in port 5000");
});
