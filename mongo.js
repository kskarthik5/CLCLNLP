
const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes")

const app = express();

app.use(express.json());

const uri = "mongodb+srv://admin:admin12345@mycluster.b5ij3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


  