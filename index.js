const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up express app
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

app.use(function (err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

//listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});
