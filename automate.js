var FormData = require("form-data");
var fs = require("fs");
var request = require("request");
const fetch = require("node-fetch");
var md5 = require("md5");
var checkedProfiles = "";
var response;
// Load client secrets from a local file.
fs.readFile('uploads/heyhey.json', async (err, content) => {
    if (err) return console.log('Error: ', err);
    content = JSON.parse(content)
    var count = 0
    for (var element of content.outfits) {
        count++;
        if (count > 282) {
            if(element.gender == "Male")
            await updatePromise(element).then(function (uid) {
                console.log("now we go next ---->");
                console.log(count);
            });
        }
    }
});

var updatePromise = async function (element) {
    return new Promise(async function (resolve, reject) {
        var username = element.influencer.name;
        var profileimage = element.influencer.profile_image_url;

        var user = await registerandLoginUser(username, username, username);
        var jwt = user.id;
        var username = user.username;
        var userID = user.userID;
        var email = user.email;
        console.log("username: ", username);
        if (!checkedProfiles.includes(element.influencer.id)) {
            console.log(checkedProfiles);
            checkedProfiles += element.influencer.id;
            uploadProfilePhoto(jwt, profileimage)


            var invite = await sendInvite(jwt, email, username);
            console.log(invite);

            var accept = await acceptInvite(jwt, userID, username);
            console.log(accept);
        }
        var addcont = await addcontent(jwt, userID, element.image_url);

        console.log(addcont.campaignContent.image);
        resolve(true)
    })
}

async function registerandLoginUser(email, username, pass) {

    var params = {
        "username": email,
        "email": username,
        "password": md5(pass)
    }
    var result = await fetch('https://dev.flatlay.io/signup', {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(async data => {
            console.log(data);
            return await loginuser(email, pass)
        })
    return result;
}
async function loginuser(email, pass) {
    let buff = new Buffer(email + ":" + md5(pass));
    var base64 = buff.toString('base64');
    var params = {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64
        }
    };
    var result = fetch('https://dev.flatlay.io/login', params)
        .then(r => r.json())
        .then(async data => {
            console.log("jwt: ", data.id);
            return await data;
        })
    return result;
}
async function uploadProfilePhoto(jwt, imageLink) {
    var requestSettings = {
        method: "GET",
        url: imageLink,
        encoding: null
    };
    request.get(requestSettings, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        if (
            res.headers["content-type"].includes("text/html") ||
            res.headers["content-length"] == 0
        ) {
            console.log("The image doesnt exist");
        } else {

            const form = new FormData();
            form.append("image", res.body, "somerandomname");
            var params = {
                method: "POST",
                body: form,
                headers: {
                    'Authorization': jwt
                }
            }
        }
        fetch('https://dev.flatlay.io/users/profileimage', params)
            .then(r => r.json())
            .then(data => {
                console.log("photo uploaded: " + data);
            })
    })
}
//from merchant side
async function sendInvite(jwt, email, username) {
    var invitation = {
        campaignID: "30496",
        email: email
    }


    var params = {
        method: "POST",
        body: JSON.stringify(invitation),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJraWQiOiJ4elI1OVVzT0d0Y0lhd2ZCVlwvTVwvYmc5cWxDc0lBTjd1c3owMVlod09raW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjYTg5ZmRmNy1hZGUyLTQ4MmYtYmI3ZC00MzQ0YmQzNWRiYjAiLCJjb2duaXRvOmdyb3VwcyI6WyJicmFuZCJdLCJldmVudF9pZCI6IjViZDk1NWZhLTM3MWEtNDZlNi1iMzU3LTdiNTBkZjljMDNkMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NjMyOTE0NjUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3dyamNNc1VRTSIsImV4cCI6MTU2MzI5NTA2NSwiaWF0IjoxNTYzMjkxNDY1LCJqdGkiOiIyYTM3ODg4ZC1jZDRhLTQyMTAtYTJhZC02ZWIxYzkwMWQwNmYiLCJjbGllbnRfaWQiOiI2bGI4OWdkZXA1MjB0bXNjamhybDFmaDJjIiwidXNlcm5hbWUiOiJzdXBwb3J0LWF0LXRoZWZsYXRsYXkuY29tIn0.eO5Onlz3QxL-_E9Ukkx9v6vHFvxLLVtTnOAPH-FOHZeYFSpYTveZaI0D_0vHQarjUkBqgOuMEVjjPQXAgmIT-_xO0Z7oJ6lPXluLxioZybkGlfN8uOOxZBB03Ve-8huvjtopcoMWP5xCoa5KRwbvxM9cMPicwL8q24zvEdViRjCv7BuBQ_zGA_HpuE2PPSZWzG41iPNbJS4K3YJxRupkRB-RCd_qu88yYDtvE-2W2JkboUtYRXv4hoV0iKrb9lt18_yce2Vby3pVFUaEA56qxiD2MBTJ_3uC9hde0R7fuCQXKkJKqVEcgehd-JK-6dMek0QPdNHYyM3EvMaGActK2w'
        }
    }

    var result = await fetch('https://8i9s27h4vl.execute-api.us-west-2.amazonaws.com/dev/campaign/invite', params)
        .then(r => r.json())
        .then(data => {
            return data;
        })

    return result;
}
async function acceptInvite(jwt) {
    var body = {
        "campaignID": "30496",
        "rsvp": true
    }


    var params = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }

    var result = await fetch('https://dev.flatlay.io/campaign/user/rsvp', params)
        .then(r => r.json())
        .then(data => {
            return data;
        })

    return result;
}
async function addcontent(jwt, userID, contentlink) {
    var requestSettings = {
        method: "GET",
        encoding: null
    };
    var result = await fetch(contentlink)
        .then(res => res.buffer())
        .then(async res => {
            const form = new FormData();
            form.append("image", res, "somerandomname");
            form.append("campaignID", "30496");
            form.append("userId", userID);
            form.append("description", "");
            var params = {
                method: "POST",
                body: form,
                headers: {
                    'Authorization': jwt
                }
            }

            var result1 = await fetch('https://dev.flatlay.io/campaign/content', params)
                .then(async r => r.json())
                .then(async data => {
                    console.log("photo uploaded: " + JSON.stringify(data.campaignContent.image));
                    return await data;
                })
            return await result1;
        })
    return await result;
}