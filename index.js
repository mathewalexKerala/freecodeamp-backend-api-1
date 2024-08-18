// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get('/api/:date', function(req, res) {
  let dateParam = req.params.date;
  let unixVal, dateVal;

  // Check if the dateParam is a number (Unix timestamp)
  if (!isNaN(dateParam) && dateParam.length >= 10) {
      // Convert the string to an integer
      unixVal = parseInt(dateParam);

      // Create a new Date object using the timestamp
      dateVal = new Date(unixVal).toUTCString();
  } else {
      // Treat the dateParam as a date string
      dateVal = new Date(dateParam).toUTCString();
      unixVal = new Date(dateParam).getTime();
  }

  // Check if the date is valid
  if (dateVal === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: unixVal, utc: dateVal });
});
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
