"use strict";
var express = require("express");
var app = express();
var path = require("path");

var publicDir = require('path').join(__dirname,'/uploads');
app.use(express.static(publicDir));

module.exports = app;

var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
var multer = require("multer");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
 

  var host = "http://localhost";
  var port = process.env.PORT || 2019;
  app.listen(port, function () {
    console.log(`Flat-lay app is running on ${host}:${port}`);
  });
 

// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router();


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});

//~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.

app.post("/exceltojson", upload.single("file"), function (req, res) {
 var response = {};
  
  console.log(req.file);
  const result = excelToJson({
    source: fs.readFileSync(req.file.path),
    columnToKey: {
      '*': '{{columnHeader}}'
  }
});

res.send(result)
  return new Promise(function (resolve, reject) {
    console.log(req.file);
  });
});

