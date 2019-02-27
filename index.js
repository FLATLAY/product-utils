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
var request = require('request');

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
var respond = {
  "meta": {
    "id":  1
  },
  "outfits": []
}

//~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.
var html = "";
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
  

  var counter = 0;
  var last = 310;
  var count = 0

  console.log("products from " + counter + " to " + last);

  result['Sheet1'].forEach(element => {
    var tempElement = {};
    if (counter < last) {
      count++


      tempElement["id"] = element["Outfit ID"]
      tempElement["gender"] = element["Gender"]
      tempElement["title"] = element["Title"]
      tempElement["description"] = ""
      tempElement["image_url"] = element["Image URL"]
      checkUrl(element["Image URL"])


      tempElement["original_url"] = element["Pic Link"]

      tempElement["influencer"] = {}

      tempElement["influencer"]["id"] = element["Influencer ID"]

      tempElement["influencer"]["name"] = element["Name"]
      tempElement["influencer"]["country"] = element["Country"]
      tempElement["influencer"]["description"] = ""
      tempElement["influencer"]["profile_image_url"] = element["Profile Image URL"]
      tempElement["influencer"]["header_image_url"] = ""
      checkUrl(element["Profile Image URL"])


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
      if (element["SKU 1"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 1"]
        })

      }
      if (element["SKU 2"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 2"]
        })
      }
      if (element["SKU 3"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 3"]
        })
      }
      if (element["SKU 4"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 4"]
        })
      }
      if (element["SKU 5"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 5"]
        })
      }
      if (element["SKU 6"]) {
        tempElement["articles"].push({
          "match_type": "similar",
          "sku": element["SKU 6"]
        })
      }

      //double check if sku 1 doesnt exist dont add it
      if (element["SKU 1"]) {
        respond.outfits.push(tempElement);
        counter++;
      }

    }
  });
  console.log(count + " Items was read");


  respond.outfits.shift();
  links.shift();
  links.shift();

  var filename = req.file.filename;
  filename = filename.replace(/\..+$/, '');
  filename = publicDir + '/' + filename + "-" + pagenum + '.json';
  console.log(filename)
  fs.writeFile(filename, JSON.stringify(respond), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  //starttocheck(links.pop());
  starttocreatehtml(0);
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

var links = []

function checkUrl(url) {
  links.push(url);
}
var countFine = 0

function starttocheck(url) {
  request.head(url, function (error, response) {
    try {
      if (response.statusCode != 200) {
        console.log('url:', url);
        console.log('statusCode:', response.statusCode);
      } else {
        countFine++;
      };
      var newurl = links.pop();
      if (newurl)
        starttocheck(newurl)
      else
        console.log(countFine + " Images are fine");

      console.log(countFine + " Images are fine");
    } catch (e) {
      console.log('problem: ' + e);
      console.log('url:', url);
    }
  });
}

var count = 0;
var html = ""
async function starttocreatehtml(num) {
console.log("start to create "+ num);
  var filename = publicDir + '/somerandom.html';

  var url = "https://www.zalando.de/katalog/?q="
  var localhtml="";
try{
  localhtml+= "<p><p><p> id: "+respond.outfits[num].id+"<p>"
  localhtml+="<img src="+respond.outfits[num].image_url+"><p>"
 
    if(respond.outfits[num].articles[0])
    request.get(url+respond.outfits[num].articles[0].sku, function (error, response) {
      var substring = response.body.substr(response.body.search('og:image'), 240);
      var substring = substring.match('https.*\.jpg');
     
      if(substring)
      localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
       
       console.log("1 done");

       if(respond.outfits[num].articles[1])
       request.get(url+respond.outfits[num].articles[1].sku, function (error, response) {
        var substring = response.body.substr(response.body.search('og:image'), 240);
        var substring = substring.match('https.*\.jpg');
      
       if(substring)
       localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
        
        console.log("2 done");
        console.log(url+respond.outfits[num].articles[2].sku);

        if(respond.outfits[num].articles[2])
       request.get(url+respond.outfits[num].articles[2].sku, function (error, response) {
    
        var substring = response.body.substr(response.body.search('og:image'), 240);
        var substring = substring.match('https.*\.jpg');
        
       if(substring)
       localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
        console.log("3 done");


        if(respond.outfits[num].articles[3]){
       request.get(url+respond.outfits[num].articles[3].sku, function (error, response) {
        var substring = response.body.substr(response.body.search('og:image'), 240);
        var substring = substring.match('https.*\.jpg');
      
       if(substring)
        localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
        console.log("4 done");


        if(respond.outfits[num].articles[4]){
       request.get(url+respond.outfits[num].articles[4].sku, function (error, response) {
        var substring = response.body.substr(response.body.search('og:image'), 240);
        var substring = substring.match('https.*\.jpg');
      
       if(substring)
       localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
        console.log("5 done");
        console.log("5 done");


        if(respond.outfits[num].articles[5]){
       request.get(url+respond.outfits[num].articles[5].sku, function (error, response) {
        var substring = response.body.substr(response.body.search('og:image'), 240);
        var substring = substring.match('https.*\.jpg');
      
       if(substring)
       localhtml+="<img alt='' src="+substring[0]+" id=''><p>"
        console.log("6 done");

        fs.appendFile(filename, localhtml, function (err) {
          if(num <302)
          starttocreatehtml(num+1)
        });

    });}else{fs.appendFile(filename, localhtml, function (err) {
      if(num <302)
      starttocreatehtml(num+1)
    });}
  });}else{fs.appendFile(filename, localhtml, function (err) {
    if(num <302)
    starttocreatehtml(num+1)
  });}
});}else {fs.appendFile(filename, localhtml, function (err) {
  if(num <302)
  starttocreatehtml(num+1)
});}
  });});});


    } catch (e) {
      console.log('problem: ' + e);
    }
}

function savefile(localhtml){
  
}
