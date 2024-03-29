
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
    res.json({'unix': new Date().getTime(), "utc": new Date().toUTCString()});
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let date = req.params.date_string;
  let dateObj = new Date(date);
  let json = {};
  if(dateObj.toUTCString() !== "Invalid Date") {
    json.unix = dateObj.getTime();
    json.utc = dateObj.toUTCString();
  }
  else {
    json.error = "Invalid date";
  }
  res.json(json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
