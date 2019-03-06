"use strict";
var express = require("express");
var app = express();
var path = require("path");
const readline = require('readline');
const {google} = require('googleapis');



var publicDir = require('path').join(__dirname, '/uploads');
app.use(express.static(publicDir));
const fs = require('fs');


module.exports = app;
const cheerio = require('cheerio')
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
var port = process.env.PORT || 2020;
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
    "id": 1
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
  starttocreatehtml(13);
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
console.log("start to create " + num);
var filename = publicDir + '/somerandom.html';

var url = "https://www.zalando.de/katalog/?q="
var localhtml = "";
try {
  localhtml += "<p><p><p> id: " + respond.outfits[num].id + "<p>"
  localhtml += "<img width='500' height='600' src=" + respond.outfits[num].image_url + "><p>"

  function checkSKU(skunum) {
    var fullurl = url + respond.outfits[num].articles[skunum].sku;
    request.get(fullurl, function (error, response) {
      
      var $ = cheerio.load(response.body);
      var substring = $('meta[property="og:image"]').attr('content');

      //to checkout the html pages
      //var aaa =""+ response.body;
      //fs.appendFile(filename, aaa, function (err) { });
      
      //second rule(if og:image didnt exist)
      if(!substring)
      var substring = $('img[id="galleryImage-0"]').attr('src');
    
      if (substring) {
        localhtml += "<a target='_blank' href='"+fullurl+"'><img width='100' height='100' alt='' src=" + substring + " id=''></a><p>"
        console.log(skunum + " done");
        
      } else {
        console.log(skunum + " passed empty try again: https://www.zalando.de/katalog/?q="+ respond.outfits[num].articles[skunum].sku);
        localhtml +="<p>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
        localhtml +skunum + " passed empty try again: https://www.zalando.de/katalog/?q="+ respond.outfits[num].articles[skunum].sku
        
        fs.appendFile("problematicSkus.txt", respond.outfits[num].articles[skunum].sku +"\n", function (err) {});


      }
      if (respond.outfits[num].articles[skunum + 1]) {
        checkSKU(skunum + 1)
      } else {
        localhtml +="<p>==========================================================================";
        localhtml += "product "+num +" has "+ (skunum+1) +" sku";

        fs.appendFile(filename, localhtml, function (err) {
          console.log("product "+num +" has "+ (skunum+1) +" sku");
          if (num < 302)
            starttocreatehtml(num + 1)
        });
        localhtml="";
      }

    });
  }
  checkSKU(0)
  


}
catch (e) {
  console.log('problem: ' + e);
}
}


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */


function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1vDkK1tKbDe9gFd-c9RYM51KtnpZ3RhZHFaUf2g0JUb8',
    range: 'A:S',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      
      

      
      rows.map((element) => {
        var tempElement = {};
        if (counter < last) {
          count++
    
    
          tempElement["id"] = element[0]
          tempElement["gender"] = element[2]
          tempElement["title"] = element[5]
          tempElement["description"] = ""
          tempElement["image_url"] = element[0]
          checkUrl(tempElement["image_url"])
    
    
          tempElement["original_url"] = element[1]
    
          tempElement["influencer"] = {}
    
          tempElement["influencer"]["id"] = element[4]
    
          tempElement["influencer"]["name"] = element[6]
          tempElement["influencer"]["country"] = element[7]
          tempElement["influencer"]["description"] = ""
          tempElement["influencer"]["profile_image_url"] = element[8]
          tempElement["influencer"]["header_image_url"] = ""
          checkUrl(element["Profile Image URL"])
    
    
          tempElement["influencer"]["social_accounts"] = {}
          tempElement["influencer"]["social_accounts"]["instagram"] = element[9]
          tempElement["influencer"]["social_accounts"]["facebook"] = ""
          tempElement["influencer"]["social_accounts"]["pinterest"] = ""
          tempElement["influencer"]["social_accounts"]["tumblr"] = ""
          tempElement["influencer"]["social_accounts"]["web"] = ""
          tempElement["Tags"] = []
          if (element[10])
            tempElement["Tags"].push(element[10])
          if (element[11])
            tempElement["Tags"].push(element[11])
          if (element[12])
            tempElement["Tags"].push(element[12])
    
          tempElement["articles"] = []
          if (element[13]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[13]
            })
    
          }
          if (element[14]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[14]
            })
          }
          if (element[15]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[15]
            })
          }
          if (element[16]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[16]
            })
          }
          if (element[17]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[17]
            })
          }
          if (element[18]) {
            tempElement["articles"].push({
              "match_type": "similar",
              "sku": element[18]
            })
          }
    
          //double check if sku 1 doesnt exist dont add it
          if (element[13]) {
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
      starttocreatehtml(13);
      res.send(respond)












    } else {
      console.log('No data found.');
    }
  });
}




app.get("/check", function (req, res) {
  var response = {};



  var counter = 0;
  var last = 310;
  var count = 0

  console.log("products from " + counter + " to " + last);


  // Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});




 
});