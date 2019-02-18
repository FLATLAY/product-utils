"use strict";
var express = require("express");
var app = express();
var path = require("path");

var publicDir = require('path').join(__dirname, '/uploads');
app.use(express.static(publicDir));
const fs = require('fs');

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

  //console.log(req.file);
  const result = excelToJson({
    source: fs.readFileSync(req.file.path),
    columnToKey: {
      '*': '{{columnHeader}}'
    }
  });

  var pagenum = parseInt(req.body.page);
  var respond = {
    "meta": {
      "id": pagenum + 1
    },
    "outfits": []
  }


  var counter = pagenum * 151;
  var last = counter + 151;

  console.log("products from " + counter + " to " + last);

  result['Sheet1'].forEach(element => {
    var tempElement = {};
    if (counter < last) {
      counter++


      tempElement["id"] = element["Outfit ID"]
      tempElement["gender"] = element["Gender"]
      tempElement["title"] = element["Title"]
      tempElement["description"] = ""
      //tempElement["Image_url"]= element["Image URL"]
      tempElement["image_url"] = element["Pic Link"]

      tempElement["influencer"] = {}

      tempElement["influencer"]["id"] = element["Influencer ID"]

      tempElement["influencer"]["name"] = element["Name"]
      tempElement["influencer"]["country"] = element["Country"]
      tempElement["influencer"]["description"] = ""
      tempElement["influencer"]["profile_image_url"] = element["Profile Image URL"]
      tempElement["influencer"]["header_image_url"] = ""


      tempElement["influencer"]["social_accounts"] = {}
      tempElement["influencer"]["social_accounts"]["instagram"] = element["Instagram URL"]
      tempElement["influencer"]["social_accounts"]["facebook"] = ""
      tempElement["influencer"]["social_accounts"]["pinterest"] = ""
      tempElement["influencer"]["social_accounts"]["tumblr"] = ""
      tempElement["influencer"]["social_accounts"]["web"] = ""
      tempElement["Tags"] = []
      if (element["Tag 1"])
        tempElement["Tags"].push(element["Tag 1"])
      if (element["Tag 2"])
        tempElement["Tags"].push(element["Tag 2"])
      if (element["Tag 3"])
        tempElement["Tags"].push(element["Tag 3"])

      tempElement["articles"] = []
      if (element["SKU 1"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 1"]
        })
      if (element["SKU 2"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 2"]
        })
      if (element["SKU 3"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 3"]
        })
      if (element["SKU 4"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 4"]
        })
      if (element["SKU 5"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 5"]
        })
      if (element["SKU 6"])
        tempElement["articles"].push({
          "match_type": "exact",
          "sku": element["SKU 6"]
        })



      respond.outfits.push(tempElement);
    }
  });



  respond.outfits.shift();


  var filename = req.file.filename;
  filename = filename.replace(/\..+$/, '');
  filename = publicDir + '/' + filename + "-" + pagenum + '.json';
  console.log(filename)
  fs.writeFile(filename, JSON.stringify(respond), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  res.send(respond)
});

app.get("/product/:id", function (req, res) {
  var filename = publicDir + '/' + req.params.id
  fs.readFile(filename, function read(err, data) {
    if (err) {
      throw err;
    }
    res.send(data)
  });

});