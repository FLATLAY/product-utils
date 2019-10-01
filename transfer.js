"use strict";

var FormData = require("form-data");
var conf = require("./conf");
var neo4j = require("neo4j-driver").v1;
var fs = require("fs");
var request = require("request");
const fetch = require("node-fetch");
var count = 0;
var driver = new neo4j.driver(
  conf.neo4jBoltAddress,
  neo4j.auth.basic(conf.neo4jUsername, conf.neo4jPass)
);

const dbSession = driver.session();
dbSession
  .run(
    "MATCH (flatlay:flatlay) where ID(flatlay) < 2937 return flatlay, ID(flatlay) AS flatlayID ORDER BY flatlayID DESC SKIP 0 LIMIT 1000"
  )
  .then(async function(results) {
    var result = results.records[0];
    if (!result) {
      console.log("Nothing Found");
    } else {
      for (var element of results.records) {
        await updatePromise(element).then(function(uid) {
          console.log("now we go next ---->");
        });
      }
      console.log("Congrats Done!");
    }
  });

var updatePromise = function(element) {
  return new Promise(function(resolve, reject) {
    var imageLink = element.get("flatlay")["properties"].image;
    var imageID = element.get("flatlayID");
    console.log("ImageID:", imageID);
    console.log("ImageORG:", imageLink);
    if (imageLink.includes("amazonaws") || imageLink.includes("facebook")) {
      console.log("It's already aws link!!!");
      console.log("----------");
      resolve(true);
    } else {
      if (!imageLink.includes("/")) imageLink = conf.imageBaseURL + imageLink;

      var requestSettings = {
        method: "GET",
        url: imageLink,
        encoding: null
      };
      request.get(requestSettings, function(err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        if (
          res.headers["content-type"].includes("text/html") ||
          res.headers["content-length"] == 0
        ) {
          console.log("deleted");
          resolve(true);
        } else {
          const form = new FormData();
          form.append("image", res.body, imageID.toString());
          //http://localhost:2021/upload
          fetch(conf.imagecdnurl, {
            method: "POST",
            body: form
          })
            .then(r => r.json())
            .then(data => {
              //console.log(data);
              var cdnImageLink = data.small;
              dbSession
                .run(
                  "MATCH (flatlay:flatlay) where ID(flatlay)=" +
                    imageID +
                    " SET flatlay.image2 = flatlay.image , flatlay.image = '" +
                    cdnImageLink +
                    "' RETURN ID(flatlay) AS flatlayID, flatlay"
                )
                .then(function(results) {
                  var result = results.records[0];
                  if (!result) {
                    console.log("Nothing Found");
                  } else {
                    var imageLink = results.records[0].get("flatlay")[
                      "properties"
                    ].image;

                    console.log("imageAWS--: ", imageLink);
                    console.log("number: ", count++);

                    resolve(true);
                  }
                  dbSession.close();
                })
                .catch(function(err) {
                  throw err;
                });
            });
        }
      });
    }
  });
};
