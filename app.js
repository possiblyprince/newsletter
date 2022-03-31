const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var secondName = req.body.lName;
  var mail = req.body.eMail;

  var Data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(Data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/4b9efe8237";
  const options = {
    method: "POST",
    auth: "MrPrince:4e43b850bd2514e71ad9e6fed9f03f54-us14",
  };

  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/faliure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000 , function () {
  console.log("App started on port 3000");
});

//  Mailchimp API Key
//  4e43b850bd2514e71ad9e6fed9f03f54-us14
//  Audience ID - List ID - 4b9efe8237
