var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.js'));
});

app.get('/locations.json', function(req, res) {
  res.sendFile(path.join(__dirname + '/locations.json'));
});

app.get('/marker.webp', function(req, res) {
  res.sendFile(path.join(__dirname + '/marker.webp'));
});

app.listen(process.env.PORT || process.argv[2] || 10001);
